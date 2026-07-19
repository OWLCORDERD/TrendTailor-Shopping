"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Dashboard as CSS } from "@/styles";
import SystemLabel from "../ui/SystemLabel";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  currentKeywordDetailUpdate,
  drawForceGraph,
  keywordSampleClothes,
} from "@/store/simulationInstance";
import { drawForceGraphPayload } from "../ui/Hero";
import "@/styles/hero.scss";
import KeywordPreview from "@/component/Main/Peed/KeywordPreview";
import * as generateTrendKeywordPipeline from "@/feature/trend/jobs/generate-keyword.jobs";
import { save, trendKeywordsType } from "@/feature/trend/repositories/trend.repository";

const KeywordMapGraph = ({
  type,
  children,
}: {
  type: string;
  children?: React.ReactNode;
}) => {
  // const dummyData = [
  //   {
  //     id: 1,
  //     label: "블록코어",
  //     value: "120",
  //   },
  //   {
  //     id: 2,
  //     label: "블록코어",
  //     value: "120",
  //   },
  //   {
  //     id: 3,
  //     label: "블록코어",
  //     value: "120",
  //   },
  // ];

  // const keywordGraphRoot = useAppSelector(
  //   (state) => state.simulation?.keywordGraphRoot
  // );
  // const previewOpen = useAppSelector((state) => state.simulation.previewOpen);

  // const currentDetail = useAppSelector(
  //   (state) => state.simulation.currentDetail
  // );

  // const dispatch = useAppDispatch();
  // const [isMounted, setIsMounted] = useState<boolean>(false);

  // const ref = useRef<any>(null);

  // const graphRenderMotion = {
  //   initial: {
  //     opacity: 0,
  //     transform: "scale(0.8)",
  //   },
  //   animate: {
  //     opacity: 1,
  //     transform: "scale(1)",
  //     transition: {
  //       duration: 1,
  //       ease: "easeInOut",
  //     },
  //   },
  // };

  // const updateCurrentDetail = useCallback(
  //   (nodeDetail: any) => {
  //     dispatch(currentKeywordDetailUpdate(nodeDetail));
  //   },
  //   [dispatch]
  // );

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // useEffect(() => {
  //   dispatch(keywordSampleClothes());
  // }, [dispatch]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (ref.current === null && !previewOpen) {
  //       if (keywordGraphRoot !== null) {
  //         dispatch(
  //           drawForceGraph({
  //             keywordGraphRoot,
  //             updateCurrentDetail,
  //           } as drawForceGraphPayload)
  //         );
  //       }
  //     }
  //   }, 500);
  // }, [previewOpen, keywordGraphRoot, updateCurrentDetail, dispatch]);

  // useEffect(() => {
  //   if (!keywordGraphRoot) return;
  //   if (keywordGraphRoot === null) return;

  //   dispatch(
  //     drawForceGraph({
  //       keywordGraphRoot,
  //       updateCurrentDetail,
  //     } as drawForceGraphPayload)
  //   );
  // }, [keywordGraphRoot, updateCurrentDetail, dispatch]);

  let SINGLE_FLIGHT = false;
  useEffect(() => {
    if (SINGLE_FLIGHT) return;
    
    const trendKeywords: trendKeywordsType[] = [
      {
          name: "스포티즘",
          description: "운동과 일상복을 결합한 스타일로, 편안함과 활동성을 중시한다.",
          aliases: [
              "Sportism"
          ],
          category: "스포츠",
          confidence: 0.9,
          season: [
              "SS"
          ],
          relatedStyles: [
              {
                  name: "캐주얼",
                  score: 0.8
              },
              {
                  name: "스트리트",
                  score: 0.7
              },
              {
                  name: "미니멀리즘",
                  score: 0.6
              }
          ],
          children: {
              tops: [
                  "스포츠 티셔츠",
                  "후드티",
                  "조끼"
              ],
              bottoms: [
                  "조거 팬츠",
                  "레깅스",
                  "바람막이 바지"
              ],
              shoes: [
                  "운동화",
                  "슬리퍼",
                  "샌들"
              ]
          }
      },
      {
          name: "미니멀리즘",
          description: "군더더기를 없애고 기본적인 디자인을 강조하는 스타일이다.",
          aliases: [
              "Minimalism"
          ],
          category: "캐주얼",
          confidence: 0.85,
          season: [
              "SS"
          ],
          relatedStyles: [
              {
                  name: "스포티즘",
                  score: 0.6
              },
              {
                  name: "스트리트",
                  score: 0.5
              },
              {
                  name: "모던",
                  score: 0.7
              }
          ],
          children: {
              tops: [
                  "심플 티셔츠",
                  "셔츠",
                  "니트"
              ],
              bottoms: [
                  "슬랙스",
                  "청바지",
                  "반바지"
              ],
              shoes: [
                  "로퍼",
                  "스니커즈",
                  "플랫"
              ]
          }
      },
      {
          name: "스트리트",
          description: "도시의 거리 문화에서 영감을 받은 스타일로, 개성과 자유로움을 표현한다.",
          aliases: [
              "Street"
          ],
          category: "스트리트",
          confidence: 0.8,
          season: [
              "SS"
          ],
          relatedStyles: [
              {
                  name: "스포티즘",
                  score: 0.7
              },
              {
                  name: "캐주얼",
                  score: 0.6
              },
              {
                  name: "빈티지",
                  score: 0.5
              }
          ],
          children: {
              tops: [
                  "그래픽 티셔츠",
                  "조거 후드",
                  "바람막이"
              ],
              bottoms: [
                  "카고 팬츠",
                  "데님 팬츠",
                  "치마"
              ],
              shoes: [
                  "부츠",
                  "스니커즈",
                  "슬리퍼"
              ]
          }
      },
      {
          name: "빈티지",
          description: "과거의 스타일을 현대적으로 재해석한 패션이다.",
          aliases: [
              "Vintage"
          ],
          category: "캐주얼",
          confidence: 0.75,
          season: [
              "SS"
          ],
          relatedStyles: [
              {
                  name: "스트리트",
                  score: 0.6
              },
              {
                  name: "미니멀리즘",
                  score: 0.5
              },
              {
                  name: "레트로",
                  score: 0.7
              }
          ],
          children: {
              tops: [
                  "복고풍 셔츠",
                  "티셔츠",
                  "자켓"
              ],
              bottoms: [
                  "미니스커트",
                  "와이드 팬츠",
                  "청바지"
              ],
              shoes: [
                  "빈티지 스니커즈",
                  "로퍼",
                  "샌들"
              ]
          }
      },
      {
          name: "로맨틱",
          description: "부드러운 색감과 여성스러운 디자인이 특징인 스타일이다.",
          aliases: [
              "Romantic"
          ],
          category: "캐주얼",
          confidence: 0.7,
          season: [
              "SS"
          ],
          relatedStyles: [
              {
                  name: "프레피",
                  score: 0.5
              },
              {
                    name: "보헤미안",
                  score: 0.6
              },
              {
                  name: "미니멀리즘",
                  score: 0.4
              }
          ],
          children: {
              tops: [
                  "블라우스",
                  "프릴 티셔츠",
                  "니트"
              ],
              bottoms: [
                  "플레어 스커트",
                  "롱 스커트",
                  "청바지"
              ],
              shoes: [
                  "발레리나 플랫",
                  "힐",
                  "샌들"
              ]
          }
      },
      {
          name: "프레피",
          description: "전통적인 학교 스타일에서 영감을 받은 캐주얼한 패션이다.",
          aliases: [
              "Preppy"
          ],
          category: "캐주얼",
          confidence: 0.65,
          season: [
              "SS"
          ],
            relatedStyles: [
              {
                  name: "로맨틱",
                  score: 0.5
              },
              {
                  name: "미니멀리즘",
                  score: 0.4
              },
              {
                  name: "빈티지",
                  score: 0.3
              }
          ],
          children: {
              tops: [
                  "폴로 셔츠",
                  "스웨터",
                  "블라우스"
              ],
              bottoms: [
                  "치마",
                  "슬랙스",
                  "반바지"
              ],
              shoes: [
                  "로퍼",
                  "스니커즈",
                  "부츠"
              ]
          }
      },
      {
          name: "보헤미안",
          description: "자유롭고 자연 친화적인 스타일로, 다양한 패턴과 소재를 사용한다.",
          aliases: [
              "Bohemian"
          ],
          category: "캐주얼",
          confidence: 0.6,
          season: [
              "SS"
          ],
              relatedStyles: [
              {
                  name: "로맨틱",
                  score: 0.5
              },
              {
                  name: "프레피",
                  score: 0.4
              },
              {
                  name: "빈티지",
                  score: 0.3
              }
          ],
          children: {
              tops: [
                  "맥시 드레스",
                  "블라우스",
                  "티셔츠"
              ],
              bottoms: [
                  "롱 스커트",
                  "와이드 팬츠",
                  "청바지"
              ],
              shoes: [
                  "샌들",
                  "플랫",
                  "부츠"
              ]
          }
      },
  ]
    save(trendKeywords);
    
    SINGLE_FLIGHT = true;

    setTimeout(() => {
      SINGLE_FLIGHT = false;
    }, 500)
  }, []);
  return (
    <>
      {type === "hero" ? (
        <CSS.KeywordGraphHero>
          <div className='hero-inner'>
            <div className='hero-left'>
              <SystemLabel type='eyebrow' labelTxt='Trend Keyword Map' />

              <p className='hero-title'>
                올해 가장 주목한 <strong>스타일</strong>들이 연결되고 있어요.
              </p>

              <span className='description'>
                최근 30일간 수집된 12만 건의 트렌드 데이터에서 함께 언급된
                키워드끼리 연결선을 그렸어요. 큰 노드일수록 언급량이 많고,
                가까운 노드일수록 관련성이 높습니다.
              </span>
            </div>

            {/* {previewOpen &&
            currentDetail?.keyword &&
            currentDetail?.typeOfClothes ? (
              <div ref={ref}>
                <KeywordPreview />
              </div>
            ) : (
              <motion.div
                variants={graphRenderMotion}
                initial='initial'
                animate='animate'
                className='keyword-graph'
              />
            )} */}
          </div>
        </CSS.KeywordGraphHero>
      ) : null}
    </>
  );
};

export default KeywordMapGraph;
