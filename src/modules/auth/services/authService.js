import { api } from "@/libs/axios";

export const login = async (payload) => {
    const response = await api.post('login', payload);
    return response.data;
}

export const logout = async () => {
    const response = await api.post('logout');
    return response.data;

}

export const getUser = async () => {
    const response = await api.get('user');
    return response.data;
}