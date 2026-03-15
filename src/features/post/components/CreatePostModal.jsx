// src/features/post/components/CreatePostModal.jsx
import React, { useState } from "react";
import { useCreatePost } from "../hooks";

const CreatePostModal = ({ isOpen, onClose }) => {
  // 다단계 상태: 1(선택) -> 2(자르기) -> 3(편집) -> 4(문구입력)
  const [step, setStep] = useState(1);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const { mutate: uploadPost, isPending } = useCreatePost();

  if (!isOpen) return null;

  // 이미지 선택 시 미리보기 생성 & 다음 단계로 이동
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setStep(2);
    }
  };

  // 모달 닫기 & 상태 초기화
  const handleClose = () => {
    setStep(1);
    setContent("");
    setImageFile(null);
    setPreviewUrl(null);
    onClose();
  };

  // 서버 전송 (4단계 공유)
  const handleSubmit = () => {
    if (!content.trim() && !imageFile) {
      alert("내용이나 이미지를 추가해주세요.");
      return;
    }

    const formData = new FormData();
    const requestData = {
      content: content,
      locationName: "",
      status: "PUBLIC",
    };
    formData.append(
      "data",
      new Blob([JSON.stringify(requestData)], { type: "application/json" }),
    );

    if (imageFile) {
      formData.append("images", imageFile);
    }

    uploadPost(formData, {
      onSuccess: () => {
        alert("게시물이 공유되었습니다!");
        handleClose();
      },
      onError: (error) => {
        console.error(error);
        alert("업로드에 실패했습니다.");
      },
    });
  };

  // 상단 헤더 제목
  const getHeaderTitle = () => {
    if (step === 1 || step === 4) return "새 게시물 만들기";
    if (step === 2) return "자르기";
    if (step === 3) return "편집";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white hover:opacity-70 p-2"
      >
        <svg
          aria-label="닫기"
          fill="currentColor"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="21"
            x2="3"
            y1="3"
            y2="21"
          ></line>
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="21"
            x2="3"
            y1="21"
            y2="3"
          ></line>
        </svg>
      </button>

      <div
        className={`bg-white rounded-xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          step === 4 ? "w-[850px] h-[550px]" : "w-[500px] h-[550px]"
        }`}
      >
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between px-4 h-[42px] border-b border-gray-300 shrink-0">
          <div className="w-10">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="text-gray-900 hover:text-gray-500 flex items-center h-full"
              >
                <svg
                  aria-label="돌아가기"
                  fill="currentColor"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="2.909"
                    x2="22.001"
                    y1="12.004"
                    y2="12.004"
                  ></line>
                  <polyline
                    fill="none"
                    points="9.276 4.726 2.001 12.004 9.276 19.274"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></polyline>
                </svg>
              </button>
            )}
          </div>

          <h2 className="font-semibold text-gray-900 flex-1 text-center">
            {getHeaderTitle()}
          </h2>

          <div className="w-10 flex justify-end">
            {(step === 2 || step === 3) && (
              <button
                onClick={() => setStep(step + 1)}
                className="text-blue-500 font-semibold hover:text-blue-700 whitespace-nowrap"
              >
                다음
              </button>
            )}
            {step === 4 && (
              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="text-blue-500 font-semibold hover:text-blue-700 whitespace-nowrap disabled:opacity-50"
              >
                {isPending ? "로딩..." : "공유"}
              </button>
            )}
          </div>
        </div>

        {/* 모달 바디 */}
        <div className="flex-1 flex overflow-hidden">
          {/* 🌟 Step 1: 사진 선택 (아이콘 깨짐 해결 - 이미지 플레이스홀더 사용) */}
          {step === 1 && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-white">
              {/* 깨지던 SVG를 깔끔한 이미지로 교체 */}
              <div className="mb-4">
                <img
                  src="https://placehold.co/128x128/f1f5f9/94a3b8?text=Upload"
                  alt="Photo Upload Placeholder"
                  className="w-24 h-24 shrink-0"
                />
              </div>
              <p className="text-[20px] text-gray-900 mb-6">
                사진과 동영상을 여기에 끌어다 놓으세요
              </p>
              <label className="bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold text-sm py-1.5 px-4 rounded-lg cursor-pointer transition">
                컴퓨터에서 선택
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {/* Step 2 & 3: 자르기 & 편집 (이미지 비율 유지 Object-Contain) */}
          {(step === 2 || step === 3) && (
            <div className="flex-1 bg-gray-100 flex items-center justify-center">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Step 4: 문구 입력 및 공유 (이미지 비율 유지 Object-Cover 분할 뷰) */}
          {step === 4 && (
            <div className="flex w-full h-full">
              {/* 좌측: 비율 유지 이미지 ( Object-Cover) */}
              <div className="w-[500px] h-[508px] bg-gray-50 flex items-center justify-center border-r border-gray-200 shrink-0 overflow-hidden">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="min-w-full min-h-full max-w-none max-h-none object-cover"
                />
              </div>

              {/* 우측: 문구 입력 */}
              <div className="flex-1 flex flex-col bg-white h-full">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-7 h-7 bg-gray-200 rounded-full overflow-hidden">
                    <img
                      src="https://ui-avatars.com/api/?name=User&background=random"
                      alt="profile"
                    />
                  </div>
                  <span className="font-semibold text-gray-900">User_Name</span>
                </div>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="문구를 입력하세요..."
                  className="w-full flex-1 p-4 border-none focus:ring-0 resize-none text-gray-800 placeholder-gray-400 text-sm outline-none"
                ></textarea>

                <div className="border-t border-gray-200 p-3 flex justify-between items-center text-gray-500 hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm">위치 추가</span>
                  <svg
                    aria-label="위치 추가"
                    fill="currentColor"
                    height="16"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <path d="M12.053 8.105a1.604 1.604 0 1 0 1.604 1.604 1.604 1.604 0 0 0-1.604-1.604Zm0-7.105a8.684 8.684 0 0 0-8.708 8.66c0 5.699 6.14 11.495 8.108 13.123a1.212 1.212 0 0 0 1.2 0c1.968-1.628 8.108-7.424 8.108-13.123A8.684 8.684 0 0 0 12.053 1Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
