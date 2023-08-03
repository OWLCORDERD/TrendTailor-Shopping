import React from "react";

interface pageProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  postMaxLength: number;
  DBlength: number;
  currentPage: number;
}

const Pagenation = ({
  setCurrentPage,
  postMaxLength,
  DBlength,
  currentPage,
}: pageProps) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(DBlength / postMaxLength); i++) {
    pageNumber.push(i);
  }
  return (
    <div className='pagenation-container'>
      <ul className='pagenation'>
        {pageNumber.map((number) => {
          return (
            <li key={number}>
              <a
                href='#'
                onClick={() => setCurrentPage(number)}
                className={currentPage === number ? "active" : ""}
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagenation;
