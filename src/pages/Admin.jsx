import OrderForm from "components/OrderForm";
import OrderList from "components/OrderList";
import ablyChannels from "config/ably";
import ENDPOINTS from "config/endpoints";
import http from "config/http";
import { useEffect, useState } from "react";

function Admin() {
    const [orderQueue, setOrderQueue] = useState([]);

    useEffect(() => {
        loadAllOrders();
        ablyChannels.orderQueueChannel.subscribe("added", (message) => {
            setOrderQueue((q) => [...q, message.data]);
        });
        ablyChannels.orderQueueChannel.subscribe("completed", (message) => {
            setOrderQueue((q) =>
                q.filter((order) => order._id !== message.data)
            );
        });
    }, []);

    const markAsCompleted = (orderId) => {
        http.delete(`${ENDPOINTS.ORDER_URL}/${orderId}`);
    };

    const markAsProcessing = (orderId) => {
        http.put(`${ENDPOINTS.ORDER_URL}/${orderId}`);
    };

    const loadAllOrders = async () => {
        const response = await http.get(ENDPOINTS.ORDER_URL);
        setOrderQueue(Array.isArray(response.data) ? response.data : []);
    };

    return (
        <div>
            <h1>Orders</h1>
            <h2>Create</h2>
            <OrderForm />
            <h2>Ongoing</h2>
            <OrderList
                orderQueue={orderQueue}
                markAsCompleted={markAsCompleted}
                markAsProcessing={markAsProcessing}
            />
        </div>
    );
}

export default Admin;
