import styles from "assets/css/components/OrderList.module.css";

function OrderList({ orderQueue, markAsCompleted }) {
    return (
        <ul className={styles.orderList}>
            {orderQueue.map((order) => (
                <li className={styles.order} key={order.id}>
                    <h3>{order.name}</h3>
                    <p>{order.service}</p>
                    {markAsCompleted && (
                        <button onClick={() => markAsCompleted(order.id)}>
                            Mark as completed
                        </button>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default OrderList;
