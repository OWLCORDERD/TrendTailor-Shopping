import Loading from "component/fetchDB/loading/Loading";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "store/hooks";
import { ProductDetail as CSS } from "styles";
import { FaPlus, FaMinus, FaHeart, FaCartArrowDown } from "react-icons/fa6";

interface selectSize {
  size: string;
  count: number;
  price: number;
}

const ProductDetail = () => {
  const currentProductDB = useAppSelector((state) => {
    return state.clothes.currentProduct;
  });

  const [selectSize, setSelectSize] = useState<selectSize[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const selectProductSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentSize = e.target.value;

    if (currentSize === "") return;

    let duplicate = false;

    selectSize.forEach((product) => {
      if (product.size === currentSize) {
        duplicate = true;
      }
    });

    if (!duplicate && currentProductDB) {
      const sizeObject = {
        size: currentSize,
        count: 1,
        price: Number(currentProductDB.lprice),
      };

      let updateSizeArray = [...selectSize];

      updateSizeArray.push(sizeObject);

      setSelectSize(updateSizeArray);

      setTotalAmount((amount) => amount + sizeObject.price);
    } else {
      alert("이미 선택한 옵션입니다.");
    }
  };

  const countSetState = (
    e: React.MouseEvent<HTMLButtonElement>,
    currentSize: string
  ) => {
    const currentValue = e.currentTarget.value;
    if (currentValue === "increment" && currentProductDB) {
      selectSize.forEach((product) => {
        if (product.size === currentSize) {
          product.count = product.count + 1;
          product.price = Number(currentProductDB.lprice) * product.count;
        }
      });
      setTotalAmount((amount) => amount + Number(currentProductDB.lprice));
    }

    if (currentValue === "decrement" && currentProductDB) {
      selectSize.forEach((product) => {
        if (product.size === currentSize) {
          product.count = product.count - 1;
          product.price = product.price - Number(currentProductDB.lprice);
        }
      });
      setTotalAmount((amount) => amount - Number(currentProductDB.lprice));
    }

    const updateSizeArray = [...selectSize];
    setSelectSize(updateSizeArray);
  };

  return (
    <CSS.Detail_container>
      {currentProductDB ? (
        <CSS.Detail_inner>
          <CSS.Product_imgBox>
            <Image
              src={currentProductDB.image}
              alt='상품 이미지'
              width='600'
              height='700'
            />
          </CSS.Product_imgBox>

          <CSS.Detail_menuBox>
            <CSS.ProductName>
              <h1>{currentProductDB.title}</h1>
            </CSS.ProductName>

            <CSS.ProductMall>
              <h2>{currentProductDB.mallName}</h2>
            </CSS.ProductMall>

            <CSS.ProductPrice>
              <h3>{currentProductDB.lprice}원</h3>
            </CSS.ProductPrice>

            <CSS.SelectSizeBox
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                selectProductSize(e)
              }
            >
              <option value=''>옵션 선택</option>
              <option value='M'>M</option>
              <option value='L'>L</option>
            </CSS.SelectSizeBox>

            <CSS.SelectProduct>
              {selectSize && selectSize.length > 0
                ? selectSize.map((product) => {
                    return (
                      <>
                        <CSS.SelectProductList>
                          <CSS.SelectProductName>
                            <h4>{`${product.size}`}</h4>
                          </CSS.SelectProductName>

                          <CSS.SelectCount>
                            <CSS.CountMinus
                              type='button'
                              value='decrement'
                              onClick={(
                                e: React.MouseEvent<HTMLButtonElement>
                              ) => countSetState(e, product.size)}
                              $count={product.count <= 1}
                            >
                              <FaMinus />
                            </CSS.CountMinus>

                            <CSS.CountState>
                              <span>{product.count}</span>
                            </CSS.CountState>

                            <CSS.CountPlus
                              type='button'
                              value='increment'
                              onClick={(
                                e: React.MouseEvent<HTMLButtonElement>
                              ) => countSetState(e, product.size)}
                            >
                              <FaPlus />
                            </CSS.CountPlus>
                          </CSS.SelectCount>

                          <CSS.SelectPrice>
                            <span>{product.price}원</span>
                          </CSS.SelectPrice>
                        </CSS.SelectProductList>
                      </>
                    );
                  })
                : null}
            </CSS.SelectProduct>

            <CSS.TotalAmountBox>
              <h5 className='title'>총 결제금액</h5>
              <span className='price'>{totalAmount}원</span>
            </CSS.TotalAmountBox>
            <CSS.ButtonList>
              <CSS.Buy_Button type='button'>구매하기</CSS.Buy_Button>
              <CSS.Bucket_Button type='button'>
                <FaCartArrowDown />
              </CSS.Bucket_Button>
              <CSS.Like_Button type='button'>
                <FaHeart />
                <span>1024</span>
              </CSS.Like_Button>
            </CSS.ButtonList>
          </CSS.Detail_menuBox>
        </CSS.Detail_inner>
      ) : (
        <Loading />
      )}
    </CSS.Detail_container>
  );
};

export default ProductDetail;
