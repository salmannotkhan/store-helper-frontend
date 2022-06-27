import OrderForm from "components/OrderForm";
import OrderList from "components/OrderList";

function Admin() {
    return (
        <>
            <h2>Ongoing Orders</h2>
            <OrderList />
            <h2>Create Order</h2>
            <OrderForm />
        </>
    );
}

export default Admin;
