import { styled } from "styled-components";

const ProductDetail: any = {};

ProductDetail.Detail_container = styled.div`
  width: 100%;
  height: 100%;
  padding: 6.25rem;
`;

ProductDetail.Detail_inner = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 5rem;
`;

ProductDetail.Product_imgBox = styled.div`
  position: relative;
  width: 25rem;
  height: 35rem;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

ProductDetail.Detail_menuBox = styled.div`
  width: 50rem;
  height: 50rem;
  font-family: "Noto Sans KR", sans-serif;
`;

ProductDetail.ProductName = styled.div`
  width: 100%;
  height: 6.25rem;

  h1 {
    font-size: 1.1rem;
  }
`;

ProductDetail.ProductMall = styled.div`
  width: 100%;
  height: 3.125rem;
  margin-bottom: 3rem;

  h2 {
    font-size: 14px;
    font-weight: bold;
  }
`;

ProductDetail.ProductPrice = styled.div`
  width: 100%;
  height: 6.25rem;

  h3 {
    font-size: 1.1rem;
    font-weight: bold;
  }
`;

ProductDetail.SelectSizeBox = styled.select`
  width: 50rem;
  height: 3rem;
  padding: 0 1rem;
  border: 1px solid #b5b5b5;
  font-size: 13px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: bold;

  option {
    width: 100%;
    line-height: 3rem;
    color: #b5b5b5;
  }
`;

ProductDetail.SelectProduct = styled.ul`
  width: 50rem;
  padding: 1rem 0;
  margin-bottom: 2rem;
`;

ProductDetail.SelectProductList = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 3.125rem;
  padding: 0 3rem;
  font-family: "Noto Sans KR", sans-serif;
`;

ProductDetail.SelectProductName = styled.div`
  width: 15rem;
  height: 100%;

  h4 {
    font-size: 14px;
    line-height: 3.125rem;
  }
`;

ProductDetail.SelectCount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 11rem;
  height: 100%;
`;

ProductDetail.CountPlus = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.125rem;
  height: 2rem;
  border: none;
  background-color: #000;
  color: #fff;

  svg {
    font-size: 1rem;
  }
`;

ProductDetail.CountMinus = styled.button<{ $count: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.125rem;
  height: 2rem;
  border: none;
  background-color: ${(props) => (props.$count === true ? "#a5a5a5" : "#000")};
  color: #fff;
  pointer-events: ${(props) => (props.$count === true ? "none" : "auto")};

  svg {
    font-size: 1rem;
  }
`;

ProductDetail.CountState = styled.div`
  width: 4rem;
  height: 100%;
  text-align: center;

  span {
    line-height: 3.125rem;
    font-size: 13px;
  }
`;

ProductDetail.SelectPrice = styled.div`
  width: 15rem;
  height: 100%;
  text-align: end;

  span {
    font-size: 14px;
    line-height: 3.125rem;
  }
`;

ProductDetail.ButtonList = styled.div`
  display: inline-flex;
  width: 100%;
  height: 3.5rem;
`;

ProductDetail.Buy_Button = styled.button`
  width: 15rem;
  height: 3.5rem;
  margin-right: 2rem;
  background-color: #000;
  color: #fff;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;

ProductDetail.Bucket_Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 3.5rem;
  margin-right: 2rem;
  background-color: transparent;
  color: #a5a5a5;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 1rem;
  border: 2px solid #a5a5a5;
  cursor: pointer;
`;

ProductDetail.Like_Button = styled.button`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 3.5rem;
  background-color: transparent;
  color: #a5a5a5;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 1rem;
  border: 2px solid #a5a5a5;
  cursor: pointer;

  span {
    margin-top: 12px;
    font-size: 12px;
  }
`;

ProductDetail.TotalAmountBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50rem;
  height: 3.125rem;
  margin-bottom: 2rem;
  font-family: "Noto Sans KR", sans-serif;

  .title {
    width: 20rem;
    font-size: 1rem;
    font-weight: bold;
  }

  .price {
    text-align: end;
    width: 20rem;
    font-size: 1rem;
    font-weight: bold;
  }
`;

export { ProductDetail };
