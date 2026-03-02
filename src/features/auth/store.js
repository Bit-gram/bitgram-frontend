import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,

      // 로그인 성공 (토큰 저장)
      loginSuccess: (token, userInfo) =>
        set({
          accessToken: token,
          user: userInfo,
          isAuthenticated: true,
        }),

      // 로그아웃 (토큰 삭제)
      logout: () =>
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "bitgram-auth", // localStorage 저장 키 이름
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
