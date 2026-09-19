import axiosInstance from './axios';

export const homeworkService = {
  getHomework: async (params = {}) => {
    const response = await axiosInstance.get('/homework', { params });
    return response.data;
  },
  assignHomework: async (formData) => {
    // We might need to send multipart/form-data for fileUrl
    const response = await axiosInstance.post('/homework/assign', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  deleteHomework: async (id) => {
    const response = await axiosInstance.delete(`/homework/${id}`);
    return response.data;
  }
};
