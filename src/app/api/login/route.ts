import mysql2 from "mysql2/promise";
import { NextResponse } from "next/server";

interface example {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  const body: example = await request.json();

  const usernames = body.username;

  const dbconnection = await mysql2.createConnection({
    host: process.env.MYSQL_HOST,
    user: "root",
    database: "wish",
    password: process.env.MYSQL_PASSWORD,
  });

  try {
    const query =
      "select username, email, password from User where username = ?";

    const values = [usernames];

    const [data] = await dbconnection.execute(query, values);

    return NextResponse.json({ data: data });
  } catch (err) {
    return NextResponse.json({ message: "error database" });
  }
}
