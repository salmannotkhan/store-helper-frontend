import axios from "axios";
import { ORDER_URL } from "config/constants";
import { Field, Form, Formik } from "formik";

function OrderForm() {
    const createOrder = (orderDetails) => {
        axios.post(ORDER_URL, orderDetails);
    };

    return (
        <Formik
            initialValues={{ name: "", service: "Hair Cut" }}
            onSubmit={createOrder}>
            <Form>
                <Field type="text" name="name" />
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
