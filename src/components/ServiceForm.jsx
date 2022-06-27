import ENDPOINTS from "config/endpoints";
import http from "config/http";
import { Formik, Form, Field } from "formik";
import styles from "assets/css/components/ServiceForm.module.css";
import { useContext } from "react";
import { StateContext } from "state/GlobalState";
import { setEditService } from "state/actions";

function ServiceForm() {
    const [{ editService }, dispatch] = useContext(StateContext);
    const handleSubmit = async (values) => {
        if (editService._id) {
            http.put(`${ENDPOINTS.SERVICES_URL}/${editService._id}`, values);
        } else {
            http.post(ENDPOINTS.SERVICES_URL, values);
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
