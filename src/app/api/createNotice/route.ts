import { writeFile } from "fs/promises";
import mysql from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  let connection = null;

  if (req.method === "POST") {
    const fromDataFlag = await req.formData();
    const file: File | null = fromDataFlag.get("file") as unknown as File;

    if (fromDataFlag) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const dbPath = `/images/${file.name}`;
      const savePath = `public/images/${file.name}`;

      await writeFile(savePath, buffer);

      const title = fromDataFlag.get("title");
      const text = fromDataFlag.get("text");
      const writer = fromDataFlag.get("writer");

      if (connection === null) {
        connection = await mysql.createConnection({
          host: process.env.MYSQL_HOST,
          password: process.env.MYSQL_PASSWORD,
          database: "wish",
          user: "root",
        });
      }

      try {
        const SqlQuery =
          "insert into notice(title, writer, image, text) values(?, ?, ?, ?)";
        const value = [title, writer, dbPath, text];

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
}
