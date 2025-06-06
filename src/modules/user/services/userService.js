import { api } from "@/libs/axios";

export const getUsers = async (params = new URLSearchParams()) => {
    const response = await api.get('/users', { params });
    return response.data;
}

export const getUser = async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
}
export const createUser = async (payload) => {
    const response = await api.post('/users', payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const updateUser = async (id, payload) => {
    const response = await api.post(`/users/${id}`, {
        '_method': 'put',
        ...payload,
    },
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

    return response.data;
}

export const deleteUser = async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
}