import axiosInstance from './axios';

export const planService = {
  getPlans: async () => {
    try {
      const response = await axiosInstance.get('/plans/list');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createPlan: async (planData) => {
    try {
      const response = await axiosInstance.post('/plans/create', planData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updatePlan: async (id, planData) => {
    try {
      const response = await axiosInstance.put(`/plans/${id}`, planData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deletePlan: async (id) => {
    try {
      const response = await axiosInstance.delete(`/plans/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
