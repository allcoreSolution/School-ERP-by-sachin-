import axiosInstance from './axios';

export const liveClassService = {
  getLiveClasses: async (params = {}) => {
    const response = await axiosInstance.get('/live-classes', { params });
    return response.data;
  },
  scheduleClass: async (data) => {
    const response = await axiosInstance.post('/live-classes/schedule', data);
    return response.data;
  }
};
