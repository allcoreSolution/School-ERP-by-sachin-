import axiosInstance from './axios';

export const frontOfficeService = {
  // Visitor Book
  getVisitors: async (params = {}) => {
    const response = await axiosInstance.get('/front-office/visitors', { params });
    return response.data;
  },
  addVisitor: async (data) => {
    const response = await axiosInstance.post('/front-office/visitors', data);
    return response.data;
  },
  // Admission Enquiries
  getEnquiries: async (params = {}) => {
    const response = await axiosInstance.get('/front-office/enquiries', { params });
    return response.data;
  },
  addEnquiry: async (data) => {
    const response = await axiosInstance.post('/front-office/enquiries', data);
    return response.data;
  },
  updateEnquiry: async (id, data) => {
    const response = await axiosInstance.patch(`/front-office/enquiries/${id}`, data);
    return response.data;
  },
  deleteEnquiry: async (id) => {
    const response = await axiosInstance.delete(`/front-office/enquiries/${id}`);
    return response.data;
  },
  // Complaints
  getComplaints: async (params = {}) => {
    const response = await axiosInstance.get('/front-office/complaints', { params });
    return response.data;
  },
  addComplaint: async (data) => {
    const response = await axiosInstance.post('/front-office/complaints', data);
    return response.data;
  },
  updateComplaint: async (id, data) => {
    const response = await axiosInstance.patch(`/front-office/complaints/${id}`, data);
    return response.data;
  },
  // Postal Records
  getPostalRecords: async (params = {}) => {
    const response = await axiosInstance.get('/front-office/postal', { params });
    return response.data;
  },
  addPostalRecord: async (data) => {
    const response = await axiosInstance.post('/front-office/postal', data);
    return response.data;
  }
};
