import ENDPOINTS from "config/endpoints";
import http from "config/http";
import { Field, Form, Formik } from "formik";
import styles from "assets/css/components/OrderForm.module.css";
import { useContext } from "react";
import { StateContext } from "state/GlobalState";
import { setOrderId } from "state/actions";

function OrderForm() {
    const [, dispatch] = useContext(StateContext);

    const createOrder = async (orderDetails) => {
        const response = await http.post(ENDPOINTS.ORDER_URL, orderDetails);
        if (response.status === 200) {
            localStorage.setItem("orderId", response.data.orderId);
            dispatch(setOrderId(response.data.orderId));
        }
    };

    return (
        <Formik
            initialValues={{ name: "", email: "", service: "Hair Cut" }}
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
                        <option value="Hair Cut">Hair Cut</option>
                        <option value="Shave">Shave</option>
                        <option value="Massage">Massage</option>
                        <option value="Dye">Dye</option>
                    </Field>
                </div>
                <button type="submit">Create</button>
            </Form>
        </Formik>
    );
}

export default OrderForm;
