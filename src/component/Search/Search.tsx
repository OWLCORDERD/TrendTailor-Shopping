import React, { useState, SetStateAction, useRef } from "react";
import { Search as CSS } from "styles";
import { useRouter } from "next/navigation";
import { IoIosClose, IoIosSearch } from "react-icons/io";

interface ResponsiveActiveProps {
  searchActive: boolean;
  setSearchActive: React.Dispatch<SetStateAction<boolean>>;
}

const Search = ({ searchActive, setSearchActive }: ResponsiveActiveProps) => {
  const router = useRouter();

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const searchRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearchKeyword(e.target.value);
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    if (searchRef.current && searchRef.current.value === "") {
      alert("키워드를 입력해주세요.");
    }
    if (searchKeyword !== "") {
      e.preventDefault();

      const encodedSearchKeyword = encodeURI(searchKeyword);

      router.push(`/shop/search?q=${encodedSearchKeyword}`);

      if (searchRef.current) {
        searchRef.current.value = "";
      }
    }
  };

  return (
    <CSS.Container
      $responsiveActive={searchActive}
      onSubmit={(e: any) => onSearch(e)}
    >
      <CSS.SearchInput>
        {searchActive === true ? (
          <IoIosClose
            className='search-button'
            onClick={() => setSearchActive(false)}
          />
        ) : (
          <IoIosSearch
            className='search-button'
            onClick={(e: any) => onSearch(e)}
          />
        )}
        <input
          type='text'
          placeholder='찾으시는 의류를 검색해보세요 예) 청바지'
          onChange={(e) => onChangeHandler(e)}
          ref={searchRef}
        />
      </CSS.SearchInput>
    </CSS.Container>
  );
};

export default Search;
