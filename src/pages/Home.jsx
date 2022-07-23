import OrderForm from "components/OrderForm";
import OrderQueue from "components/OrderQueue";
import { useContext } from "react";
import styles from "assets/css/pages/Home.module.css";
import { StateContext } from "state/GlobalState";

function Home() {
    const [{ orderId }] = useContext(StateContext);
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
                <h2>Thanks for placing order. your token is: {orderId}</h2>
            )}
        </>
    );
}

export default Home;
