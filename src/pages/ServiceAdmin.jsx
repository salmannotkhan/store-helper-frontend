import ServiceForm from "components/ServiceForm";
import { useContext } from "react";
import { StateContext } from "state/GlobalState";
import Services from "./Services";

function ServiceAdmin() {
    const [{ editService }] = useContext(StateContext);
    return (
        <>
            <Services />
            <h2>{editService?._id ? "Edit" : "Create"} Service</h2>
            <ServiceForm />
        </>
    );
}

export default ServiceAdmin;
