import React from "react";
import NoticeBoard from "./NoticeBoard";
import "styles/mainBoard.scss";
import Banner from "./Banner";
import { slideType } from "app/page";
import mysql2 from "mysql2/promise";
import { NoticeType } from "app/notice/page";

const noticeFetch = async () => {
  let connection = null;

  if (connection === null) {
    connection = await mysql2.createConnection({
      host: process.env.MYSQL_HOST,
      port: 3306,
      user: "Owlcoderd",
      password: process.env.MYSQL_PASSWORD,
      database: "wish",
    });
  }

  try {
    const query = "select * from notice limit 5";
    const [data] = await connection.execute(query);

    return data;
  } catch (err) {
    console.log(err);
  }
};

export interface slidePropsType {
  slideDB: slideType[];
}

const MainBoard: any = async ({ slideDB }: slidePropsType) => {
  const noticeDB = await noticeFetch();

  return (
    <div className='MainPage-Board'>
      <Banner slideDB={slideDB} />
      <NoticeBoard noticeDB={noticeDB} />
    </div>
  );
};

export default MainBoard;
