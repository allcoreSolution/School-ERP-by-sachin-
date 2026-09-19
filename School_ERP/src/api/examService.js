import axiosInstance from './axios';

export const examService = {
  getExams: async (params = {}) => {
    const response = await axiosInstance.get('/exams', { params });
    return response.data;
  },
  createExam: async (data) => {
    const response = await axiosInstance.post('/exams', data);
    return response.data;
  },
  updateExam: async (id, data) => {
    const response = await axiosInstance.patch(`/exams/${id}`, data);
    return response.data;
  },
  deleteExam: async (id) => {
    const response = await axiosInstance.delete(`/exams/${id}`);
    return response.data;
  },
  // Marks
  getMarks: async (params = {}) => {
    const response = await axiosInstance.get('/exams/marks', { params });
    return response.data;
  },
  saveMarks: async (data) => {
    const response = await axiosInstance.post('/exams/marks', data);
    return response.data;
  },
  // Online Exams
  getOnlineExams: async (params = {}) => {
    const response = await axiosInstance.get('/online-exams', { params });
    return response.data;
  },
  createOnlineExam: async (data) => {
    const response = await axiosInstance.post('/online-exams', data);
    return response.data;
  },
  deleteOnlineExam: async (id) => {
    const response = await axiosInstance.delete(`/online-exams/${id}`);
    return response.data;
  }
};
