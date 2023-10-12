"use client";

import Navbar from "component/Main/Navbar";
import Peed from "component/Main/Peed/Peed";
import "./page.module.css";
import Footer from "component/Main/Footer";
import AuthSession from "../component/AuthSession";

export default function Home() {
  return (
    <AuthSession>
      <Navbar />
      <main className='container'>
        <Peed />
      </main>
      <Footer />
    </AuthSession>
  );
}
