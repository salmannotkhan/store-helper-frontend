import ENDPOINTS from "config/endpoints";
import http from "config/http";
import { Field, Form, Formik } from "formik";

function OrderForm() {
    const createOrder = (orderDetails) => {
        http.post(ENDPOINTS.ORDER_URL, orderDetails);
        localStorage.setItem("email", orderDetails.email)
    };

    return (
        <Formik
            initialValues={{ name: "", email: "", service: "Hair Cut" }}
            onSubmit={createOrder}>
            <Form>
                Name:
                <Field type="text" name="name" />
                Email:
                <Field type="email" name="email" />
                Service:
                <Field component="select" name="service">
                    <option value="Hair Cut">Hair Cut</option>
                    <option value="Shave">Shave</option>
                    <option value="Massage">Massage</option>
                    <option value="Dye">Dye</option>
                </Field>
                <button type="submit">Save</button>
            </Form>
        </Formik>
    );
}

export default OrderForm;
