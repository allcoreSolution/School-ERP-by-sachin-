import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/settings';

export const settingsService = {
  // Get all settings
  getAllSettings: async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },

  // Get specific setting
  getSetting: async (key) => {
    const response = await axios.get(`${API_BASE_URL}/${key}`);
    return response.data;
  },

  // Save/Update specific setting
  saveSetting: async (key, data) => {
    const response = await axios.put(`${API_BASE_URL}/${key}`, data);
    return response.data;
  },

  // Upload file (for settings like logos)
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Test SMTP Connection
  testSmtp: async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/test-smtp`, credentials);
    return response.data;
  }
};
