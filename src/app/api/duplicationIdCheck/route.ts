import { db } from "component/fetchDB/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

interface usernameType {
  username: string;
}

export async function GET(req: NextRequest) {
  const currentUserId = req.nextUrl.searchParams.get("userId");

  let duplicateState: boolean = false;

  const users = await getDocs(collection(db, "user"));

  const userNameArray: usernameType[] = [];

  users.forEach((doc) => {
    const data = {
      username: doc.data()["id"],
    };

    userNameArray.push(data);
  });

  const duplicateCheck = userNameArray.find(
    (user) => user.username === currentUserId
  );

  if (duplicateCheck) {
    duplicateState = true;
    return NextResponse.json({ duplicate: duplicateState });
  } else {
    return NextResponse.json({ duplicate: duplicateState });
  }
}
