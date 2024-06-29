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
    display: none;
  }
`;

Search.SearchInput = styled.div<{ $mode: string }>`
  position: relative;
  width: 100%;
  padding: 0 4rem 0 1rem;
  border: ${(props) =>
    props.$mode === "light" ? "2px solid #5d5d5d" : "2px solid #fff"};

  input {
    width: 100%;
    line-height: 1rem;
    font-size: 12px;
    font-family: "TheJamsil", sans-serif;
    padding: 10px;
    border: none;
    background-color: transparent;
    font-weight: 400;

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
    border: none;
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
