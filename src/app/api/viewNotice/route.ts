import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: "root",
      password: process.env.MYSQL_PASSWORD,
      database: "wish",
    });

    try {
      const SQLquery = "select * from notice";
      const [data] = await connection.execute(SQLquery);

      return NextResponse.json({ data: data, success: true });
    } catch (err) {
      return NextResponse.json({ err: err });
    }
  }
}
