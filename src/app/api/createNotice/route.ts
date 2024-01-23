import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

interface example {
  title: string;
  text: string;
  imgRoute: string;
  writer: string;
  count: number;
  currentIndex: number;
}

export async function POST(req: Request) {
  let connection = null;

  if (req.method === "POST") {
    const body: example = await req.json();

    const title = body.title;
    const text = body.text;
    const imgSrc = body.imgRoute;
    const writer = body.writer;

    if (connection === null) {
      connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        password: process.env.MYSQL_PASSWORD,
        database: "wish",
        user: "Owlcoderd",
        port: 3306,
      });
    }

    try {
      const SqlQuery =
        "insert into notice(title, writer, image, text) values(?, ?, ?, ?)";
      const value = [title, writer, imgSrc, text];

      const [data] = await connection.execute(SqlQuery, value);

      return NextResponse.json({
        message: `${data} : success insert notice`,
        success: true,
      });
    } catch (err) {
      return NextResponse.json({ err: err });
    }
  }
}
