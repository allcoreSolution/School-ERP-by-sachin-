import axiosInstance from './axios';

export const settingsService = {
  // Get all settings
  getAllSettings: async () => {
    const response = await axiosInstance.get(`/settings`);
    return response.data;
  },

  // Get specific setting
  getSetting: async (key) => {
    const response = await axiosInstance.get(`/settings/${key}`);
    return response.data;
  },

  // Save/Update specific setting
  saveSetting: async (key, data) => {
    const response = await axiosInstance.put(`/settings/${key}`, data);
    return response.data;
  },

  // Upload file (for settings like logos)
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosInstance.post(`/settings/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Test SMTP Connection
  testSmtp: async (credentials) => {
    const response = await axiosInstance.post(`/settings/test-smtp`, credentials);
    return response.data;
  }
};
