import React, { useState, SetStateAction } from "react";
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
        />
      </CSS.SearchInput>
    </CSS.Container>
  );
};

export default Search;
