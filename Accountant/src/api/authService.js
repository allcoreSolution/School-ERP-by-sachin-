import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const authService = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data?.success && response.data?.data?.token) {
      localStorage.setItem('accountant_token', response.data.data.token);
      localStorage.setItem('accountant_user', JSON.stringify(response.data.data));
    }
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('accountant_token');
    localStorage.removeItem('accountant_user');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('accountant_user');
    return user ? JSON.parse(user) : null;
  }
};
