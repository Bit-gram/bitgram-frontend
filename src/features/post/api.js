import instance from "../../lib/axios";

// 게시물 목록 조회
export const getPosts = async (page = 0, size = 10) => {
  const response = await instance.get(
    `/posts?page=${page}&size=${size}&sort=createdAt,DESC`,
  );
  return response.data; // 백엔드 응답 그대로 반환 (Page 객체 등)
};
