"use client";

import Footer from "component/Main/Footer";
import Navbar from "component/Main/Navbar";
import React from "react";
import "styles/notice.scss";

const noticeBoard = ({ params }: any) => {
  console.log(params.idx);
  return (
    <div className='wrap'>
      <Navbar />
      <Footer />
    </div>
  );
};

export default noticeBoard;
