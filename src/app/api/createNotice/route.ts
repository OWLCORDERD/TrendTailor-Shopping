import { db } from "component/fetchDB/firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { NextResponse } from "next/server";

interface noticeBodyType {
  title: string;
  text: string;
  img_url?: string;
}

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body: noticeBodyType = await req.json();

    const title = body.title;
    const text = body.text;
    const img_url = body?.img_url;

    if (img_url) {
      const date = Timestamp.fromDate(new Date());

      await addDoc(collection(db, "notice"), {
        title: title,
        text: text,
        view_cnt: 0,
        image: img_url,
        date: date,
      });

      return NextResponse.json({
        status: 200,
        message: "success add Document firebase",
      });
    } else {
      const date = Timestamp.fromDate(new Date());

      await addDoc(collection(db, "notice"), {
        title: title,
        text: text,
        view_cnt: 0,
        date: date,
      });

      return NextResponse.json({
        status: 200,
        message: "success add Document firebase",
      });
    }
  }
}
