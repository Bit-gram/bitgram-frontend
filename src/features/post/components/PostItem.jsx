// src/features/post/components/PostItem.jsx
import React from "react";

// 숫자 포맷팅 함수 (1700 -> 1.7천, 11000 -> 1.1만)
const formatCount = (count) => {
  if (count >= 10000)
    return (count / 10000).toFixed(1).replace(".0", "") + "만";
  if (count >= 1000) return (count / 1000).toFixed(1).replace(".0", "") + "천";
  return count.toString();
};

// 인스타 스타일 시간 포맷팅 함수 (방금, 15분, 1시간, 1일)
const formatTime = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "방금";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}분`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}시간`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}일`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  return `${diffInWeeks}주`;
};

const PostItem = ({ post }) => {
  const {
    userId = "Unknown",
    content = "",
    locationName,
    imageUrls,
    createdAt,
    // 테스트용 더미 데이터 (실제 데이터에 맞게 수정 가능)
    likeCount = 1700,
    commentCount = 11000,
  } = post;

  const mainImage =
    imageUrls && imageUrls.length > 0
      ? imageUrls[0]
      : `https://placehold.co/600x600/efefef/b0b0b0?text=BitGram+Post`;

  const profileImage = `https://ui-avatars.com/api/?name=User+${userId}&background=random&rounded=true&size=32`;
  const timeStr = formatTime(createdAt);

  return (
    <article className="bg-white border-b border-gray-200 sm:border sm:rounded-md mb-6 w-full max-w-[470px] mx-auto text-sm">
      {/* 1. 헤더: 프로필, 닉네임, 시간 */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={profileImage}
            alt="profile"
            className="w-8 h-8 rounded-full border border-gray-200 object-cover"
          />
          <div className="flex flex-col justify-center">
            {/* 닉네임 + 시간 */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-gray-900 cursor-pointer">
                User_{userId}
              </span>
              <span className="text-gray-500 text-xs">• {timeStr}</span>
            </div>
            {/* 위치 정보 */}
            {locationName && (
              <span className="text-xs text-gray-900 mt-0.5">
                {locationName}
              </span>
            )}
          </div>
        </div>
        {/* 더보기 버튼 */}
        <button className="text-gray-900 hover:text-gray-500">
          <svg
            aria-label="옵션 더 보기"
            fill="currentColor"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <circle cx="12" cy="12" r="1.5"></circle>
            <circle cx="6" cy="12" r="1.5"></circle>
            <circle cx="18" cy="12" r="1.5"></circle>
          </svg>
        </button>
      </div>

      {/* 2. 메인 컨텐츠 영역 (사진 짤림 방지) */}
      {/* aspect-square 제거, h-auto 적용하여 원본 비율 유지, 최대 높이 지정 */}
      <div className="w-full bg-gray-50 border-y border-gray-100 flex items-center justify-center">
        <img
          src={mainImage}
          alt="Post content"
          className="w-full h-auto max-h-[600px] object-contain"
        />
      </div>

      {/* 3. 하단 액션 버튼 & 카운트 */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-5">
          {/* 좋아요 + 숫자 */}
          <button className="flex items-center gap-1.5 hover:opacity-60 transition-opacity text-gray-900">
            <svg
              aria-label="좋아요"
              fill="currentColor"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.543 1.117 1.543s.277-.368 1.117-1.543a4.21 4.21 0 0 1 3.675-1.941z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            <span className="font-semibold text-sm">
              {formatCount(likeCount)}
            </span>
          </button>

          {/* 댓글 + 숫자 */}
          <button className="flex items-center gap-1.5 hover:opacity-60 transition-opacity text-gray-900">
            <svg
              aria-label="댓글 달기"
              fill="currentColor"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            <span className="font-semibold text-sm">
              {formatCount(commentCount)}
            </span>
          </button>

          {/* 공유(DM) 아이콘 */}
          <button className="hover:opacity-60 transition-opacity">
            <svg
              aria-label="게시물 공유"
              fill="currentColor"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <line
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="22"
                x2="9.218"
                y1="3"
                y2="10.083"
              ></line>
              <polygon
                fill="none"
                points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              ></polygon>
            </svg>
          </button>
        </div>

        {/* 저장(북마크) 아이콘 */}
        <button className="hover:opacity-60 transition-opacity">
          <svg
            aria-label="저장"
            fill="currentColor"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <polygon
              fill="none"
              points="20 21 12 13.44 4 21 4 3 20 3 20 21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></polygon>
          </svg>
        </button>
      </div>

      {/* 4. 본문 (닉네임 + 내용) */}
      <div className="px-4 pb-4 leading-relaxed">
        <span className="font-semibold mr-2 cursor-pointer hover:underline">
          User_{userId}
        </span>
        <span className="whitespace-pre-wrap break-words">{content}</span>
      </div>
    </article>
  );
};

export default PostItem;
