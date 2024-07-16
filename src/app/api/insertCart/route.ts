import { db } from "component/fetchDB/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

interface cartClothes {
  title: string;
  image: string;
  lprice: string;
  hprice: string;
  mallName: string;
  productId: string;
  brand: string;
  maker: string;
}

export async function POST(req: Request) {
  const body = await req.json();

  const username = body.username;
  const currentProduct = body.product;
  let duplicated: boolean = false;

  const userDocRef = await getDoc(doc(db, "cart", username));

  let cartlist: cartClothes[] = userDocRef.data()?.cartlist;

  if (userDocRef.exists()) {
    cartlist.forEach((product) => {
      if (product.title === currentProduct.title) {
        duplicated = true;
      }
    });

    if (!duplicated) {
      cartlist.push(currentProduct);
      await updateDoc(doc(db, "cart", username), {
        cartlist: cartlist,
      });
    }
  } else {
    await setDoc(doc(db, "cart", username), {
      cartlist: [currentProduct],
    });
  }

  return NextResponse.json({
    duplicate: duplicated,
    status: 200,
  });
}
