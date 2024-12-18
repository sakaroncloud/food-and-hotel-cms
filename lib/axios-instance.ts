"use server";

import axios from "axios";
import { BACKEND_URL } from "./constants";
import { getSession } from "./actions/session";

const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    async (config: any) => {
        const session = await getSession()
        config.headers.Authorization = `Bearer ${session?.accessToken}`;
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response) {
            // Handle redirect status codes
            if ([301, 302].includes(error.response.status)) {
                const redirectUrl = error.response.headers.location;
                return axiosInstance.get(redirectUrl);
            }
            if ([401].includes(error.response.status)) {
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;