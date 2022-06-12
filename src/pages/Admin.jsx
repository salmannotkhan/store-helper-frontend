import axios from "axios";
import OrderForm from "components/OrderForm";
import OrderList from "components/OrderList";
import ablyChannels from "config/ably";
import { ORDER_URL } from "config/constants";
import { useEffect, useState } from "react";

function Admin() {
    const [orderQueue, setOrderQueue] = useState([]);

    useEffect(() => {
        loadAllOrders();
        ablyChannels.orderQueueChannel.subscribe("update", (message) => {
            setOrderQueue(message.data);
        });
    }, []);

    const markAsCompleted = (orderId) => {
        axios.delete(`${ORDER_URL}/${orderId}`);
    };

    const loadAllOrders = async () => {
        const response = await axios.get(ORDER_URL);
        setOrderQueue(response.data);
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
            />
        </div>
    );
}

export default Admin;
