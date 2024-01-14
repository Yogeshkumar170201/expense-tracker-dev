import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/components/navbar/Navbar";
import Header from "@/app/components/header/Header";
import Service from "@/app/components/services/Service";

export default function Home() {
  return (
    <div className="w-[100%] flex flex-col">
        <Navbar/>
        <Header/>
        <Service/>
        <Footer/>
    </div>
  )
}
