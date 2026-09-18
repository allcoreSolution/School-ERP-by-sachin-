import axiosInstance from './axios';

export const hrService = {
  // Staff Directory endpoints
  getStaff: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/staff', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getStaffById: async (id) => {
    try {
      const response = await axiosInstance.get(`/staff/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createStaff: async (staffData) => {
    try {
      const response = await axiosInstance.post('/staff', staffData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateStaff: async (id, staffData) => {
    try {
      const response = await axiosInstance.patch(`/staff/${id}`, staffData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteStaff: async (id) => {
    try {
      const response = await axiosInstance.delete(`/staff/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
