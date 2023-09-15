import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET(req: NextRequest) {
  const selectLimit = req.nextUrl.searchParams.get("selectLimit");
  const selectAll = req.nextUrl.searchParams.get("selectAll");

  let limitConnection = null;
  let selectConnection = null;

  if (selectLimit) {
    if (limitConnection === null) {
      limitConnection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: "root",
        password: process.env.MYSQL_PASSWORD,
        database: "wish",
      });
    }

    try {
      const SQLquery = "select * from notice limit 5";
      const [data] = await limitConnection.execute(SQLquery);

      return NextResponse.json({ data: data, success: true });
    } catch (err) {
      return NextResponse.json({ err: err });
    }
  }

  if (selectAll) {
    if (selectConnection === null) {
      selectConnection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: "root",
        password: process.env.MYSQL_PASSWORD,
        database: "wish",
      });
    }

    try {
      const SQLquery = "select * from notice";
      const [data] = await selectConnection.execute(SQLquery);

      return NextResponse.json({ data: data, success: true });
    } catch (err) {
      return NextResponse.json({ err: err });
    }
  }
}
