import React from "react";
import "styles/shop.scss";
import SearchProductList from "component/Product/SearchProductList";

const page = () => {
  return (
    <main className='shop-container'>
      <div className='wrap'>
        <SearchProductList />
      </div>
    </main>
  );
};

export default page;
