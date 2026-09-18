import axiosInstance from './axios';

export const superAdminService = {
  // Get Dashboard Analytics
  getDashboardAnalytics: async () => {
    const response = await axiosInstance.get(`/superadmin/dashboard-analytics`);
    return response.data;
  },

  // Get Team Members
  getTeamMembers: async () => {
    const response = await axiosInstance.get(`/superadmin/team`);
    return response.data;
  },

  // Add Team Member
  addTeamMember: async (data) => {
    const response = await axiosInstance.post(`/superadmin/team`, data);
    return response.data;
  },

  // Get Rate Cards
  getRateCards: async () => {
    const response = await axiosInstance.get(`/superadmin/comms/rate-cards`);
    return response.data;
  },

  // Update Rate Cards
  updateRateCards: async (data) => {
    const response = await axiosInstance.put(`/superadmin/comms/rate-cards`, data);
    return response.data;
  },

  // Get Website Templates
  getWebsiteTemplates: async () => {
    const response = await axiosInstance.get(`/superadmin/website/templates`);
    return response.data;
  }
};
