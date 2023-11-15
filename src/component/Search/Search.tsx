import React, { useState } from "react";
import "styles/search.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearchKeyword(e.target.value);
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
      </form>
    </>
  );
};

export default Search;
