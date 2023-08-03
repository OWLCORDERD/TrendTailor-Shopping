import NewsSlider from "component/Main/Peed/NewsSlider";
import ProductList from "component/Product/ProductList";
import React from "react";
import "styles/shop.scss";

export default function page() {
  return (
    <div className='shop-container'>
      <div className='wrap'>
        <NewsSlider />

        <ProductList />
      </div>
    </div>
  );
}
