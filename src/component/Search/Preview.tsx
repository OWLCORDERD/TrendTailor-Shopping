import React, { useState } from "react";
import "styles/preview.scss";
import Image from "next/image";
import { clothes } from "component/Product/ProductList";

interface keywordProps {
  keywordPreview: clothes[];
  searchKeyword: string;
  closePreview: boolean;
}

const Preview = ({
  keywordPreview,
  searchKeyword,
  closePreview,
}: keywordProps) => {
  return (
    <div
      className='Preview-container'
      id={searchKeyword.length > 0 && closePreview === false ? "active" : ""}
    >
      {keywordPreview.length > 0 ? (
        <ul>
          {keywordPreview.map((item) => {
            return (
              <li key={item.productId}>
                <a href='#'>
                  <div className='Preview-item'>
                    <div className='Preview-Img'>
                      <img
                        src={item.image}
                        width={100}
                        height={100}
                        alt='샘플 이미지'
                      />
                    </div>

                    <div className='Preview-contentBox'>
                      <div className='item-title'>
                        <h2>{item.title}</h2>
                      </div>

                      <div className='item-info'>
                        <div className='mallName'>
                          <p>{item.mallName}</p>
                        </div>
                        <div className='category'>
                          <span>{item.category3}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className='nonSearch-keywordBox'>
          <div className='noneSearch-keyword'>
            <h2>{searchKeyword}</h2>
            <span>에 대한 검색결과가 없습니다.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;
