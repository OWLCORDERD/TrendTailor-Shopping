import Navbar from "component/Main/Navbar";
import Peed from "component/Main/Peed/Peed";
import Footer from "component/Main/Footer";
import "./page.module.css";

export default async function Home() {
  return (
    <>
      <Navbar />
      <main className='container'>
        <Peed />
      </main>
      <Footer />
    </>
  );
}
