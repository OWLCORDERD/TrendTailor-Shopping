"use client";

import ProductDetail from "component/Product/ProductDetail";
import React, { useEffect, useState } from "react";
import { currentProduct } from "store/asyncAction";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { styled } from "styled-components";

interface productIdType {
  productId: string | undefined;
}

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ProductPage = ({ params }: any) => {
  const productId: productIdType = params ? params.productId : undefined;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productId !== undefined) {
      dispatch(currentProduct(productId));
    }
  }, []);

  return (
    <Wrap>
      <ProductDetail />
    </Wrap>
  );
};

export default ProductPage;
