import instance  from "../../lib/axios";

export const login = async (email, password) => {
  const data = await instance.post('/api/auth/login', { email, password });
  
  const { accessToken, refreshToken } = data; 
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('userEmail', email);

  return data;
};

export const signup = async (userData) => {
  return await instance.post('/api/auth/signup', userData);
};

export const reissueToken = async () => {
  const email = localStorage.getItem('userEmail');
  const refreshToken = localStorage.getItem('refreshToken');
  
  const data = await instance.post('/api/auth/reissue', { email, refreshToken });
  
  const { accessToken } = data;
  localStorage.setItem('accessToken', accessToken);
  
  return accessToken;
};