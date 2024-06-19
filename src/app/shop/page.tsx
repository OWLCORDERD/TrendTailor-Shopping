import ProductList from "component/Product/ProductList";
import React from "react";
import "styles/shop.scss";

export default function Shop() {
  return (
    <main className='shop-container'>
      <div className='wrap'>
        <ProductList />
      </div>
    </main>
  );
}
