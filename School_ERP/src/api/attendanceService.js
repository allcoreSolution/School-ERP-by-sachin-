import axiosInstance from './axios';

export const attendanceService = {
  // Student Attendance
  getStudentAttendance: async (params = {}) => {
    const response = await axiosInstance.get('/attendance', { params });
    return response.data;
  },
  markStudentAttendance: async (data) => {
    const response = await axiosInstance.post('/attendance', data);
    return response.data;
  },
  getAttendanceSummary: async (params = {}) => {
    const response = await axiosInstance.get('/attendance/summary', { params });
    return response.data;
  },
  updateAttendance: async (id, data) => {
    const response = await axiosInstance.patch(`/attendance/${id}`, data);
    return response.data;
  }
};
