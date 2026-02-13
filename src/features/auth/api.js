import axios from 'axios';

const authApi = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' }
});

export const login = async (email, password) => {
  const response = await authApi.post('/api/auth/login', { email, password });
  
  const { accessToken, refreshToken } = response.data;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  
  return response.data;
};

export const signup = async (userData) => {
  const response = await authApi.post('/api/auth/signup', userData);
  return response.data;
};