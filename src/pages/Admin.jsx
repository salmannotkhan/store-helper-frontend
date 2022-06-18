import OrderForm from "components/OrderForm";
import OrderList from "components/OrderList";

function Admin() {
    return (
        <div>
            <h1>Orders</h1>
            <h2>Create</h2>
            <OrderForm />
            <h2>Ongoing</h2>
            <OrderList />
        </div>
    );
}

export default Admin;
