import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('parent_token');
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
};

export const financeService = {
  getFeeCollections: async (studentId) => {
    const res = await axios.get(`${API_URL}/fees/collections?studentId=${studentId}`, getAuthHeaders());
    return res.data;
  },
  
  getFeeAssignments: async (studentId) => {
    const res = await axios.get(`${API_URL}/fees/assignments?studentId=${studentId}`, getAuthHeaders());
    return res.data;
  }
};
