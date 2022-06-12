import styles from "assets/css/components/OrderQueue.module.css";

function OrderQueue({ orderQueue, currentUser }) {
    return (
        <ul className={styles.queue}>
            {orderQueue.map((order) => (
                <li
                    key={order._id}
                    className={`${
                        currentUser === order.email ? styles.current : ""
                    } ${
                        order.status === "processing" ? styles.active : ""
                    }`}></li>
            ))}
        </ul>
    );
}

export default OrderQueue;
