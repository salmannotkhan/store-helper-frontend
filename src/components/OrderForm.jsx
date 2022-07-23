import ENDPOINTS from "config/endpoints";
import http from "config/http";
import { Field, Form, Formik } from "formik";
import styles from "assets/css/components/OrderForm.module.css";
import { useContext } from "react";
import { StateContext } from "state/GlobalState";
import { setOrderId } from "state/actions";

function OrderForm() {
    const [state, dispatch] = useContext(StateContext);

    const createOrder = async (orderDetails) => {
        const response = await http.post(ENDPOINTS.ORDER_URL, orderDetails);
        if (response.status === 200) {
            localStorage.setItem("orderId", response.data.orderId);
            dispatch(setOrderId(response.data.orderId));
        }
    };

    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                service: state.services[0]?._id || "",
            }}
            enableReinitialize={true}
            onSubmit={createOrder}>
            <Form className={styles.orderForm}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <Field type="text" name="name" />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <Field type="email" name="email" />
                </div>
                <div>
                    <label htmlFor="service">Service:</label>
                    <Field component="select" name="service">
                        {state.services.map((service) => (
                            <option key={service._id} value={service._id}>
                                {service.name} - Rs.{service.rate}
                            </option>
                        ))}
                    </Field>
                </div>
                <button type="submit">Create</button>
            </Form>
        </Formik>
    );
}

export default OrderForm;
