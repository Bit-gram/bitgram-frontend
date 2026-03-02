import React, { useState } from "react";
import { usePostList } from "../../features/post/hooks"; // 훅 import
import PostItem from "../../features/post/components/PostItem"; // (경로 확인 필요)

const FeedPage = () => {
  const [page, setPage] = useState(0);

  // React Query 훅 사용
  const { data, isLoading, isError, error } = usePostList(page);

  // 백엔드 응답 구조에 맞춰 데이터 추출 (Page 객체의 content)
  const posts = data?.content || [];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 pt-8 pb-10">
      {/* 로딩 상태 */}
      {isLoading && <div className="mt-20 text-gray-500">Loading...</div>}

      {/* 에러 상태 */}
      {isError && (
        <div className="mt-20 text-red-500">
          <p>⚠️ {error.response?.data?.message || "에러가 발생했습니다."}</p>
          {error.response?.status === 401 && <p>로그인이 필요합니다.</p>}
        </div>
      )}

      {/* 게시물 리스트 */}
      {!isLoading && !isError && (
        <div className="w-full flex flex-col items-center px-2 sm:px-0">
          {posts.length > 0 ? (
            posts.map((post) => <PostItem key={post.id} post={post} />)
          ) : (
            <div className="mt-20 text-gray-400">게시물이 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedPage;
