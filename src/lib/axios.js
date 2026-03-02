import axios from "axios";
import { useAuthStore } from "../features/auth/store";
// features/auth/store.js 에서 스토어를 가져옵니다. (상대 경로 주의)

const instance = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 주소
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 🟢 요청 인터셉터: 헤더에 토큰 주입
instance.interceptors.request.use(
  (config) => {
    // 컴포넌트 밖에서도 getState()로 상태 접근 가능
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("📡 [Axios] 토큰 탑재 완료");
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 🔴 응답 인터셉터: 401 에러 처리
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("🚨 [Axios] 401 인증 만료 -> 로그아웃 처리");
      useAuthStore.getState().logout(); // 스토어의 로그아웃 함수 실행
      // 필요하다면 리다이렉트
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default instance;
