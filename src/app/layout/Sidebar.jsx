// src/components/layout/Sidebar.jsx (경로는 편하신 곳에 만드셔도 됩니다!)
import React, { useState } from "react";
import CreatePostModal from "../../features/post/components/CreatePostModal"; // 경로에 맞게 수정해주세요!

const Sidebar = () => {
  // 모달 상태를 이제 피드 페이지가 아닌 사이드바에서 직접 관리합니다!
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* 🌟 좌측 고정 사이드바 */}
      <nav className="fixed left-0 top-0 h-screen w-16 md:w-60 bg-white border-r border-gray-200 flex flex-col px-3 py-8 z-40">
        <h1 className="text-2xl font-bold mb-10 hidden md:block px-3 tracking-tight">
          BitGram
        </h1>
        <h1 className="text-xl font-bold mb-10 block md:hidden text-center italic">
          B
        </h1>

        <div className="flex flex-col gap-2 w-full">
          {/* 홈 버튼 */}
          <button className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition w-full group">
            <svg
              aria-label="홈"
              fill="currentColor"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              className="group-hover:scale-105 transition-transform"
            >
              <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.998 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path>
            </svg>
            <span className="hidden md:block font-semibold">홈</span>
          </button>

          {/* 🔥 만들기 버튼 */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition w-full group"
          >
            <svg
              aria-label="새로운 게시물"
              fill="currentColor"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              className="group-hover:scale-105 transition-transform"
            >
              <path
                d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.299 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="6.545"
                x2="17.455"
                y1="12"
                y2="12"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="12"
                x2="12"
                y1="6.545"
                y2="17.455"
              ></line>
            </svg>
            <span className="hidden md:block font-medium">만들기</span>
          </button>

          {/* 추후 여기에 검색, 내 프로필 등 다른 메뉴들을 추가하면 됩니다! */}
        </div>
      </nav>

      {/* 모달 렌더링 (사이드바에 귀속됨) */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Sidebar;
