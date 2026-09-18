import axiosInstance from './axios';

export const lessonPlanService = {
  getLessonPlans: async (params = {}) => {
    const response = await axiosInstance.get('/lesson-plans', { params });
    return response.data;
  },
  createLessonPlan: async (data) => {
    const response = await axiosInstance.post('/lesson-plans', data);
    return response.data;
  },
  updateLessonPlan: async (id, data) => {
    const response = await axiosInstance.patch(`/lesson-plans/${id}`, data);
    return response.data;
  },
  deleteLessonPlan: async (id) => {
    const response = await axiosInstance.delete(`/lesson-plans/${id}`);
    return response.data;
  }
};
