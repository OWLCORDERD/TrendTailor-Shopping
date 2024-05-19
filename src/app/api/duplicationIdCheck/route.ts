import { db } from "component/fetchDB/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

interface usernameType {
  username: string;
}

export async function GET(req: NextRequest) {
  const currentUserName = req.nextUrl.searchParams.get("userName");

  let duplicateState: boolean = false;

  const users = await getDocs(collection(db, "user"));

  const userNameArray: usernameType[] = [];

  users.forEach((doc) => {
    const data = {
      username: doc.data()["username"],
    };

    userNameArray.push(data);
  });

  const duplicateCheck = userNameArray.find(
    (user) => user.username === currentUserName
  );

  if (duplicateCheck) {
    duplicateState = true;
    return NextResponse.json({ duplicate: duplicateState });
  } else {
    return NextResponse.json({ duplicate: duplicateState });
  }
}
