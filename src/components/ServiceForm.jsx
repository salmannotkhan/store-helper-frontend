import ENDPOINTS from "config/endpoints";
import http from "config/http";
import { Formik, Form, Field } from "formik";
import styles from "assets/css/components/ServiceForm.module.css";
import { useContext } from "react";
import { StateContext } from "state/GlobalState";
import { setEditService, setServices } from "state/actions";

function ServiceForm() {
    const [{ editService }, dispatch] = useContext(StateContext);
    const handleSubmit = async (values) => {
        let response;
        if (editService._id) {
            response = await http.put(
                `${ENDPOINTS.SERVICES_URL}/${editService._id}`,
                values
            );
            cancelEdit();
        } else {
            response = await http.post(ENDPOINTS.SERVICES_URL, values);
        }
        if (response.status < 300) {
            const services = await http.get(ENDPOINTS.SERVICES_URL);
            dispatch(setServices(services.data));
        }
    };

    const cancelEdit = () => {
        dispatch(setEditService({}));
    };

    return (
        <Formik
            initialValues={{ name: "", rate: 0, approxTime: 0, ...editService }}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            values={editService}>
            <Form className={styles.serviceForm}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <Field type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="rate">Rate:</label>
                    <Field type="number" id="rate" name="rate" />
                </div>
                <div>
                    <label htmlFor="approxTime">Approx Time(mins.):</label>
                    <Field type="number" id="approxTime" name="approxTime" />
                </div>
                <button type="submit">Save</button>
                {editService?._id && (
                    <button type="button" onClick={cancelEdit}>
                        Cancel
                    </button>
                )}
            </Form>
        </Formik>
    );
}

export default ServiceForm;
