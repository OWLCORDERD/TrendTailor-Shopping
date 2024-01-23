import mysql from "mysql2/promise";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

interface RequestBody {
  username: string;
  password: string;
  email: string;
}

export async function POST(request: Request) {
  let connection = null;

  const body: RequestBody = await request.json();

  const username = body.username;
  const email = body.email;
  const password = await bcrypt.hash(body.password, 10);

  if (connection === null) {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: "Owlcoderd",
      password: process.env.MYSQL_PASSWORD,
      database: "wish",
    });
  }

  try {
    const query = "insert into User(username, password, email) values(?, ?, ?)";

    const values = [username, password, email];

    const [data] = await connection.execute(query, values);

    return NextResponse.json({ message: data });
  } catch (err) {
    return NextResponse.json({ message: "error" });
  }
}
