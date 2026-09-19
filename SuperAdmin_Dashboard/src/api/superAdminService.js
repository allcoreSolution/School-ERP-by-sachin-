import axiosInstance from './axios';

export const superAdminService = {
  // Dashboard overall view
  getDashboardAnalytics: async () => {
    const res = await axiosInstance.get(`/super-admin/dashboard`);
    return res.data;
  },
  
  // Schools / Tenants management
  getSchools: async () => {
    const res = await axiosInstance.get(`/tenants`);
    return res.data;
  },
  
  createSchool: async (data) => {
    const res = await axiosInstance.post(`/tenants`, data);
    return res.data;
  },
  
  // Example for handling billing or subscriptions later
  getPlans: async () => {
    const res = await axiosInstance.get(`/plans`);
    return res.data;
  }
};
