import styled from "styled-components";

const Search: any = {};

Search.Container = styled.form<{ $responsiveActive: boolean }>`
  position: relative;
  width: 40rem;
  height: max-content;

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    width: 35rem;
  }

  @media screen and (max-width: 768px) {
    position: fixed;
    top: 5rem;
    left: 0;
    opacity: ${(props) => (props.$responsiveActive ? 1 : 0)};
    width: 100%;
    height: ${(props) => (props.$responsiveActive ? "3rem" : 0)};
    transition: all 0.2s ease-in-out;
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

Search.SearchInput = styled.div`
  position: relative;
  width: 100%;
  padding: 0 4rem 0 1rem;

  input {
    width: 100%;
    line-height: 1rem;
    font-size: 14px;
    font-family: "Noto Sans KR", sans-serif;
    padding: 10px;
    border: none;
    background-color: transparent;

    &:focus {
      outline: none;
    }
  }

  .search-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1rem;
    cursor: pointer;
    font-size: 20px;
  }

  @media screen and (max-width: 768px) {
    padding: 0;
    height: 100%;
    input {
      line-height: 3rem;
      padding: 0 4rem 0 10px;
      font-size: 12px;
      color: #fff;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    .search-button {
      right: 10px;
      font-size: 25px;
      color: #fff;
    }
  }
`;

export { Search };
