import {
    ADD_ORDER,
    REMOVE_ORDER,
    SET_EDIT,
    SET_ORDERID,
    SET_ORDER_QUEUE,
    SET_SERVICES,
    UPDATE_ORDER_STATUS,
} from "./actionTypes";

export function setOrderId(orderId) {
    return { type: SET_ORDERID, payload: orderId };
}

export function setOrderQueue(queue) {
    return { type: SET_ORDER_QUEUE, payload: queue };
}

export function addOrder(order) {
    return { type: ADD_ORDER, payload: order };
}

export function removeOrder(order) {
    return { type: REMOVE_ORDER, payload: order };
}

export function updateOrderStatus(order) {
    return { type: UPDATE_ORDER_STATUS, payload: order };
}

export function setServices(services) {
    return { type: SET_SERVICES, payload: services };
}

export function setEditService(service) {
    return { type: SET_EDIT, payload: service };
}
