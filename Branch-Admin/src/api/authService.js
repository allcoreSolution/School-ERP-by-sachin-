import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const authService = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data?.success && response.data?.data?.token) {
      localStorage.setItem('branch_admin_token', response.data.data.token);
      localStorage.setItem('branch_admin_user', JSON.stringify(response.data.data));
    }
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('branch_admin_token');
    localStorage.removeItem('branch_admin_user');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('branch_admin_user');
    return user ? JSON.parse(user) : null;
  }
};
