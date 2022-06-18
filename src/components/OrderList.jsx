import styles from "assets/css/components/OrderList.module.css";
import ENDPOINTS from "config/endpoints";
import http from "config/http";
import { useContext } from "react";
import { StateContext } from "state/GlobalState";

function OrderList() {
    const [{ orderQueue }] = useContext(StateContext);

    const markAsCompleted = (orderId) => {
        http.delete(`${ENDPOINTS.ORDER_URL}/${orderId}`);
    };

    const markAsProcessing = (orderId) => {
        http.put(`${ENDPOINTS.ORDER_URL}/${orderId}`);
    };

    return (
        <ul className={styles.orderList}>
            {orderQueue.map((order) => (
                <li className={styles.order} key={order._id}>
                    <h3>{order.name}</h3>
                    <p>{order.service}</p>
                    {order.status === "processing" ? (
                        <button onClick={() => markAsCompleted(order._id)}>
                            Mark as Completed
                        </button>
                    ) : (
                        <button onClick={() => markAsProcessing(order._id)}>
                            Mark as Processing
                        </button>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default OrderList;
