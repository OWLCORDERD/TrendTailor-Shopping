import { NextRequest, NextResponse } from "next/server";
import mysql2 from "mysql2/promise";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams.get("getData");

  if (req.method === "GET" && params === "getData") {
    let connection = null;

    if (connection === null) {
      connection = await mysql2.createConnection({
        host: process.env.MYSQL_HOST,
        user: "Owlcoderd",
        password: process.env.MYSQL_PASSWORD,
        database: "wish",
        port: 3306,
      });

      try {
        const query = "select * from notice ORDER BY date DESC LIMIT 5";
        const [data] = await connection.execute(query);

        return NextResponse.json(data);
      } catch (err) {
        return NextResponse.json({ err: err });
      }
    }
  }
}
