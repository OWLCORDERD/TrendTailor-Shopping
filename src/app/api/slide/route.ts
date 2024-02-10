import { slideType } from "component/Main/Peed/Peed";
import { db } from "component/fetchDB/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    const querySnapShot = await getDocs(collection(db, "slide"));

    if (querySnapShot.empty) {
      return NextResponse.json({ data: [], status: 400 });
    }

    const slideData: slideType[] = [];

    querySnapShot.forEach((doc) => {
      const docData = {
        id: doc.data()["id"],
        image: doc.data()["image"],
        title: doc.data()["title"],
        info: doc.data()["info"],
      };

      slideData.push(docData);
    });

    return NextResponse.json({ data: slideData, status: 200 });
  }
}
