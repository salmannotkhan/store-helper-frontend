import { useContext } from "react";
import { StateContext } from "state/GlobalState";
import styles from "assets/css/components/ServicesList.module.css";
import { setEditService, setServices } from "state/actions";
import http from "config/http";
import ENDPOINTS from "config/endpoints";
import { useLocation } from "react-router-dom";

function Services() {
    const [state, dispatch] = useContext(StateContext);
    const location = useLocation();

    const handleEdit = (service) => {
        const { _id, name, rate, approxTime } = service;
        dispatch(setEditService({ _id, name, rate, approxTime }));
    };

    const handleDelete = async (serviceId) => {
        const response = await http.delete(
            `${ENDPOINTS.SERVICES_URL}/${serviceId}`
        );
        if (response.status < 300) {
            dispatch(
                setServices(state.services.filter((s) => s._id !== serviceId))
            );
        }
    };

    return (
        <>
            <h2>Services List</h2>
            <ul
                className={`${styles.servicesList} ${
                    location.pathname.startsWith("/admin") ? styles.admin : ""
                }`}>
                {state.services.map((service) => (
                    <li key={service._id}>
                        <h4>
                            {service.name} - Approx Time: {service.approxTime}{" "}
                            mins.
                        </h4>
                        <p>Rs.{service.rate}</p>
                        {location.pathname.startsWith("/admin") && (
                            <div className={styles.actions}>
                                <button onClick={() => handleEdit(service)}>
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(service._id)}>
                                    Delete
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Services;
