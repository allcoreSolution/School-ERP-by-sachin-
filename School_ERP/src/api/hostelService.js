import axiosInstance from './axios';

export const hostelService = {
  getHostels: async () => {
    const response = await axiosInstance.get('/hostels');
    return response.data;
  },
  createHostel: async (data) => {
    const response = await axiosInstance.post('/hostels', data);
    return response.data;
  },
  updateHostel: async (id, data) => {
    const response = await axiosInstance.patch(`/hostels/${id}`, data);
    return response.data;
  },
  deleteHostel: async (id) => {
    const response = await axiosInstance.delete(`/hostels/${id}`);
    return response.data;
  }
};
