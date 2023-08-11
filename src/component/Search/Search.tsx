import React, { useState, useEffect } from "react";
import "styles/search.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Preview from "./Preview";
import { clothes } from "component/Product/ProductList";

const Search = () => {
  const router = useRouter();

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [keywordPreview, setKeywordPreview] = useState<clothes[]>([]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearchKeyword(e.target.value);

    if (searchKeyword !== undefined) {
      PreviewData(searchKeyword);
    }
  };

  const PreviewData = async (searchKeyword: string) => {
    const res = await fetch(`http://localhost:3001/items?q=${searchKeyword}`);

    const data = await res.json();

    setKeywordPreview(data);
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const encodedSearchKeyword = encodeURI(searchKeyword);

    router.push(`/shop?q=${encodedSearchKeyword}`);
  };

  return (
    <>
      <form className='search-container' onSubmit={(e) => onSearch(e)}>
        <div className='search-input'>
          <AiOutlineSearch className='search-button' fontSize={25} />
          <input
            type='text'
            placeholder='찾으시는 의류를 검색해보세요 예) 청바지'
            onChange={(e) => onChangeHandler(e)}
          />
        </div>

        <div className='search-keywords'>
          <div className='title'>
            <h2>Keyword</h2>
          </div>

          <ul className='keywords-list'>
            <li>
              <a href='#'>
                <span>슬랙스</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <span>코트</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <span>블라우스</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <span>셔츠</span>
              </a>
            </li>
          </ul>
        </div>

        <Preview
          keywordPreview={keywordPreview}
          searchKeyword={searchKeyword}
        />
      </form>
    </>
  );
};

export default Search;
