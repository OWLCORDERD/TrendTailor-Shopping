import React, { useState } from "react";
import { Trendly as CSS } from "@/styles";
import TrendlyBubble from "@/component/trendlyAI/bubble/Trendly";
import { IoIosAttach } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

const Consultant = () => {
  const aiMessage =
    "안녕하세요, 민혁님! 지금부터 민혁님에게 어울리는 의류 컨설팅을 위해 간단한 설문조사를 시작할게요.";

  const [openAIQuestion, setOpenAIQuestion] = useState<string>("");
  // 2025.02.02: openAI API 질문 요청
  const requestOpenAI = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 입력칸에서 enter 키 눌렀을때만 실행
    if (e.key === "Enter") {
      const res = await fetch("/api/recommendOpenAI", {
        method: "POST",
        body: JSON.stringify({
          question: openAIQuestion,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
      }
    }
  };

  // 2025.02.02: 사용자 질문 입력값 실시간 업데이트
  const onChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpenAIQuestion(e.target.value);
  };
  return (
    <CSS.ConsultantMode>
      <TrendlyBubble message={aiMessage} />
      {/* 챗봇 채팅창 영역 */}
      <CSS.SearchForm>
        <CSS.SearchInput>
          <input
            type='text'
            maxLength={100}
            onKeyDown={requestOpenAI}
            onChange={onChangeQuestion}
            placeholder='무엇이든 질문하세요.'
          />
          <button type='button' className='search-button'>
            <FaSearch color='#fff' fontSize={18} />
          </button>
        </CSS.SearchInput>

        <CSS.SearchTool>
          <button type='button' className='attach-file'>
            {/* onMouseEnter={() => setTooltipActive(true)}
                        onMouseLeave={() => setTooltipActive(false)} */}
            <IoIosAttach fontSize={18} />

            {/* {tooltipActive ? (
              <motion.div
                className='tooltip'
                variants={tooltipAnimated}
                animate='animate'
                initial='initial'
              >
                <span>파일첨부</span>
              </motion.div>
            ) : null} */}
          </button>
        </CSS.SearchTool>
      </CSS.SearchForm>
    </CSS.ConsultantMode>
  );
};

export default Consultant;
