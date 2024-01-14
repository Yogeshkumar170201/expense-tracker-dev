import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";
import Logo from "@/app/assets/logo.png";
import Link from "next/link";

import "./footer.css";

const Footer = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center space-x-[5rem] bg-[#001732] p-[5rem] footer-container">
        <div className="flex flex-col w-[33%] footer-social">
          <p className="text-white text-[2rem]">About Us</p>
          <p className="text-[#8898A6] mt-[2rem]">Expense trackers offer streamlined financial management, including real-time expense recording, categorization, 
            budget tracking, and insightful analytics for informed financial decision-making.
          </p>
          <p className="text-white text-[2rem] mt-[3rem]">Social Links</p>
          <div className="flex flex-row space-x-[1rem] items-center mt-[2rem">
            <Link href={"https://www.instagram.com/yogeshk_02/"}>
              <div className="flex flex-row space-x-[0.2rem] items-center border-[1px] py-[0.5rem] px-[0.8rem] border-[#888888] rounded-md text-[#888888] cursor-pointer hover:text-[#895bd4]">
                <FaInstagram/>
                <p>Instagram</p>
              </div>
            </Link>
            <Link href={"https://www.linkedin.com/in/theyogeshkumar01/"}>
              <div className="flex flex-row space-x-[0.2rem] items-center border-[1px] py-[0.5rem] px-[0.8rem] border-[#888888] rounded-md text-[#888888] cursor-pointer hover:text-[#895bd4]">
                <FaLinkedinIn/>
                <p>Linkedin</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="w-[34%] footer-img">
          <Image src={Logo} alt={"logo"} className="w-[25rem]"/>
        </div>
        <div className="w-[33%] footer-contact">
          <p className="text-white text-[2rem]" >Quick Contact</p>
          <p className="text-[#888888] mt-[3rem]">Phone:</p>
          <p className="text-[#888888]  mt-[1.5rem]">+91 9717584849</p>
          <p className="text-[#888888]  mt-[3rem]">Email:</p>
          <p className="text-[#888888]  mt-[1.5rem]">expensetracker277@gmail.com</p>
        </div>
      </div>
      <div className="bg-[#001D3D] p-[2rem] footer-copyright">
        <p className="text-white text-center">© All Rights Reserved by Expense Tracker</p>
      </div>
    </div>
  )
}

export default Footer