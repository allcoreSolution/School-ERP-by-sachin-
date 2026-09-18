import axiosInstance from './axios';

export const tenantService = {
  // Fetch all registered schools/tenants
  getTenants: async () => {
    try {
      const response = await axiosInstance.get('/tenant/list');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a single tenant by id
  getTenantById: async (id) => {
    try {
      const response = await axiosInstance.get(`/tenant/${id}`);
      return response.data;
    } catch (error) {
       throw error;
    }
  },

  // Update a tenant
  updateTenant: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/tenant/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register a new school
  registerTenant: async (tenantData) => {
    try {
      const response = await axiosInstance.post('/tenant/register', tenantData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Hard delete a school
  deleteTenant: async (id) => {
    try {
      const response = await axiosInstance.delete(`/tenant/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Suspend/Deactivate a school
  suspendTenant: async (id) => {
    try {
      const response = await axiosInstance.put(`/tenant/${id}/suspend`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get SuperAdmin Dashboard Status
  getDashboardStats: async () => {
    try {
      const response = await axiosInstance.get('/tenant/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Recharge a tenant's wallet
  rechargeWallet: async (schoolId, smsAmount, whatsappAmount) => {
    try {
      const response = await axiosInstance.put('/tenant/wallet/recharge', { schoolId, smsAmount, whatsappAmount });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all support tickets
  getAllTickets: async () => {
    try {
      const response = await axiosInstance.get('/tenant/tickets');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
