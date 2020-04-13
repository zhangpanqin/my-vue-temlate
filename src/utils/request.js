import axios from 'axios';
import env from '@/utils/env';

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

export default http;
