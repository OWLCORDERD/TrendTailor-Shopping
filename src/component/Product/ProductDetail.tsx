import Loading from "component/fetchDB/loading/Loading";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { ProductDetail as CSS } from "styles";
import { FaPlus, FaMinus, FaHeart, FaCartArrowDown } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { addCart } from "store/cartReducer";
import { ThemeContext } from "../../../context/ThemeContext";

interface selectSize {
  size: string;
  count: number;
  price: number;
}

const ProductDetail = () => {
  const searchStatus = useAppSelector((state) => {
    return state.searchDB.status;
  });

  const currentProductDB = useAppSelector((state) => {
    return searchStatus
      ? state.searchDB.currentProduct
      : state.clothesDB.currentProduct;
  });

  const dispatch = useAppDispatch();

  const { data, status } = useSession();
  const { mode } = useContext(ThemeContext);

  const [selectSize, setSelectSize] = useState<selectSize[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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

    e.target.value = "";
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

  const deleteSelectSize = (
    e: React.MouseEvent<HTMLDivElement>,
    currentSize: string
  ) => {
    e.preventDefault();

    selectSize.forEach((product, index) => {
      if (product.size === currentSize) {
        setTotalAmount((amount) => amount - product.price);
        selectSize.splice(index, 1);
      }
    });

    const updateSizeArray = [...selectSize];
    setSelectSize(updateSizeArray);
  };

  const cartUpdate = async () => {
    if (status !== "authenticated") {
      alert("로그인 시, 이용 가능합니다.");
      return;
    }

    if (data.user) {
      const user = data.user.name;
      const sendData = {
        username: user,
        product: currentProductDB,
      };

      dispatch(addCart(sendData));
    }
  };

  return (
    <CSS.Detail_container>
      {currentProductDB && !loading ? (
        <CSS.Detail_inner>
          <CSS.Product_imgBox>
            <Image
              src={currentProductDB.image}
              alt={`${currentProductDB.title} 상품 이미지`}
              width='600'
              height='700'
            />
          </CSS.Product_imgBox>

          <CSS.Detail_menuBox>
            <CSS.ProductName>
              <h1>{currentProductDB.title}</h1>
            </CSS.ProductName>

            <CSS.DetailInfo>
              <caption>의류 정보</caption>

              <tbody>
                <CSS.ProductBrand>
                  <th>브랜드</th>
                  <td>{currentProductDB.mallName}</td>
                </CSS.ProductBrand>

                <CSS.ProductPrice>
                  <th>판매가</th>
                  <td>{currentProductDB.lprice}</td>
                </CSS.ProductPrice>

                <CSS.ProductSize>
                  <th>사이즈</th>
                  <td>
                    <CSS.SizeSelect
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        selectProductSize(e)
                      }
                    >
                      <option value=''>옵션 선택</option>
                      <option value='M'>M</option>
                      <option value='L'>L</option>
                    </CSS.SizeSelect>
                  </td>
                </CSS.ProductSize>
              </tbody>
            </CSS.DetailInfo>

            <CSS.SelectProduct>
              {selectSize && selectSize.length > 0
                ? selectSize.map((product) => {
                    return (
                      <>
                        <CSS.SelectProductList>
                          <CSS.SelectProductName>
                            <h2>{`${product.size}`}</h2>
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

                          <CSS.DeleteSize
                            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                              deleteSelectSize(e, product.size)
                            }
                          >
                            <IoClose />
                          </CSS.DeleteSize>
                        </CSS.SelectProductList>
                      </>
                    );
                  })
                : null}
            </CSS.SelectProduct>

            <CSS.TotalAmountBox>
              <h3 className='title'>총 결제금액</h3>
              <span className='price'>{totalAmount}원</span>
            </CSS.TotalAmountBox>
            <CSS.ButtonList>
              <CSS.Buy_Button
                type='button'
                onClick={() => alert("결제창은 개발중입니다.")}
                $mode={mode}
              >
                구매하기
              </CSS.Buy_Button>
              <CSS.Bucket_Button type='button' onClick={cartUpdate}>
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
