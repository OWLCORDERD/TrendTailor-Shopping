import { NextResponse } from "next/server";

interface example {
  count: number;
}

export async function POST({ params }: any, req: Request) {
  console.log(params);
}
