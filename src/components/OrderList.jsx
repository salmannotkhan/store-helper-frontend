import styles from "assets/css/components/OrderList.module.css";

function OrderList({ orderQueue, markAsCompleted, markAsProcessing }) {
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
