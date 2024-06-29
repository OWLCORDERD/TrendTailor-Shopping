import { styled } from "styled-components";

const ProductDetail: any = {};

ProductDetail.Detail_container = styled.div`
  width: 100%;
  height: 100%;
  padding: 6.25rem;

  @media screen and (max-width: 768px) {
    padding: 0 0 3rem 0;
  }
`;

ProductDetail.Detail_inner = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 5rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 0;
  }
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

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 30rem;
  }
`;

ProductDetail.Detail_menuBox = styled.div`
  width: 50%;
  height: 100%;
  font-family: "TheJamsil", sans-serif;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

ProductDetail.ProductName = styled.div`
  width: 100%;
  height: 5rem;
  border-bottom: 1px solid #a5a5a5;

  h1 {
    font-size: 1.1rem;
    font-weight: 700;
  }

  @media screen and (max-width: 1440px) {
    h1 {
      font-size: 15px;
    }
  }

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    height: 5rem;
    padding: 0 1rem;

    h1 {
      width: 80%;
      font-size: 14px;
      word-break: keep-all;
    }
  }
`;

ProductDetail.DetailInfo = styled.table`
  width: 100%;
  height: 12rem;
  border: 0;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 1rem 0;
  font-family: "TheJamsil", sans-serif;

  caption {
    display: none;
  }
`;

ProductDetail.ProductBrand = styled.tr`
  width: 100%;
  height: 4rem;

  th {
    width: 10rem;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    padding: 10px;
  }

  td {
    font-size: 14px;
    padding: 10px 10px 10px 0;
    font-weight: 400;
  }

  @media screen and (max-width: 768px) {
    th {
      font-size: 12px;
    }

    td {
      font-size: 12px;
    }
  }
`;

ProductDetail.ProductPrice = styled.tr`
  width: 100%;
  height: 4rem;

  th {
    width: 10rem;
    font-size: 14px;
    text-align: left;
    padding: 10px;
    font-weight: 500;
  }

  td {
    font-size: 14px;
    padding: 10px 10px 10px 0;
    font-weight: 400;
  }

  @media screen and (max-width: 768px) {
    th {
      font-size: 12px;
    }

    td {
      font-size: 12px;
    }
  }
`;

ProductDetail.ProductSize = styled.tr`
  width: 100%;
  height: 4rem;
  font-family: "TheJamsil", sans-serif;

  th {
    width: 10rem;
    font-size: 14px;
    text-align: left;
    padding: 10px;
    font-weight: 500;
  }

  @media screen and (max-width: 768px) {
    th {
      font-size: 12px;
    }
  }
`;

ProductDetail.SizeSelect = styled.select`
  width: 100%;
  height: 2.5rem;
  padding: 0 1rem;
  border: 1px solid #b5b5b5;
  font-size: 14px;
  font-family: "TheJamsil", sans-serif;
  font-weight: 400;

  option {
    width: 100%;
    line-height: 3rem;
    color: #a5a5a5;
  }

  @media screen and (max-width: 768px) {
    width: 80%;
    font-size: 12px;
  }
`;

ProductDetail.SelectProduct = styled.ul`
  width: 100%;
  padding: 1rem 0;
  margin-bottom: 2rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }
`;

ProductDetail.SelectProductList = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 3.125rem;
  padding: 0 3rem;
  font-family: "TheJamsil", sans-serif;

  @media screen and (max-width: 1440px) {
    padding: 0 1rem;
  }

  @media screen and (max-width: 768px) {
    padding: 0 2rem 0 0;
  }
`;

ProductDetail.SelectProductName = styled.div`
  width: 15rem;
  height: 100%;

  h2 {
    font-size: 14px;
    line-height: 3.125rem;
    font-weight: 700;
  }

  @media screen and (max-width: 768px) {
    width: 10rem;
  }
`;

ProductDetail.SelectCount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 11rem;
  height: 100%;

  @media screen and (max-width: 768px) {
    width: 8rem;
  }
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
  cursor: pointer;

  svg {
    font-size: 1rem;
  }

  @media screen and (max-width: 768px) {
    width: 2rem;
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
  cursor: pointer;

  svg {
    font-size: 1rem;
  }

  @media screen and (max-width: 768px) {
    width: 2rem;
  }
`;

ProductDetail.CountState = styled.div`
  width: 4rem;
  height: 100%;
  text-align: center;

  span {
    line-height: 3.125rem;
    font-weight: 500;
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
    font-weight: 400;
  }

  @media screen and (max-width: 768px) {
    width: 15rem;
  }
`;

ProductDetail.ButtonList = styled.div`
  display: inline-flex;
  width: 100%;
  height: 3.5rem;

  @media screen and (max-width: 768px) {
    padding: 0 1rem;
  }
`;

ProductDetail.Buy_Button = styled.button<{ $mode: string }>`
  width: 15rem;
  height: 3.5rem;
  margin-right: 2rem;
  background-color: ${(props) =>
    props.$mode === "light" ? "#000" : "rgba(154,154,154,0.2)"};
  color: #fff;
  font-family: "TheJamsil", sans-serif;
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
  font-family: "TheJamsil", sans-serif;

  .title {
    width: 20rem;
    font-size: 1rem;
    font-weight: 700;
  }

  .price {
    text-align: end;
    width: 20rem;
    font-size: 1rem;
    font-weight: 500;
  }

  @media screen and (max-width: 1440px) {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;

    .title {
      font-size: 13px;
    }

    .price {
      font-size: 13px;
    }
  }
`;

ProductDetail.DeleteSize = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  svg {
    font-size: 1rem;
  }
`;

export { ProductDetail };
