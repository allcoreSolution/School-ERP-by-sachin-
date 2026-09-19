import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('accountant_token');
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
};

export const accountantService = {
  // Fee Types
  getFeeTypes: async () => {
    const res = await axios.get(`${API_URL}/fees/types`, getAuthHeaders());
    return res.data;
  },
  addFeeType: async (data) => {
    const res = await axios.post(`${API_URL}/fees/types`, data, getAuthHeaders());
    return res.data;
  },
  deleteFeeType: async (id) => {
    const res = await axios.delete(`${API_URL}/fees/types/${id}`, getAuthHeaders());
    return res.data;
  },

  // Fee Groups
  getFeeGroups: async () => {
    const res = await axios.get(`${API_URL}/fees/groups`, getAuthHeaders());
    return res.data;
  },
  addFeeGroup: async (data) => {
    const res = await axios.post(`${API_URL}/fees/groups`, data, getAuthHeaders());
    return res.data;
  },
  deleteFeeGroup: async (id) => {
    const res = await axios.delete(`${API_URL}/fees/groups/${id}`, getAuthHeaders());
    return res.data;
  },

  // Fee Assign
  assignFees: async (data) => {
    const res = await axios.post(`${API_URL}/fees/assign`, data, getAuthHeaders());
    return res.data;
  },
  
  // Fees
  getDueFees: async (params) => {
    const res = await axios.get(`${API_URL}/fees/collections/due`, { ...getAuthHeaders(), params });
    return res.data;
  },
  collectFee: async (data) => {
    const res = await axios.post(`${API_URL}/fees/collections`, data, getAuthHeaders());
    return res.data;
  },
  
  // Dashboard & Transactions
  getDashboardStats: async () => {
    const res = await axios.get(`${API_URL}/finance/dashboard`, getAuthHeaders());
    return res.data;
  },
  
  getDayBook: async (date) => {
    const res = await axios.get(`${API_URL}/finance/day-book`, { ...getAuthHeaders(), params: { date } });
    return res.data;
  },
  
  // Incomes
  addIncome: async (data) => {
    const res = await axios.post(`${API_URL}/fees/collections`, data, getAuthHeaders()); 
    return res.data;
  },
  getIncomes: async () => {
    // For MVP, we simulate income using fee collections or dashboard stats
    const res = await axios.get(`${API_URL}/fees/collections`, getAuthHeaders());
    return res.data;
  },
  
  // Expenses
  addExpense: async (data) => {
    const res = await axios.post(`${API_URL}/expenses`, data, getAuthHeaders());
    return res.data;
  },
  getExpenses: async () => {
    const res = await axios.get(`${API_URL}/expenses`, getAuthHeaders());
    return res.data;
  }
};
