import { api } from "@/libs/axios";

export const accessRequests = async (payload) => {
    const response = await api.post('access-requests', payload);
    return response.data;
}