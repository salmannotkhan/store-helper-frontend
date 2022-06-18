import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Admin from "pages/Admin";
import BaseLayout from "layouts/BaseLayout";
import { useCallback, useContext, useEffect } from "react";
import { StateContext } from "state/GlobalState";
import {
    addOrder,
    removeOrder,
    setOrderId,
    setOrderQueue,
    updateOrderStatus,
} from "state/actions";
import ablyChannels from "config/ably";
import http from "config/http";
import ENDPOINTS from "config/endpoints";

function App() {
    const [{ orderId }, dispatch] = useContext(StateContext);

    const loadAllOrders = useCallback(async () => {
        const response = await http.get(ENDPOINTS.ORDER_URL);
        dispatch(
            setOrderQueue(Array.isArray(response.data) ? response.data : [])
        );
    }, [dispatch]);

    const handleAddOrder = useCallback(
        (message) => {
            dispatch(addOrder(message.data));
        },
        [dispatch]
    );

    const handleUpdateOrder = useCallback(
        (message) => {
            dispatch(updateOrderStatus(message.data));
        },
        [dispatch]
    );

    const handleDeleteOrder = useCallback(
        (message) => {
            if (message.data === orderId) {
                dispatch(setOrderId(""));
                localStorage.removeItem("orderId");
            }
            dispatch(removeOrder(message.data));
        },
        [dispatch, orderId]
    );

    useEffect(() => {
        loadAllOrders();
        dispatch(setOrderId(localStorage.getItem("orderId") || ""));
        ablyChannels.orderQueueChannel.subscribe("added", handleAddOrder);
        ablyChannels.orderQueueChannel.subscribe("update", handleUpdateOrder);

        return () => {
            ablyChannels.orderQueueChannel.unsubscribe("added", handleAddOrder);
            ablyChannels.orderQueueChannel.unsubscribe(
                "update",
                handleUpdateOrder
            );
        };
    }, [dispatch, handleAddOrder, handleUpdateOrder, loadAllOrders]);

    useEffect(() => {
        ablyChannels.orderQueueChannel.subscribe(
            "completed",
            handleDeleteOrder
        );

        return () => {
            ablyChannels.orderQueueChannel.unsubscribe(
                "completed",
                handleDeleteOrder
            );
        };
    }, [dispatch, handleDeleteOrder]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BaseLayout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
