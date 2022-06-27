import {
    ADD_ORDER,
    REMOVE_ORDER,
    SET_EDIT,
    SET_ORDERID,
    SET_ORDER_QUEUE,
    SET_SERVICES,
    UPDATE_ORDER_STATUS,
} from "./actionTypes";

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case SET_ORDERID:
            return { ...state, orderId: payload };
        case SET_ORDER_QUEUE:
            return { ...state, orderQueue: payload };
        case ADD_ORDER:
            return { ...state, orderQueue: [...state.orderQueue, payload] };
        case REMOVE_ORDER:
            return {
                ...state,
                orderQueue: state.orderQueue.filter((o) => o._id !== payload),
            };
        case UPDATE_ORDER_STATUS:
            return {
                ...state,
                orderQueue: state.orderQueue.map((o) =>
                    o._id === payload ? { ...o, status: "processing" } : o
                ),
            };
        case SET_SERVICES:
            return {
                ...state,
                services: payload,
            };
        case SET_EDIT:
            return {
                ...state,
                editService: payload,
            };
        default:
            return state;
    }
};
