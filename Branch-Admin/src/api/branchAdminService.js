import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('branch_admin_token');
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
};

export const branchAdminService = {
  // Dashboard & Schools
  getDashboardStats: async () => {
    // Aggregation route across schools
    const res = await axios.get(`${API_URL}/super-admin/dashboard`, getAuthHeaders());
    return res.data;
  },
  
  getBranches: async () => {
    const res = await axios.get(`${API_URL}/tenants`, getAuthHeaders());
    return res.data;
  }
};
