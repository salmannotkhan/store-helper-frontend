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
    setServices,
    updateOrderStatus,
} from "state/actions";
import ablyChannels from "config/ably";
import http from "config/http";
import ENDPOINTS from "config/endpoints";
import Services from "pages/Services";
import ServiceAdmin from "pages/ServiceAdmin";

function App() {
    const [{ orderId }, dispatch] = useContext(StateContext);

    const loadAllOrders = useCallback(
        async (abortController) => {
            try {
                const response = await http.get(ENDPOINTS.ORDER_URL, {
                    signal: abortController.signal,
                });
                dispatch(
                    setOrderQueue(
                        Array.isArray(response.data) ? response.data : []
                    )
                );
                const orderIdExists = response.data.some(
                    (order) => order._id === localStorage.getItem("orderId")
                );
                if (orderIdExists) {
                    dispatch(setOrderId(localStorage.getItem("orderId")));
                } else {
                    localStorage.removeItem("orderId");
                }
            } catch (_) {}
        },
        [dispatch]
    );

    const loadAllServices = useCallback(
        async (abortController) => {
            try {
                const response = await http.get(ENDPOINTS.SERVICES_URL, {
                    signal: abortController.signal,
                });
                dispatch(setServices(response.data));
            } catch (_) {}
        },
        [dispatch]
    );

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
        const abortController = new AbortController();
        loadAllOrders(abortController);
        loadAllServices(abortController);
        ablyChannels.orderQueueChannel.subscribe("added", handleAddOrder);
        ablyChannels.orderQueueChannel.subscribe("update", handleUpdateOrder);

        return () => {
            abortController.abort();
            ablyChannels.orderQueueChannel.unsubscribe("added", handleAddOrder);
            ablyChannels.orderQueueChannel.unsubscribe(
                "update",
                handleUpdateOrder
            );
        };
    }, [
        dispatch,
        handleAddOrder,
        handleUpdateOrder,
        loadAllOrders,
        loadAllServices,
    ]);

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
                    <Route path="services" element={<Services />} />
                    <Route path="admin/">
                        <Route index element={<Admin />} />
                        <Route path="services" element={<ServiceAdmin />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
