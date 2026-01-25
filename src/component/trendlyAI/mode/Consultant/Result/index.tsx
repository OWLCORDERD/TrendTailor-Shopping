"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect, useMemo, useState } from "react";
import { Trendly as CSS } from "@/styles";
import Image from "next/image";
import searchError from "@/assets/images/search-error.png";
import { retryRecommendOpenAI } from "@/store/chatBubbleSlice";
import { useSearchParams } from "next/navigation";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { keywordSearch } from "@/component/svgData";
import Trendly from "@/component/trendlyAI/bubble/Trendly";
import Link from "next/link";

interface ResultTemplate {
  // 챗봇 답변 및 의류 데이터
  assistant: {
    recommendInfo: recommendClothes[];
    products: clothes[];
  };
  createdAt: string;
  title: string;
  type: string;
  user: {
    info: {
      email: string;
      name: string;
    };
    QA_select: {
      selectLabel: string;
      step: string;
    }[];
  };
}

const Result = ({ docId }: any) => {
  const [searchFlag, setSearchFlag] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [consultingData, setConsultingData] = useState<ResultTemplate | null>(
    null
  );

  useEffect(() => {
    if (searchFlag) return;

    if (docId !== "" || docId !== undefined) {
      setSearchFlag(true);

      getConsultingResult();
    }
  }, [docId]);

  const getConsultingResult = async () => {
    setLoading(true);

    try {
      const chatCollection = collection(db, "recent-chats");
      const docRef = doc(chatCollection, docId);

      const snapShotDoc = await getDoc(docRef);

      if (snapShotDoc.exists()) {
        const data = snapShotDoc.data();
        console.log(data);
        setConsultingData(data as ResultTemplate);
      }
    } catch (err) {
      console.error("컨설팅 결과 조회 오류:", err);
    }

    setLoading(false);
  };

  const generateCreatingStatus = useAppSelector(
    (state) => state.chatBubble.generateCreating
  );

  const resultMessage: messageType = useMemo(() => {
    const message = {
      type: "chat",
      content: "",
    };

    if (
      consultingData?.assistant.products &&
      consultingData?.assistant.products.length > 0
    ) {
      const firstIdxMaker = consultingData.assistant.products[0].maker;
      const productCount = Number(consultingData.assistant.products.length);

      if (productCount < 2) {
        message.content = `회원님의 선택 사항을 기반으로 1건의 ${firstIdxMaker} 브랜드 트랜드 의류를 발견했어요.`;
      } else {
        message.content = `회원님의 선택 사항을 기반으로 ${firstIdxMaker}외의 ${
          productCount - 1
        }건의 브랜드 트랜드 의류를 발견했어요.`;
      }
    }

    return message;
  }, [consultingData]);

  const displayLabelType = (label: string) => {
    switch (label) {
      // 의류 종류 키워드
      case "top":
        return "상의";
      case "bottom":
        return "하의";
      case "outer":
        return "아우터";
      // 스타일 키워드
      case "office":
        return "오피스룩";
      case "sportify":
        return "스포티/운동룩";
      case "street":
        return "스트릿룩";
      case "minimal":
        return "미니멀룩";
      case "vintage":
        return "빈티지룩";
      // 성별 키워드
      case "female":
        return "여성";
      case "male":
        return "남성";
      // 추천 기준 키워드
      case "cheap":
        return "가성비";
      case "popular":
        return "인기";
      // 이외의 라벨은 가격선 라벨로 간주하여 처리
      default:
        return `${label.split("0")[0]}만원 이하`;
    }
  };

  const dispatch = useAppDispatch();

  return (
    <CSS.RecommendResult>
      <CSS.ResultSection>
        <div className='result-info'>
          <span className='result-info-icon'>{keywordSearch.icon()}</span>

          <h1 className='result-info-title'>회원님의 선택 키워드는</h1>

          <div className='select-keyword'>
            <div className='select-keyword-item'>
              <span className='index-title'>스타일 키워드</span>
              <ul className='keyword-list'>
                {consultingData?.user.QA_select.filter(
                  (item) => Number(item.step) <= 2
                ).map((item, index) => {
                  return (
                    <li className='keyword' key={index}>
                      {displayLabelType(item.selectLabel)}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className='select-keyword-item'>
              <span className='index-title'>선별 기준 키워드</span>
              <ul className='keyword-list'>
                {consultingData?.user.QA_select.filter(
                  (item) => Number(item.step) > 2
                ).map((item, index) => {
                  return (
                    <li className='keyword' key={index}>
                      {displayLabelType(item.selectLabel)}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <Trendly message={resultMessage} viewOnly={true} />
        </div>

        <ul className='product-list'>
          {consultingData?.assistant.products.map((item, index) => {
            return (
              <li className='product-list-item' key={index}>
                <Link
                  href={item.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='product-inner'
                >
                  <div className='product-img'>
                    <Image
                      src={item.image}
                      width={150}
                      height={200}
                      alt='추천 의류 이미지'
                    />
                  </div>

                  <div className='product-info'>
                    <h1 className='product-title'>{item.title}</h1>

                    <span className='product-maker'>{item.maker}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </CSS.ResultSection>
      {generateCreatingStatus === "error" && (
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
