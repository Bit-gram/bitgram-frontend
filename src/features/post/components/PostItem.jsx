import React from "react";

const PostItem = ({ post }) => {
  const { userId, content, locationName, imageUrls, createdAt, status } = post;

  // 이미지가 없으면 회색 박스에 텍스트 표시
  const mainImage =
    imageUrls && imageUrls.length > 0
      ? imageUrls[0]
      : "https://placehold.co/600x600?text=No+Image";

  // 날짜 포맷팅 (YYYY-MM-DD)
  const dateStr = new Date(createdAt).toLocaleDateString();

  return (
    <div className="bg-white border-b border-gray-300 sm:border sm:rounded-lg mb-6 w-full max-w-[470px] mx-auto shadow-sm">
      {/* 1. 헤더: 프로필 */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          {/* 프로필 이미지 (원형) */}
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
            <img
              src={`https://ui-avatars.com/api/?name=User+${userId}&background=random`}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">User_{userId}</p>
            {locationName && (
              <p className="text-xs text-gray-500">{locationName}</p>
            )}
          </div>
        </div>
        {/* 더보기 버튼 (텍스트로 대체) */}
        <button className="text-gray-900 font-bold tracking-widest text-lg hover:opacity-50">
          •••
        </button>
      </div>

      {/* 2. 메인 이미지 */}
      <div className="w-full bg-gray-100">
        <img
          src={mainImage}
          alt="Post content"
          className="w-full h-auto object-cover max-h-[500px]"
        />
      </div>

      {/* 3. 액션 버튼 (이모지 활용) */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-3 text-2xl">
          <div className="flex items-center gap-4">
            <button className="hover:opacity-60 transition">❤️</button>
            <button className="hover:opacity-60 transition">💬</button>
            <button className="hover:opacity-60 transition">✈️</button>
          </div>
          <button className="hover:opacity-60 transition">🔖</button>
        </div>

        {/* 4. 좋아요 (더미) */}
        <p className="text-sm font-bold mb-2">좋아요 0개</p>

        {/* 5. 본문 */}
        <div className="text-sm mb-1">
          <span className="font-bold mr-2">User_{userId}</span>
          <span className="whitespace-pre-wrap">{content}</span>
        </div>

        {/* 6. 댓글 및 날짜 */}
        <p className="text-gray-500 text-sm mt-1 cursor-pointer">
          댓글 0개 모두 보기
        </p>
        <p className="text-gray-400 text-xs mt-1 uppercase">
          {dateStr} •{" "}
          <span className="text-xs">
            {status === "PUBLIC" ? "공개" : "비공개"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PostItem;
