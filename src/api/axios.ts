import axios from "axios";
import type {UserAuthInfo} from "../types.ts";

const instance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    },
})

instance.interceptors.request.use(config => {
    const user = localStorage.getItem('user');
    if (user) {
        config.headers.Authorization = `Bearer ${(JSON.parse(user) as UserAuthInfo).accessToken}`;
    }
    return config;
}, error => Promise.reject(error));


instance.interceptors.response.use(response => {
    return response.data;
}, error => {
    return Promise.reject(error);
})

export default instance;