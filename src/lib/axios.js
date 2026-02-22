import axios from 'axios';

const instance = axios.create({
  // 1. 백엔드 주소가 정확히 입력되었는지 확인 (proxy 설정이 없다면 필수)
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
  // 응답 데이터 가공 로직 (매우 좋습니다)
  (response) => (response.data && response.data.data !== undefined ? response.data.data : response.data),
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 재시도한 적이 없을 때만 실행
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const email = localStorage.getItem('userEmail');
        const refreshToken = localStorage.getItem('refreshToken');

        console.log("토큰 재발급 시도 중...", email);

        // 2. 재발급 요청 시에는 baseURL이 포함된 전체 경로를 적어주는 것이 안전합니다.
        // 일반 axios를 사용하여 인터셉터 무한 루프를 방지합니다.
        const response = await axios.post('http://localhost:8080/api/auth/reissue', { 
          email, 
          refreshToken 
        });

        // 백엔드 ApiResponse 구조(result, message, data)에 맞춰 추출
        const newToken = response.data.data.accessToken; 
        
        localStorage.setItem('accessToken', newToken);
        console.log("새 토큰 저장 완료!");

        // 3. 원래 요청의 헤더를 새 토큰으로 교체
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        // 원래 요청 재실행 (instance 대신 axios를 쓰거나 설정을 다시 먹여야 함)
        return instance(originalRequest); 
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