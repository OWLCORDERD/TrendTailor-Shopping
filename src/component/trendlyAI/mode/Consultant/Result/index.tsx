import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect } from "react";
import { Trendly as CSS } from "@/styles";
import { v4 as uuidV4 } from "uuid";
import Image from "next/image";
import { useSession } from "next-auth/react";
import searchError from "@/assets/images/search-error.png";
import {
  retryRecommendOpenAI,
} from "@/store/chatBubbleSlice";

const Result = () => {
  // 컨설팅 검색 결과 채널 목록 데이터
  const consultingResultData = useAppSelector(
    (state) => state.chatBubble.consultingResultData
  );

  const generateCreatingStatus = useAppSelector(
    (state) => state.chatBubble.generateCreating
  );

  const dispatch = useAppDispatch();

  return (
    <CSS.RecommendResult>
      {generateCreatingStatus === "error" &&
      (
        <CSS.ResultError>
          {/* 추천 컨설턴트 채널 검색 실패 시, 활성화 화면 */}
          <div className='error-icon'>
            <Image
              src={searchError}
              width={140}
              height={140}
              alt='검색 실패 아이콘'
            />
          </div>

          <div className='txt-wrap'>
            <h1 className='error-txt'>
              서버 혹은 프롬프트 오류로 인해 <br />
              컨설턴트 검색에 실패하였습니다.
            </h1>

            <span className='error-sub-txt'>
              선택한 답변들로 다시 시도하시겠습니까?
            </span>
          </div>

          <button
            type='button'
            className='retry-btn'
            onClick={() => dispatch(retryRecommendOpenAI())}
          >
            재요청하기
          </button>
        </CSS.ResultError>
      )}
    </CSS.RecommendResult>
  );
};

export default Result;
