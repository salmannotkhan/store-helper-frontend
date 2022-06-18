import React from "react";
import { createRoot } from "react-dom/client";
import "assets/css/index.css";
import App from "./App";
import GlobalState from "state/GlobalState";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <GlobalState>
            <App />
        </GlobalState>
    </React.StrictMode>
);
