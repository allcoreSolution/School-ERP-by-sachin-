import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/superadmin';

export const superAdminService = {
  // Get Dashboard Analytics
  getDashboardAnalytics: async () => {
    const response = await axios.get(`${API_BASE_URL}/dashboard-analytics`);
    return response.data;
  },

  // Get Team Members
  getTeamMembers: async () => {
    const response = await axios.get(`${API_BASE_URL}/team`);
    return response.data;
  },

  // Add Team Member
  addTeamMember: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/team`, data);
    return response.data;
  },

  // Get Rate Cards
  getRateCards: async () => {
    const response = await axios.get(`${API_BASE_URL}/comms/rate-cards`);
    return response.data;
  },

  // Update Rate Cards
  updateRateCards: async (data) => {
    const response = await axios.put(`${API_BASE_URL}/comms/rate-cards`, data);
    return response.data;
  },

  // Get Website Templates
  getWebsiteTemplates: async () => {
    const response = await axios.get(`${API_BASE_URL}/website/templates`);
    return response.data;
  }
};
