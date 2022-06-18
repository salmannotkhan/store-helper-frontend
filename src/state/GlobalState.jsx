import { createContext, useReducer } from "react";
import { reducer } from "./reducer";

const initalState = {
    orderId: "",
    orderQueue: [],
};
export const StateContext = createContext(initalState);

function GlobalState({ children }) {
    const reducerState = useReducer(reducer, initalState);
    return (
        <StateContext.Provider value={reducerState}>
            {children}
        </StateContext.Provider>
    );
}

export default GlobalState;
