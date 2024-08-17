import { db } from "component/fetchDB/firebase";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

interface userType {
  id: string;
  email: string;
  password: string;
  username: string;
  image: string;
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const email: string | undefined = body ? body.email : undefined;

  if (email !== undefined) {
    try {
      const docRef = collection(db, "user");
      const q = query(docRef, where("email", "==", email));

      const querySnapShot = await getDocs(q);

      if (querySnapShot.empty) {
        return null;
      }

      const user: userType[] = [];

      querySnapShot.forEach((doc) => {
        const userDoc = {
          id: doc.id,
          email: doc.data()["email"],
          password: doc.data()["password"],
          username: doc.data()["username"],
          image: doc.data()["image"],
        };

        user.push(userDoc);
      });

      return NextResponse.json(user);
    } catch (err) {
      return NextResponse.json(err);
    }
  }
}
