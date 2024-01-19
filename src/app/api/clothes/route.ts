import { NextResponse, NextRequest } from "next/server";
import mysql2 from "mysql2/promise";

export async function GET(req: Request) {
  let connection = null;

  if (req.method === "GET") {
    if (connection === null) {
      connection = await mysql2.createConnection({
        host: process.env.MYSQL_HOST,
        user: "Owlcoderd",
        database: "wish",
        port: 3306,
        password: process.env.MYSQL_PASSWORD,
      });
    }

    try {
      const query = "SELECT * FROM clothes";

      const [data] = await connection.execute(query);

      return NextResponse.json({ data: data });
    } catch (err) {
      return NextResponse.json({ err: err });
    }
  }
}
