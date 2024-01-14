import Image from "next/image";
import HeaderImage from "@/app/assets/header.png";
import Link from "next/link";
import "./header.css";

const Header = () => {
  return (
    <div className="flex flex-col">
        <div className="bg-gradient-to-r from-[#001732] to-[#001A34] flex flex-row space-x-[4rem] px-[7rem] py-[3rem] justify-between items-center header-container">
            <div className="flex flex-col">
                <p className="gradient-text text-[3.5rem] font-extrabold header-title">
                    Expense Tracker
                </p>
                <p className="text-[#448DD2] text-[2rem] mt-[1rem] header-desc">
                    Everything you need to track your expenses.
                </p>
                <p className="text-[#FF0071] text-[2rem] mt-[2rem] header-btn-title">
                    Let's Get Started
                </p>
                <Link href={"/signup"}>
                    <button className="bg-[#17BDB7] mt-[1.5rem] px-[1rem] py-[0.5rem] w-[15rem] text-[1.2rem] rounded-md shadow-lg button-shadow header-btn">Get Started -></button>
                </Link>
            </div>
            <div>
                <Image src={HeaderImage} alt={"header image"} className="w-[35rem] header-img"/>
            </div>
        </div>
        <div className="flex flex-col space-y-[2%] py-[5%] px-[5%] ask-cont">
            <p className="text-[#001732] text-[3rem] font-bold ask-title">What is Expense Tracker?</p>
            <div className="background-ask text-white p-[2rem] w-[80%] rounded-[1.5rem] ask-desc-cont">
                <p className="text-[2rem] font-bold ask-desc-cont-title">Empower your financial journey with precision !</p>
                <p className="mt-[1rem] text-[1.2rem] ask-desc-cont-desc">
                    Expense tracker simplifies financial management by recording, categorizing, and analyzing expenditures, providing insights for better budgeting and informed decision-making.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Header