import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET(req: NextRequest) {
  const selectLimit = req.nextUrl.searchParams.get("selectLimit");

  let connection = null;

  if (req.method === "GET") {
    if (connection === null) {
      connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: "Owlcoderd",
        password: process.env.MYSQL_PASSWORD,
        database: "wish",
      });
    }

    if (selectLimit) {
      try {
        const SQLquery = "select * from notice limit 5";
        const [data] = await connection.execute(SQLquery);

        return NextResponse.json({ data: data, success: true });
      } catch (err) {
        return NextResponse.json({ err: err });
      }
    }

    try {
      const SQLquery = "select * from notice";
      const [data] = await connection.execute(SQLquery);

      return NextResponse.json({ data: data, success: true });
    } catch (err) {
      return NextResponse.json({ err: err });
    }
  }
}
