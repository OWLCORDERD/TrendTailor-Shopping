import { NextResponse } from "next/server";
import mysql2 from "mysql2/promise";

interface paramsType {
  count: number;
}

interface reqType {
  currentIdx: number;
}

export async function POST(req: Request, { params }: any) {
  const { count }: paramsType = params;

  const body: reqType = await req.json();

  const currentIndex = body.currentIdx;

  let connection = null;

  if (connection === null) {
    connection = await mysql2.createConnection({
      host: process.env.MYSQL_HOST,
      password: process.env.MYSQL_PASSWORD,
      database: "wish",
      user: "root",
    });

    if (count && currentIndex) {
      try {
        const sqlQuery = "update notice set view_cnt = ? where idx = ?";
        const values = [count, currentIndex];
        const [data] = await connection.execute(sqlQuery, values);

        return NextResponse.json({
          message: `${data} : success update count`,
          success: true,
        });
      } catch (err) {
        return NextResponse.json({ err: err });
      }
    }
  }
}
