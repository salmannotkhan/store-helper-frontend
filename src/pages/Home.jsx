import axios from "axios";
import OrderForm from "components/OrderForm";
import OrderList from "components/OrderList";
import ablyChannels from "config/ably";
import { useEffect, useState } from "react";

function Home() {
    const [orderQueue, setOrderQueue] = useState([]);

    const loadAllOrders = async () => {
        const response = await axios.get("http://localhost:3001/orders");
        setOrderQueue(response.data);
    };

    useEffect(() => {
        loadAllOrders();
        ablyChannels.orderQueueChannel.subscribe("update", (message) => {
            setOrderQueue(message.data);
        });
        return () => {
            ablyChannels.orderQueueChannel.unsubscribe("update");
        };
    }, []);

    return (
        <div>
            <h1>Orders</h1>
            <h2>Create</h2>
            <OrderForm />
            <h2>Ongoing</h2>
            <OrderList orderQueue={orderQueue} />
        </div>
    );
}

export default Home;
