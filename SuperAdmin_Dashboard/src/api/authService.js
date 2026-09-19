import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const authService = {
  login: async (credentials) => {
    // Attempt login to authentication route 
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data?.success && response.data?.data?.token) {
      localStorage.setItem('superadmin_token', response.data.data.token);
      localStorage.setItem('superadmin_user', JSON.stringify(response.data.data));
    }
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('superadmin_token');
    localStorage.removeItem('superadmin_user');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('superadmin_user');
    return user ? JSON.parse(user) : null;
  }
};
