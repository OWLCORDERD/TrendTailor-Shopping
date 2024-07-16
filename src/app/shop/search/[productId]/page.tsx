"use client";

import ProductDetail from "component/Product/ProductDetail";
import React, { useEffect } from "react";
import { currentSearchProduct } from "store/searchClothes";
import { useAppDispatch } from "store/hooks";

const ProductPage = async ({ params }: any) => {
  const productId: string = params ? params.productId : undefined;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(currentSearchProduct(productId));
  }, []);

  return (
    <div className='wrap'>
      <ProductDetail staticProduct={undefined} />
    </div>
  );
};

export default ProductPage;
