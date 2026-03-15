// src/features/post/hooks.js
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createPost, getPosts } from "./api";

export const usePostList = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialPageParam: 0, // 첫 페이지 번호
    getNextPageParam: (lastPage) => {
      // lastPage는 백엔드에서 받은 Page 객체입니다.
      // 마지막 페이지가 아니라면 다음 페이지 번호(현재번호 + 1)를 리턴합니다.
      if (!lastPage.last) {
        return lastPage.number + 1;
      }
      return undefined; // 더 이상 불러올 페이지가 없으면 undefined 리턴
    },
  });
};

// 🔥 새 게시물 작성 훅 추가
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // 업로드 성공 시, 피드 목록(posts)을 초기화하고 다시 불러옵니다!
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
