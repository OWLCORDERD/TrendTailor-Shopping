import { db } from "component/fetchDB/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const id = body.id;
  const count = body.count;

  if (id !== null && count !== null) {
    try {
      const docRef = doc(db, "notice", id);

      const updateViewCount = await updateDoc(docRef, {
        view_cnt: count,
      });

      return NextResponse.json({ message: updateViewCount, status: 200 });
    } catch (err) {
      return NextResponse.json({ status: 400, err: err });
    }
  }
}
