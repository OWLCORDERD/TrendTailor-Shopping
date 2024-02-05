import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const body = await req.json();

  const email = body.email;
  const username = body.username;
  const password = body.password;

  try {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashPw = await bcrypt.hash(password, salt);

      const userData = {
        email: email,
        username: username,
        password: hashPw,
      };
      const res = await fetch("https://iuprofile.site/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        return NextResponse.json({ status: 200 });
      } else {
        return NextResponse.json(res.status);
      }
    }
  } catch (err) {
    return NextResponse.json({ err: err });
  }
}
