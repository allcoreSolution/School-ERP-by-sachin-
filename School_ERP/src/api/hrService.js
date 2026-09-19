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
      const response = await axiosInstance.post('/staff', staffData);
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
  },

  // Leaves
  getLeaves: async () => {
    const response = await axiosInstance.get('/hr/leaves');
    return response.data;
  },
  applyLeave: async (data) => {
    const response = await axiosInstance.post('/hr/leaves', data);
    return response.data;
  },
  updateLeaveStatus: async (id, status) => {
    const response = await axiosInstance.patch(`/hr/leaves/${id}/status`, { status });
    return response.data;
  },
  
  // Salary Config and Templates
  getSalaryTemplates: async () => {
    const response = await axiosInstance.get('/hr/salary-templates');
    return response.data;
  },
  saveSalaryTemplate: async (data) => {
    const response = await axiosInstance.post('/hr/salary-templates', data);
    return response.data;
  },
  getStaffSalary: async (staffId) => {
    const response = await axiosInstance.get(`/hr/salary/staff/${staffId}`);
    return response.data;
  },
  setStaffSalary: async (staffId, data) => {
    const response = await axiosInstance.post(`/hr/salary/staff/${staffId}`, data);
    return response.data;
  }
};
