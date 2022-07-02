import styles from "assets/css/components/OrderQueue.module.css";
import { useContext } from "react";
import { StateContext } from "state/GlobalState";

function OrderQueue() {
    const [state] = useContext(StateContext);

    return (
        <ul className={styles.queue}>
            {state.orderQueue.map((order, idx) => (
                <li
                    key={order._id}
                    className={`${
                        state.orderId === order._id ? styles.current : ""
                    } ${order.status === "processing" ? styles.active : ""}`}>
                    {idx + 1}
                </li>
            ))}
        </ul>
    );
}

export default OrderQueue;
