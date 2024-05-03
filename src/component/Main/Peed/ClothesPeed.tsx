"use client";

import { ClothesPeed as CSS } from "styles";
import { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { clothes } from "./Peed";
import Loading from "component/fetchDB/loading/Loading";
import { ThemeContext } from "../../../../context/ThemeContext";

const ClothesPeed = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [clothesData, setClothesData] = useState<clothes[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const postMaxlength = 10;
  const MacPostMaxlength = 9;
  const [currentDB, setCurrentDB] = useState<clothes[]>([]);
  const { mode } = useContext(ThemeContext);

  const currentDBUpdate = useCallback(() => {
    if (clothesData !== undefined) {
      if (
        matchMedia("screen and (min-width : 1440px) and (max-width : 1900px)")
          .matches
      ) {
        const lastIndex = currentPage * MacPostMaxlength;
        const firstIndex = lastIndex - MacPostMaxlength;

        const currentData: clothes[] = clothesData.slice(firstIndex, lastIndex);

        const pushdata = [...currentDB];

        pushdata.push(...currentData);

        setCurrentDB(pushdata);

        setLoading(false);
      } else {
        const lastIndex = currentPage * postMaxlength;
        const firstIndex = lastIndex - postMaxlength;

        const currentData: clothes[] = clothesData.slice(firstIndex, lastIndex);

        const pushdata = [...currentDB];

        pushdata.push(...currentData);

        setCurrentDB(pushdata);

        setLoading(false);
      }
    }
  }, [currentPage]);

  const nextPage = (e: React.MouseEvent<HTMLDivElement>) => {
    if (clothesData !== undefined) {
      const maxPage = Math.ceil(clothesData.length / postMaxlength);

      if (currentPage < maxPage) {
        setCurrentPage((prev) => {
          return prev + 1;
        });
      }
    }
  };

  const naverApiHeaders: any = {
    "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID,
    "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET,
  };

  const fetchClothesData = async () => {
    const res = await fetch(`/api/clothes?query=스트릿패션&display=50`, {
      cache: "no-store",
      headers: naverApiHeaders,
    });

    if (!res.ok) {
      new Error("not connect to naver open api");
    }

    const data = await res.json();

    /*응답 값중 items 배열에 검색결과 의류 더미데이터들이 있음 */
    const clothesItems: clothes[] = data.items;

    /* 네이버 의류 API shop.json에서 데이터를 불러올때 title string값에 태그가 포함되어있음
    items배열에 map함수를 사용하여 각 item마다의 title값에만 replace 메소드 정규식을 통하여 태그 string 제거 */
    const replaceTitle: clothes[] = clothesItems.map((clothes) => {
      return {
        title: clothes.title.replace(/<[^>]*>?/g, ""),
        link: clothes.link,
        image: clothes.image,
        lprice: clothes.lprice,
        hprice: clothes.hprice,
        mallName: clothes.mallName,
        productId: clothes.productId,
        productType: clothes.productType,
        brand: clothes.brand,
        maker: clothes.maker,
        category1: clothes.category1,
        category2: clothes.category2,
        category3: clothes.category3,
        category4: clothes.category4,
      };
    });

    setClothesData(replaceTitle);
  };

  const firstCurrentDB = () => {
    if (clothesData) {
      if (
        matchMedia("screen and (min-width : 1440px) and (max-width : 1900px)")
          .matches
      ) {
        const lastIndex = currentPage * MacPostMaxlength;
        const firstIndex = lastIndex - MacPostMaxlength;

        const currentData: clothes[] = clothesData.slice(firstIndex, lastIndex);

        const pushdata = [...currentDB];

        pushdata.push(...currentData);

        setCurrentDB(pushdata);

        setLoading(false);
      } else {
        const lastIndex = currentPage * postMaxlength;
        const firstIndex = lastIndex - postMaxlength;

        const currentData: clothes[] = clothesData.slice(firstIndex, lastIndex);

        const pushdata = [...currentDB];

        pushdata.push(...currentData);

        setCurrentDB(pushdata);

        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchClothesData();
  }, []);

  useEffect(() => {
    if (currentDB.length > 0) return;

    if (clothesData && clothesData.length > 0) {
      firstCurrentDB();
    }
  }, [clothesData]);

  useEffect(() => {
    setLoading(true);
    currentDBUpdate();
  }, [currentPage]);

  return (
    <CSS.Container>
      <CSS.TitleBox>
        <CSS.Title>More Wish Clothes</CSS.Title>
        <CSS.Info>WISH에서 단독으로 추천하는 의류들을 소개합니다.</CSS.Info>
      </CSS.TitleBox>

      <CSS.PeedWrap>
        {currentDB.map((item) => {
          return (
            <CSS.ProductItem key={item.productId} $mode={mode}>
              <CSS.ProductImg>
                <Image
                  src={item.image}
                  alt='ClothesImg'
                  width='500'
                  height='500'
                />
              </CSS.ProductImg>

              <CSS.ProductInfo>
                <CSS.ProductTitle>{item.title}</CSS.ProductTitle>
                <CSS.ProductMall>{item.mallName}</CSS.ProductMall>
                <CSS.ProductPrice>{item.lprice}원</CSS.ProductPrice>
              </CSS.ProductInfo>
            </CSS.ProductItem>
          );
        })}
      </CSS.PeedWrap>

      <CSS.ViewMoreContainer>
        {!!loading ? <Loading /> : null}

        {!loading && clothesData !== undefined ? (
          <CSS.ViewMoreButton
            className={
              currentPage === Math.ceil(clothesData.length / postMaxlength)
                ? "remove"
                : ""
            }
            onClick={(e: any) => nextPage(e)}
          >
            <span>view more</span>
            <IoIosArrowDown />
          </CSS.ViewMoreButton>
        ) : null}
      </CSS.ViewMoreContainer>
    </CSS.Container>
  );
};

export default ClothesPeed;
