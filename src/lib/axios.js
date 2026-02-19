import axios from 'axios';

const instance = axios.create({
  baseURL: '', // vite.config.js에서 설정한 proxy(/api)를 사용하므로 비워둡니다.
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data.data !== undefined ? response.data.data : response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;