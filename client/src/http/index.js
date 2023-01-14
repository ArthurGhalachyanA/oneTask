import axios from 'axios';

export const BASE_URL = 'http://localhost:5000';
export const API_URL = BASE_URL + '/api';

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
});

api.interceptors.response.use((config) => {
    return config;

}, async (error) => {
    const originalRequest = error.config;

    if(error.response && error.response.status === 401 && !originalRequest.sent){
        originalRequest.sent = true;
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials:true});
            localStorage.setItem('token', response.data.tokens.accessToken);

            return api.request(originalRequest);
        }catch (e) {
            localStorage.removeItem('token');
            window.location.href = window.location.origin;

            return Promise.reject(error);
        }
    }

    return error.response;
});

export default api;