"use client";

import ProductDetail from "component/Product/ProductDetail";
import React, { useEffect } from "react";
import { currentSearchProduct } from "store/searchClothes";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { styled } from "styled-components";
import { currentProduct } from "store/staticClothes";

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

  const searchStatus = useAppSelector((state) => {
    return state.searchDB.status;
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchStatus) {
      dispatch(currentSearchProduct(productId));
    } else {
      dispatch(currentProduct(productId));
    }
  }, [productId]);

  return (
    <Wrap>
      <ProductDetail />
    </Wrap>
  );
};

export default ProductPage;
