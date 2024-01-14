"use client";
import Image from 'next/image'
import Logo from "@/app/assets/logo.png";
import { useState } from 'react';
import "./navbar.css";
import Link from 'next/link';

const Navbar = () => {

  const [isOpen, setIsOpened] = useState(false);


  return (
    <div className={`${isOpen?'open-btn':null} sticky top-0`}>
      <div className={`flex flex-row item-center justify-between py-[1%] px-[2%] bg-[#001732] sticky top-0 w-[100%]`}>
        <div className='flex flex-row items-center space-x-[2rem] logo_main'>
          <Link href={'/'}><Image src={Logo} alt={'Expense Tracker'} className='w-[3rem] cursor-pointer logo_img'/></Link>
          <Link href={'/'}><p className='text-white text-[2rem] cursor-pointer'>Expense Tracker</p></Link>
        </div>
        <div className={`flex flex-row items-center text-white text-[1.5rem] space-x-[1.5rem]`}>
          <div>
              <button onClick={()=>{setIsOpened(!isOpen)}} className='toggle-btn' >
              <span className='text-[2rem]'>&#9776;</span>
            </button>
          </div>
          <div className={`flex flex-row items-center text-white text-[1.5rem] space-x-[1.5rem] menu `}>
            <Link href={'/'}><p className='hover:text-[#448DD2] cursor-pointer'>Home</p></Link>
            <Link href={'/signup'}><p className='hover:text-[#448DD2] cursor-pointer'>Sign up</p></Link>
            <Link href={'/signin'}><p className='bg-[#e89a33] py-[0.5rem] px-[1rem] rounded-sm cursor-pointer'>Sign in</p></Link>
          </div>
        </div>
      </div>
      {isOpen&&
        <div className={`flex flex-col items-end text-white text-[0.8rem] bg-[#001732] p-[1rem] space-y-[1rem]`}>
            <Link href={'/'}><p className='hover:text-[#448DD2] cursor-pointer'>Home</p></Link>
            <Link href={'/signup'}><p className='hover:text-[#448DD2] cursor-pointer'>Sign up</p></Link>
            <p className='bg-[#e89a33] py-[0.5rem] px-[1rem] rounded-sm cursor-pointer sign-in-btn'><Link href={'/signin'}>Sign in</Link></p>
        </div>
      }
    </div>
  )
}

export default Navbar