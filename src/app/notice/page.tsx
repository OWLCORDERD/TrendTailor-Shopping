import Footer from "component/Main/Footer";
import Navbar from "component/Main/Navbar";
import Pagenation from "component/Notice/Pagenation";
import React from "react";
import "styles/notice.scss";

export async function fetchData() {
  const res = await fetch("http://localhost:3000/api/viewNotice");

  const { data } = await res.json();

  return data;
}

interface dataType {
  idx: number;
  title: string;
  writer: string;
  image: string;
  date: string;
  text: string;
}

const page = async () => {
  const data: dataType[] = await fetchData();

  console.log(data);

  return (
    <div className='wrap'>
      <Navbar />

      <section className='NoticePage-container'>
        <div className='Notice-header'>
          <div className='Notice-title'>
            <h1>공지사항</h1>
          </div>

          <div className='AddNotice-button'>
            <a href='/addNotice'>공지사항 작성</a>
          </div>
        </div>
        <div className='Notice-table'>
          <table>
            <thead>
              <tr>
                <th>
                  <h1>번호</h1>
                </th>
                <th>
                  <h1>제목</h1>
                </th>
                <th>
                  <h1>글쓴이</h1>
                </th>
                <th>
                  <h1>조회수</h1>
                </th>
                <th>
                  <h1>날짜</h1>
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item.idx}>
                    <td>{item.idx}</td>
                    <td>
                      <a href='#'>{item.title}</a>
                    </td>
                    <td>{item.writer}</td>
                    <td>123</td>
                    <td>{item.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Pagenation />
      </section>

      <Footer />
    </div>
  );
};

export default page;
