import { useAppSelector } from "@/store/hooks";
import React, { useEffect, useMemo } from "react";
import { Trendly as CSS } from "@/styles";
import { v4 as uuidV4 } from "uuid";
import Image from "next/image";
import Chatbot from "@/assets/images/chatbot.png";

interface ResultTemplate {
  index: {
    templateId: string;
    title: string;
  };
  reasonSummary: {
    title: string;
    content: any;
  };
  consultant: {
    title: string;
    content: any;
  };
}

const Result = () => {
  // 실시간 결과 저장할 고유 세션 아이디 생성 (대화 내역 세션 저장용)
  const sessionId = uuidV4();
  const consultingResultData = useAppSelector(
    (state) => state.chatBubble.consultingResultData
  );

  const aiRecommendTemplate: ResultTemplate = useMemo(() => {
    const template: ResultTemplate = {
      index: {
        templateId: sessionId,
        title: "회원님에게 딱 맞는 컨설턴트 탐색을 완료했어요!",
      },
      reasonSummary: {
        title: "",
        content: {},
      },
      consultant: {
        title: "",
        content: {},
      },
    };

    if (consultingResultData) {
      const recommendData = consultingResultData.content;
      template.reasonSummary.title = "👨🏻‍💻 AI의 컨설턴트 선정 이유";
      template.reasonSummary.content = recommendData.aiComment;
      template.consultant.title = "📝 컨설턴트 유튜버 프로필";
      template.consultant.content = recommendData.recommendationYoutuber;
    }

    return template;
  }, [consultingResultData]);
  return (
    <CSS.RecommendResult>
      <CSS.ResultHeader>
        <Image src={Chatbot} width={50} height={38} alt='챗봇 아이콘' />
        <h3 className='result-txt'>{aiRecommendTemplate.index.title}</h3>
      </CSS.ResultHeader>

      <CSS.ResultSection>
        <CSS.ResultStep>
          <p className='step-title'>
            {aiRecommendTemplate.reasonSummary.title}
          </p>
          <div className='summary'>
            <span className='summary-comment'>
              {aiRecommendTemplate.reasonSummary.content.summary}
            </span>
            <ul className='summary-reason'>
              {aiRecommendTemplate.reasonSummary.content.reason.map(
                (reason: string, index: number) => (
                  <li key={index}>• {reason}</li>
                )
              )}
            </ul>
          </div>
        </CSS.ResultStep>

        <CSS.ResultStep>
          <p className='step-title'>{aiRecommendTemplate.consultant.title}</p>
          <div className='consultant-channel'>
            <div className='thumbnail'>
              <Image
                src={
                  aiRecommendTemplate.consultant.content.channelInfo
                    .channelThumbnail
                }
                width={80}
                height={80}
                alt='유튜브 채널 썸네일'
                className='channel-thumbnail'
              />
            </div>

            <ul className='channel-info'>
              <li>
                <span className='channel-name'>
                  {aiRecommendTemplate.consultant.content.channelName}
                </span>
              </li>
              <li>
                <div className='channel-label'>구독자</div>
                <span className='channel-subscriber'>
                  {
                    aiRecommendTemplate.consultant.content.channelInfo
                      .subscriberCount
                  }
                  명
                </span>
              </li>
              <li>
                <span className='channel-desc'>
                  {
                    aiRecommendTemplate.consultant.content.channelInfo
                      .channelDesc
                  }
                </span>
              </li>
            </ul>
          </div>
        </CSS.ResultStep>
      </CSS.ResultSection>
    </CSS.RecommendResult>
  );
};

export default Result;
