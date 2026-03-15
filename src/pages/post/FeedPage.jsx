// src/pages/post/FeedPage.jsx
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { usePostList } from "../../features/post/hooks";
import PostItem from "../../features/post/components/PostItem";
import Sidebar from "../../app/layout/Sidebar";

const FeedPage = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePostList();
  const { ref, inView } = useInView();

  // 💡 모달 관련 상태(useState)는 모두 Sidebar로 이사 갔으므로 삭제!

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 🌟 분리된 사이드바 컴포넌트 렌더링 */}
      <Sidebar />

      {/* 🌟 메인 컨텐츠 영역 */}
      <main className="flex-1 ml-16 md:ml-60 flex flex-col items-center pt-10 px-4 pb-10">
        {isLoading && (
          <div className="mt-10 text-gray-500">피드 로딩 중...</div>
        )}
        {isError && (
          <div className="mt-10 text-red-500">⚠️ 에러가 발생했습니다.</div>
        )}

        {!isLoading && !isError && (
          <div className="w-full flex flex-col items-center">
            {data?.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.content.map((post) => (
                  <PostItem key={post.postId} post={post} />
                ))}
              </React.Fragment>
            ))}

            {/* 스크롤 감지 영역 */}
            <div
              ref={ref}
              className="h-10 w-full flex items-center justify-center text-gray-400 text-sm mt-4"
            >
              {isFetchingNextPage
                ? "게시물 더 불러오는 중..."
                : hasNextPage
                  ? ""
                  : "마지막 게시물입니다 👏"}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FeedPage;
