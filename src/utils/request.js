import axios from 'axios';
import env from '@/utils/env';
import { Message } from 'element-ui';

if (!window.CONFIG.remote) {
    if (env.isDev) {
        window.CONFIG.remote = process.env.VUE_APP_BASE_API;
    } else {
        window.CONFIG.remote = process.env.VUE_APP_TARGET_API;
    }
}
const http = axios.create({
    timeout: 10000,
});
http.defaults.baseURL = window.CONFIG.remote;

http.interceptors.request.use((config) => config, (error) => {
    Promise.reject(error);
});
http.interceptors.response.use(
    (response) => response.data,
    (error) => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000,
        });
        return Promise.reject(error);
    },
);
export default http;
