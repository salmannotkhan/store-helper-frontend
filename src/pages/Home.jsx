import OrderForm from "components/OrderForm";
import OrderQueue from "components/OrderQueue";
import { useContext, useEffect, useState } from "react";
import styles from "assets/css/pages/Home.module.css";
import { StateContext } from "state/GlobalState";

function Home() {
    const [{ orderId, orderQueue }] = useContext(StateContext);
    const [remainingTime, setRemainingTime] = useState(0)

    useEffect(() => {
        if (orderQueue.length && orderId) {
            const index = orderQueue.findIndex(order => order._id === orderId)
            if (index > 2) {
                setRemainingTime(orderQueue.slice(0, index).reduce((x = 0, y = 0) => x.service.approxTime + y?.service?.approxTime || 0))
            } else {
                setRemainingTime(orderQueue[0].service.approxTime)
            }
        }
    }, [orderId, orderQueue])
    return (
        <>
            <div className={styles.queueContainer}>
                <h2>Ongoing Orders</h2>
                <OrderQueue />
            </div>
            {!orderId ? (
                <div>
                    <h2>Create</h2>
                    <OrderForm />
                </div>
            ) : (
                <>
                    <h2>Thanks for placing order. your token is: {orderId}</h2>
                    {remainingTime ? (
                            <h2>{Math.floor(remainingTime / 60)} hours {remainingTime % 60} minutes waiting</h2>
                    ) : <h2>It's your turn</h2>}
                </>
            )}
        </>
    );
}

export default Home;
