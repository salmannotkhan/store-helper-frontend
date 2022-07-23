import ENDPOINTS from "config/endpoints";
import http from "config/http";
import { setOrderQueue, setServices } from "state/actions";

export const loadAllOrders = async () => {
    const response = await http.get(ENDPOINTS.ORDER_URL, {});
    return setOrderQueue(Array.isArray(response.data) ? response.data : []);
};

export const loadAllServices = async () => {
    const response = await http.get(ENDPOINTS.SERVICES_URL, {});
    return setServices(response.data);
};
