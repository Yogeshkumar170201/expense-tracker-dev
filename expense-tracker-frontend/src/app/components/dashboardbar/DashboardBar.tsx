"use client";
import Image from 'next/image'
import Logo from "@/app/assets/logo.png";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import "./dashboardbar.css";

const DashboardBar = () => {

    const [isOpen, setIsOpened] = useState(false);
    const router  = useRouter();
    const logout = async()=>{
        const cookies = document.cookie.split('=')
        const token = cookies.at(1);
    
        const pastDate = new Date(0); // Create a date in the past
        document.cookie = 'token=; expires=' + pastDate.toUTCString() + '; path=/';
        router.push('/signin');

        // console.log(token);
        const res = await axios.post('http://localhost:8082/auth/logout', {
            headers:{
                "Authorization": "Bearer "+token
            }
        });
        // console.log(res)
    }

  return (
    <div className={`${isOpen?'open-btn':null} sticky top-0`}>
      <div className={`flex flex-row item-center justify-between py-[1%] px-[2%] bg-[#001732] sticky top-0 w-[100%]`}>
        <div className='flex flex-row items-center space-x-[2rem] logo_main'>
          <Link href={'/dashboard'}><Image src={Logo} alt={'Expense Tracker'} className='w-[3rem] cursor-pointer logo_img'/></Link>
          <Link href={'/dashboard'}><p className='text-white text-[2rem] cursor-pointer'>Expense Tracker</p></Link>
        </div>
        <div className={`flex flex-row items-center text-white text-[1.5rem] space-x-[1.5rem]`}>
          <div>
              <button onClick={()=>{setIsOpened(!isOpen)}} className='toggle-btn' >
              <span className='text-[2rem]'>&#9776;</span>
            </button>
          </div>
          <div className={`flex flex-row items-center text-white text-[1.5rem] space-x-[1.5rem] menu `}>
            <Link href={'/dashboard'}><p className='hover:text-[#448DD2] cursor-pointer'>Dashboard</p></Link>
            <Link href={'/incomes'}><p className='hover:text-[#448DD2] cursor-pointer'>Incomes</p></Link>
            <Link href={'/expenses'}><p className='hover:text-[#448DD2] cursor-pointer'>Expenses</p></Link>
            <Link href={'/transactions'}><p className='hover:text-[#448DD2] cursor-pointer'>Transactions</p></Link>
            <p className='bg-[#e89a33] py-[0.5rem] px-[1rem] rounded-sm cursor-pointer' onClick={logout}>Logout</p>

          </div>
        </div>
      </div>
      {isOpen&&
        <div className={`flex flex-col items-end text-white text-[0.8rem] bg-[#001732] p-[1rem] space-y-[1rem]`}>
            <Link href={'/dashboard'}><p className='hover:text-[#448DD2] cursor-pointer'>Dashboard</p></Link>
            <Link href={'/incomes'}><p className='hover:text-[#448DD2] cursor-pointer'>Incomes</p></Link>
            <Link href={'/expenses'}><p className='hover:text-[#448DD2] cursor-pointer'>Expenses</p></Link>
            <Link href={'/transactions'}><p className='hover:text-[#448DD2] cursor-pointer'>Transactions</p></Link>
            <p className='bg-[#e89a33] py-[0.5rem] px-[1rem] rounded-sm cursor-pointer sign-in-btn' onClick={logout}>Logout</p>
        </div>
      }
    </div>
  )
}

export default DashboardBar