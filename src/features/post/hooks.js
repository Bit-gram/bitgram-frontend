import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api";

export const usePostList = (page = 0) => {
  return useQuery({
    queryKey: ["posts", page], // 키: 페이지가 바뀌면 다시 호출
    queryFn: () => getPosts(page),
    staleTime: 1000 * 60 * 1, // 1분간 캐시 유지
    retry: false, // 에러(401 등) 발생 시 재시도 안 함
    // keepPreviousData: true, // (선택) 새 데이터 올 때까지 이전 데이터 보여주기
  });
};
