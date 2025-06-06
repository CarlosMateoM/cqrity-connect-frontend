import Axios from "axios";
import { useToast } from "vue-toastification";

export const api = Axios.create({
    //baseURL: 'https://api.cqrity-connect.site/api/v1',
    baseURL: 'http://localhost:8000/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        
        const toast = useToast();

        if (error.response) {

            const status = error.response.status;

            switch (status) {
                case 403:
                    toast.error('Acceso denegado.');
                    break;
            }

        }

        return Promise.reject(error);
    });