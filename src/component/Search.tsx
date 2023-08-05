import React from "react";
import "styles/search.scss";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  return (
    <div className='search-container'>
      <div className='search-input'>
        <AiOutlineSearch className='search-button' fontSize={25} />
        <input
          type='text'
          placeholder='찾으시는 의류를 검색해보세요 예) 청바지'
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
    </div>
  );
};

export default Search;
