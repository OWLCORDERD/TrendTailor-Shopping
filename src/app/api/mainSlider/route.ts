import { NextRequest, NextResponse } from "next/server";
import mysql2 from "mysql2/promise";

export async function GET(req: NextRequest) {
  let connection = null;

  if (req.method === "GET") {
    if (connection === null) {
      connection = await mysql2.createConnection({
        host: process.env.MYSQL_HOST,
        user: "root",
        password: process.env.MYSQL_PASSWORD,
        database: "wish",
      });
    }

    try {
      const query = "select * from MainSlider";
      const [data] = await connection.execute(query);

      return NextResponse.json({ data: data, success: true });
    } catch (err) {
      return NextResponse.json({ err: err });
    }
  }
}
