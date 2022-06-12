import OrderForm from "components/OrderForm";
import OrderList from "components/OrderList";
import OrderQueue from "components/OrderQueue";
import ablyChannels from "config/ably";
import ENDPOINTS from "config/endpoints";
import http from "config/http";
import { useEffect, useState } from "react";

function Home() {
    const [orderQueue, setOrderQueue] = useState([]);
    const [currentUser, setCurrentUser] = useState("");

    const loadAllOrders = async () => {
        const response = await http.get(ENDPOINTS.ORDER_URL);
        setOrderQueue(Array.isArray(response.data) ? response.data : []);
    };

    useEffect(() => {
        loadAllOrders();
        ablyChannels.orderQueueChannel.subscribe("added", (message) => {
            setOrderQueue((q) => [...q, message.data]);
        });
        ablyChannels.orderQueueChannel.subscribe("update", (message) => {
            setOrderQueue((q) =>
                q.map((order) =>
                    order._id !== message.data
                        ? order
                        : { ...order, status: "processing" }
                )
            );
        });
        ablyChannels.orderQueueChannel.subscribe("completed", (message) => {
            setOrderQueue((q) =>
                q.filter((order) => order._id !== message.data)
            );
        });
        setCurrentUser(localStorage.getItem("email") || "");
    }, []);

    return (
        <div>
            <h1>Orders</h1>
            <h2>Create</h2>
            <OrderForm />
            <h2>Ongoing</h2>
            <OrderQueue orderQueue={orderQueue} currentUser={currentUser} />
        </div>
    );
}

export default Home;
