import axiosInstance from './axios';

// Consolidates the multiple finance routes from backend
export const financeService = {
  // Fee Types
  getFeeTypes: async () => {
    const response = await axiosInstance.get('/fee-types');
    return response.data;
  },
  
  // Fee Groups 
  getFeeGroups: async () => {
    const response = await axiosInstance.get('/fee-groups');
    return response.data;
  },

  // Collect Fees
  collectFee: async (feeData) => {
    const response = await axiosInstance.post('/collect-fees', feeData);
    return response.data;
  },

  // Transactions
  getAllTransactions: async (params = {}) => {
    const response = await axiosInstance.get('/all-transactions', { params });
    return response.data;
  },

  // Expenses
  getExpenses: async (params = {}) => {
    const response = await axiosInstance.get('/expenses', { params });
    return response.data;
  },
  
  createExpense: async (expenseData) => {
    const response = await axiosInstance.post('/expenses', expenseData);
    return response.data;
  }
};
