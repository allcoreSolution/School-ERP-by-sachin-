import axiosInstance from './axios';

export const transportService = {
  // Routes
  getRoutes: async () => {
    const response = await axiosInstance.get('/transport/routes');
    return response.data;
  },
  createRoute: async (data) => {
    const response = await axiosInstance.post('/transport/routes', data);
    return response.data;
  },
  updateRoute: async (id, data) => {
    const response = await axiosInstance.put(`/transport/routes/${id}`, data);
    return response.data;
  },
  deleteRoute: async (id) => {
    const response = await axiosInstance.delete(`/transport/routes/${id}`);
    return response.data;
  },

  // Vehicles
  getVehicles: async () => {
    const response = await axiosInstance.get('/transport/vehicles');
    return response.data;
  },
  addVehicle: async (data) => {
    const response = await axiosInstance.post('/transport/vehicles', data);
    return response.data;
  },
  updateVehicle: async (id, data) => {
    const response = await axiosInstance.put(`/transport/vehicles/${id}`, data);
    return response.data;
  },
  deleteVehicle: async (id) => {
    const response = await axiosInstance.delete(`/transport/vehicles/${id}`);
    return response.data;
  },

  // Drivers
  getDrivers: async () => {
    const response = await axiosInstance.get('/transport/drivers');
    return response.data;
  },
  addDriver: async (data) => {
    const response = await axiosInstance.post('/transport/drivers', data);
    return response.data;
  },
  deleteDriver: async (id) => {
    const response = await axiosInstance.delete(`/transport/drivers/${id}`);
    return response.data;
  }
};
