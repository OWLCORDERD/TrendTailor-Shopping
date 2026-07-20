import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";

interface bodyTypes {
  id: string;
  email: string;
  username: string;
  password: string;
  image: string;
}

export async function POST(req: Request) {
  const body: bodyTypes = await req.json();

  const id = body.id;
  const email = body.email;
  const username = body.username;
  const password = body.password;
  const uploadImageUrl = body.image;

  try {
    if (uploadImageUrl) {
      const salt = await bcrypt.genSalt(10);
      const hashPw = await bcrypt.hash(password, salt);

      const userData = {
        id: id,
        email: email,
        username: username,
        password: hashPw,
        image: uploadImageUrl,
      };

      await addDoc(collection(db, "user"), userData);

      return NextResponse.json({ status: 200 });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPw = await bcrypt.hash(password, salt);

      const userData = {
        id: id,
        email: email,
        username: username,
        password: hashPw,
      };

      await addDoc(collection(db, "user"), userData);

      return NextResponse.json({ status: 200 });
    }
  } catch (err) {
    return NextResponse.json({ err: err });
  }
}
