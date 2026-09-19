import axiosInstance from './axios';

export const examService = {
  getExams: async (params = {}) => {
    const response = await axiosInstance.get('/exams/exam-schedule', { params });
    return response.data;
  },
  createExam: async (data) => {
    const response = await axiosInstance.post('/exams/exam-schedule', data);
    return response.data;
  },
  addResult: async (data) => {
    const response = await axiosInstance.post('/exams/results', data);
    return response.data;
  },
  getResults: async (params = {}) => {
    const response = await axiosInstance.get('/exams/results', { params });
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
