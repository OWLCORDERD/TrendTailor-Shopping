import styled from "styled-components";

const Search = {};

Search.Container =
  styled.form <
  { $searchActive: boolean } >
  `
  position: relative;
  width: 40rem;
  height: max-content;

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    width: 35rem;
  }

  @media screen and (max-width: 768px) {
    display: ${(props) => (props.$searchActive ? "block" : "none")};
    width: 80%;
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
  }

  @media screen and (max-width: 768px) {
    input {
      font-size: 10px;
    }

    .search-button {
      font-size: 20px;
    }
  }
`;

export { Search };
