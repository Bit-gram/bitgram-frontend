// src/features/post/api.js
import instance from "../../lib/axios";

export const getPosts = async ({ pageParam = 0 }) => {
  const response = await instance.get(
    `/api/posts?page=${pageParam}&size=5&sort=createdAt,DESC`,
  );
  return response.data.data; // 백엔드의 Page 객체 리턴
};

export const createPost = async (formData) => {
  const response = await instance.post("/api/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
