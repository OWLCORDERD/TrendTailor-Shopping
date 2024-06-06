"use client";

import ProductDetail from "component/Product/ProductDetail";
import React, { useEffect, useState } from "react";
import {
  currentProduct,
  currentSearchProduct,
  currentSeasonProduct,
} from "store/asyncAction";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { styled } from "styled-components";
import { useSearchParams } from "next/navigation";

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
  const query = useSearchParams();
  const searchDataExist = query.get("searchData");
  const seasonDataExist = query.get("seasonData");

  useEffect(() => {
    if (searchDataExist === "Search") {
      dispatch(currentSearchProduct(productId));
    } else if (seasonDataExist) {
      dispatch(currentSeasonProduct(productId));
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
