import { api } from "@/libs/axios";

export const getAccessLogs = async (params = new URLSearchParams()) => {
    const response = await api.get('access-logs', { params });
    return response.data;
}

export const getAccessLog = async (id) => {
    const response = await api.get(`access-logs/${id}`);
    return response.data;
}

export const deleteAccessLog = async (id) => {
    const response = await api.delete(`access-logs/${id}`);
    return response.data;
}

export const deleteAccessLogs = async (ids) => {
    const response = await api.delete('access-logs', { data: { ids } });
    return response.data;
}

