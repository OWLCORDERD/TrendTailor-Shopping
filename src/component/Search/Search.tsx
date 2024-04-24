import React, { useState } from "react";
import { Search as CSS } from "styles";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface ResponsiveActiveProps {
  searchActive: boolean;
}

const Search = ({ searchActive }: ResponsiveActiveProps) => {
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
      <CSS.Container $searchActive={searchActive} onSubmit={(e) => onSearch(e)}>
        <CSS.SearchInput>
          <AiOutlineSearch className='search-button' />
          <input
            type='text'
            placeholder='찾으시는 의류를 검색해보세요 예) 청바지'
            onChange={(e) => onChangeHandler(e)}
          />
        </CSS.SearchInput>
      </CSS.Container>
    </>
  );
};

export default Search;
