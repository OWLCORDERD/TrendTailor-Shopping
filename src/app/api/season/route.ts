import mysql2 from "mysql2/promise";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (req.method === "GET") {
    const connection = await mysql2.createConnection({
      host: process.env.MYSQL_HOST,
      user: "root",
      database: "wish",
      password: process.env.MYSQL_PASSWORD,
    });

    try {
      const query = "SELECT * FROM season";
      const [data] = await connection.execute(query);

      return NextResponse.json({ data: data });
    } catch (err) {
      return NextResponse.json({ err: err });
    }
  }
}
