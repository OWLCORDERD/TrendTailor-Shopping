import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { addDoc, collection } from "firebase/firestore";
import { db } from "component/fetchDB/firebase";

export async function POST(req: Request) {
  const body = await req.json();

  const email = body.email;
  const username = body.username;
  const password = body.password;

  try {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashPw = await bcrypt.hash(password, salt);

      const userData = {
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
