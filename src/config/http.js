import axios from "axios";

const http = axios.create({
    baseURL:
        process.env.NODE_ENV === "development"
            ? "http://localhost:3001"
            : "https://store-helper-backend.vercel.app",
});

export default http;
