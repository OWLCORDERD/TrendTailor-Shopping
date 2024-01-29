import Navbar from "component/Main/Navbar";
import Peed from "component/Main/Peed/Peed";
import Footer from "component/Main/Footer";
import "./page.module.css";
import mysql2 from "mysql2/promise";

const noticeFetch = async () => {
  let connection = null;

  if (connection === null) {
    connection = await mysql2.createConnection({
      host: process.env.MYSQL_HOST,
      user: "Owlcoderd",
      password: process.env.MYSQL_PASSWORD,
      database: "wish",
      port: 3306,
    });
  }

  try {
    const query = "select * from notice ORDER BY date DESC LIMIT 5";

    const [data] = await connection.execute(query);

    return data;
  } catch (err) {
    console.log(err);
  }
};

export default async function Home() {
  const noticeDB: any = await noticeFetch();

  return (
    <>
      <Navbar />
      <main className='container'>
        <Peed noticeDB={noticeDB} />
      </main>
      <Footer />
    </>
  );
}
