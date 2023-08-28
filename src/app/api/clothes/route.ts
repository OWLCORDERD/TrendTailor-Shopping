import { NextResponse, NextRequest } from "next/server";
import mysql2 from "mysql2/promise";

export async function GET(req: Request) {
  if (req.method === "GET") {
    const res = await mysql2.createConnection({
      host: process.env.MYSQL_HOST,
      user: "root",
      database: "wish",
      password: process.env.MYSQL_PASSWORD,
    });

    try {
      const query = "SELECT * FROM clothes";

      const [data] = await res.execute(query);

      return NextResponse.json({ data: data });
    } catch (err) {
      return NextResponse.json({ err: err });
    }
  }
}
