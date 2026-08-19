import { db } from '@/shared/lib/firebase';
import ProductDetail from 'component/Product/ProductDetail';
import { collection, getDocs } from 'firebase/firestore';
import React from 'react';

const getCurrentProduct = async (productId: string) => {
  const ref = collection(db, 'clothes');

  const doc = await getDocs(ref);

  if (doc.empty) {
    return [];
  }

  const clothesData: trendClothes[] = [];

  doc.forEach(doc => {
    const data = doc.data();

    clothesData.push({
      ...data,
      updatedAt: data.updatedAt.toDate().toISOString(),
      createdAt: data.createdAt.toDate().toISOString(),
    } as trendClothes);
  });

  if (clothesData.length > 0) {
    return clothesData.find(clothes => clothes.productId === productId);
  } else {
    return undefined;
  }
};

const ProductPage = async ({ params }: any) => {
  const currentProductDB: any = await getCurrentProduct(params.productId);
  return (
    <section className="product-detail">
      <div className="wrap">
        <ProductDetail staticProduct={currentProductDB as trendClothes} />
      </div>
    </section>
  );
};

export default ProductPage;
