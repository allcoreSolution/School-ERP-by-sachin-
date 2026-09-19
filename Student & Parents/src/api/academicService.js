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

export const academicService = {
  getLiveClasses: async () => {
    const res = await axios.get(`${API_URL}/live-classes`, getAuthHeaders());
    return res.data;
  },
  
  getHomework: async () => {
    // Homework for student's class (backend typically resolves this via auth token or we fetch by class ID)
    const res = await axios.get(`${API_URL}/homework`, getAuthHeaders());
    return res.data;
  },
  
  getExams: async () => {
    const res = await axios.get(`${API_URL}/exams/schedule`, getAuthHeaders());
    return res.data;
  },

  getReportCard: async (studentId) => {
    const res = await axios.get(`${API_URL}/exams/results/${studentId}`, getAuthHeaders());
    return res.data;
  }
};
