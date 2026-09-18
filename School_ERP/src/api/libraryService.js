import axiosInstance from './axios';

export const libraryService = {
  // Books CRUD
  getBooks: async (params = {}) => {
    const res = await axiosInstance.get('/library/books', { params });
    return res.data;
  },
  addBook: async (bookData) => {
    const res = await axiosInstance.post('/library/books', bookData);
    return res.data;
  },
  updateBook: async (id, data) => {
    const res = await axiosInstance.put(`/library/books/${id}`, data);
    return res.data;
  },
  deleteBook: async (id) => {
    const res = await axiosInstance.delete(`/library/books/${id}`);
    return res.data;
  },

  // Issue / Return
  issueBook: async (data) => {
    const res = await axiosInstance.post('/library/issue', data);
    return res.data;
  },
  getIssuedBooks: async (params = {}) => {
    const res = await axiosInstance.get('/library/issues', { params });
    return res.data;
  },
  returnBook: async (issueId) => {
    const res = await axiosInstance.put(`/library/return/${issueId}`);
    return res.data;
  }
};
