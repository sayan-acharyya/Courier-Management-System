import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://courier-management-system-4bir.onrender.com/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});