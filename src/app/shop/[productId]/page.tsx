import { db } from "@/shared/lib/firebase";
import ProductDetail from "component/Product/ProductDetail";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

const getCurrentProduct = async (productId: string) => {
  const ref = collection(db, "clothes");

  const doc = await getDocs(ref);

  if (doc.empty) {
    return [];
  }

  const clothesData: clothes[] = [];

  doc.forEach((doc) => {
    const data = doc.data();

    clothesData.push({
      doc_id: doc.id,
      title: data.title,
      image: data.image,
      link: data.link,
      lprice: data.lprice,
      hprice: data.hprice,
      mallName: data.mallName,
      productId: data.productId,
      productType: data.productType,
      brand: data.brand,
      maker: data.maker,
      category1: data.category1,
      category2: data.category2,
      category3: data.category3,
      category4: data.category4,
      viewCount: data.viewCount,
      likeCount: data.likeCount,
      collectedAt: data.collectedAt,
      searchStyle: data.searchStyle,
      searchCategory: data.searchCategory,
    })
  })

  if (clothesData.length > 0) {
    return clothesData.find((clothes) => clothes.productId === productId);
  } else {
    return undefined;
  }
}

const ProductPage = async ({ params }: any) => {

  console.log(params);

  return (
    <div className='wrap'>
      {/* <ProductDetail staticProduct={currentProductDB} /> */}
    </div>
  );
};

export default ProductPage;
