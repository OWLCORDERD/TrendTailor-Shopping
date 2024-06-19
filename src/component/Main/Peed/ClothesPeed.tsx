"use client";

import { ClothesPeed as CSS } from "styles";
import { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { clothes } from "./Peed";
import Loading from "component/fetchDB/loading/Loading";
import { ThemeContext } from "../../../../context/ThemeContext";
import { useAppDispatch, useAppSelector } from "store/hooks";
import Link from "next/link";
import { allClothesData } from "store/staticClothes";
import { canselSearch } from "store/searchClothes";

interface allClothesProps {
  allClothes: clothes[];
}

const ClothesPeed = ({ allClothes }: allClothesProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const postMaxlength = 10;
  const [currentDB, setCurrentDB] = useState<clothes[]>([]);
  const { mode } = useContext(ThemeContext);
  const lastIndex = currentPage * postMaxlength;
  const firstIndex = lastIndex - postMaxlength;

  const clothesData = useAppSelector((state) => state.staticDB.allData);
  const dispatch = useAppDispatch();

  const currentDBUpdate = useCallback(() => {
    if (clothesData !== undefined) {
      const currentData: clothes[] = clothesData.slice(firstIndex, lastIndex);

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
    const currentData: clothes[] = clothesData.slice(firstIndex, lastIndex);

    const pushdata = [...currentDB];

    pushdata.push(...currentData);

    setCurrentDB(pushdata);

    setLoading(false);
  };

  useEffect(() => {
    dispatch(allClothesData(allClothes));
    dispatch(canselSearch());
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
        {currentDB.map((clothes) => {
          return (
            <CSS.ProductItem key={clothes.productId} $mode={mode}>
              <Link href={{ pathname: `/shop/${clothes.productId}` }}>
                <CSS.ProductImg>
                  <Image
                    src={clothes.image}
                    alt='ClothesImg'
                    width='500'
                    height='500'
                  />
                </CSS.ProductImg>

                <CSS.ProductInfo>
                  <CSS.ProductTitle>{clothes.title}</CSS.ProductTitle>
                  <CSS.ProductMall>{clothes.mallName}</CSS.ProductMall>
                  <CSS.ProductPrice>{clothes.lprice}원</CSS.ProductPrice>
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
