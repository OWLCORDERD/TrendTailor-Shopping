"use client";

import { ClothesPeed as CSS } from "styles";
import { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import Loading from "@/component/common/Loading";
import { ThemeContext } from "../../../../../context/ThemeContext";
import Link from "next/link";
import { ThreeDots } from "react-loader-spinner";
import NextImage from "@/component/common/NextImage";

interface allClothesProps {
  clothesData: trendClothes[] | undefined;
}

const ClothesPeed = ({ clothesData }: allClothesProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const postMaxlength = 10;
  const [currentDB, setCurrentDB] = useState<trendClothes[]>([]);
  const { mode } = useContext(ThemeContext);
  const lastIndex = currentPage * postMaxlength;
  const firstIndex = lastIndex - postMaxlength;

  const currentDBUpdate = useCallback(() => {
    if (clothesData !== undefined) {
      const currentData: trendClothes[] = clothesData.slice(firstIndex, lastIndex);

      const pushdata = [...currentDB];

      pushdata.push(...currentData);

      setCurrentDB(pushdata);

      setLoading(false);
    }
  }, [currentPage]);

  const nextPage = (e: React.MouseEvent<HTMLDivElement>) => {
    if (clothesData) {
      const maxPage = Math.ceil(clothesData.length / postMaxlength);

      if (currentPage < maxPage) {
        setCurrentPage((prev) => {
          return prev + 1;
        });
      }
    }
  };

  const firstCurrentDB = () => {
    if (clothesData) {
      const currentData: trendClothes[] = clothesData.slice(firstIndex, lastIndex);

      const pushdata = [...currentDB];

      pushdata.push(...currentData);

      setCurrentDB(pushdata);

      setLoading(false);
    }
  };

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

  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImgLoad = (productId: string) => {
    setLoadedImages((prev) => {
      if (prev.has(productId)) return prev;
      return new Set(prev).add(productId);
    });
  };

  return (
    <CSS.Container>
      <CSS.TitleBox>
        <CSS.Title>금주 트렌드 의류</CSS.Title>
        <CSS.Info>
          금주에 가장 많은 사람들이 찾은 인기 의류들을 소개합니다.
        </CSS.Info>
      </CSS.TitleBox>

      <CSS.PeedWrap>
        {currentDB.map((clothes) => {
          return (
            <CSS.ProductItem key={clothes.productId} $mode={mode}>
              <Link href={clothes.link} target='_blank'>
                <CSS.ProductImg>
                  <NextImage
                    src={clothes.thumbnail}
                    alt={`${clothes.title} 이미지`}
                    width={500}
                    height={500}
                    hasSkeleton={true}
                  />
                </CSS.ProductImg>

                <CSS.ProductInfo>
                  <CSS.ProductTitle>{clothes.title}</CSS.ProductTitle>
                  <CSS.ProductMall>
                    <Image
                      src={clothes.brandIcon}
                      alt={`${clothes.brand} 로고 아이콘`}
                      width='20'
                      height='20'
                    />
                    <span>{clothes.brand}</span>
                  </CSS.ProductMall>
                </CSS.ProductInfo>
              </Link>
            </CSS.ProductItem>
          );
        })}
      </CSS.PeedWrap>

      <CSS.ViewMoreContainer>
        {loading ? <Loading /> : null}

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
