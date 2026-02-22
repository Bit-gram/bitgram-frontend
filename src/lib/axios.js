import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', 
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
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => (response.data && response.data.data !== undefined ? response.data.data : response.data),
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const email = localStorage.getItem('userEmail');
        const refreshToken = localStorage.getItem('refreshToken');

        console.log("토큰 재발급 시도 중...", email);

        const response = await axios.post('http://localhost:8080/api/auth/reissue', { 
          email, 
          refreshToken 
        });

        const newToken = response.data.data.accessToken; 
        localStorage.setItem('accessToken', newToken);

        console.log("새 토큰 저장 완료!");

        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        return axios(originalRequest);
      } catch (reissueError) {
        console.error("토큰 재발급 실패 (리프레시 토큰 만료 등):", reissueError);
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(reissueError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;