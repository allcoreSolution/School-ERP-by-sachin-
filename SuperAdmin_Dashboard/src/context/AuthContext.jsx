import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sa_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username: email, password });
      
      if (response.data && response.data.success) {
         const authData = response.data.data || response.data;
         const { token } = authData;
         const dbUser = authData.user || authData;
         const userData = { 
           id: dbUser._id,
           name: dbUser.username || dbUser.name || 'Super Admin', 
           email: dbUser.email, 
           role: 'superadmin' // Ensure superadmin check
         };
         
         localStorage.setItem('sa_user', JSON.stringify(userData));
         localStorage.setItem('superadmin_token', token); // IMPORTANT FOR AXIOS Auth
         setUser(userData);
         return true;
      }
      return false;
    } catch (err) {
      console.error("SuperAdmin Login Error: ", err.response?.data?.message || err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('sa_user');
    localStorage.removeItem('superadmin_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
