"use client";
import Navbar from '../components/navbar/Navbar'
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import "./page.css";

const Signin = () => {
  const [loginRequest, setLoginRequest] =  useState(
    {
      "email":"",
      "password":""
    }
  )

  const handleChange = (e: { target: { name: any; value: any; }; })=>{
    setLoginRequest({...loginRequest, [e.target.name]:e.target.value})
  }
  
  const router = useRouter();

  const loginUser = async ()=>{
  
    if(loginRequest===null || loginRequest.email === null || loginRequest.password === null || loginRequest.email === "" || loginRequest.password === ""){
      alert("Please fill all fields");
      setLoginRequest(
        {
            "email":"",
            "password":""
        }
      )
      return;
    }
    if(!loginRequest.email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")||
    !loginRequest.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+={}|'<>,.?/~:])[A-Za-z0-9!@#$%^&*()_+={}|'<>,.?/~:].{5,}$")){
      alert("Invalid Credentials");
      setLoginRequest(
        {
            "email":"",
            "password":""
        }
      )
      return;
    }
    try {
        const {data} = await axios.post("http://localhost:8082/auth/authenticate", loginRequest)
        const jwtToken = data['token']
        setLoginRequest(
            {
                "email":"",
                "password":""
            }
        )
        document.cookie = "token=" + jwtToken + "; path=/; max-age=3600; SameSite=Strict";
        router.push('/dashboard')
    } catch (error) {
        alert("Invalid Credentials")
        setLoginRequest(
            {
                "email":"",
                "password":""
            }
        )
    }
  }

  return (
    <div className='flex flex-col h-[100vh]'>
        <Navbar/>
        <div className='flex flex-row w-[100%] grow signin_main'>
          <div className='bg-[#001732] text-white w-[40%] flex flex-col px-[3rem] py-[15rem] signin_left'>
            <p className='text-[2rem] title_360px'>Application</p>
            <p className='text-[2rem] title_360px'>Signin Page</p>
            <p>Signin from here to access.</p>
          </div>
          <div className='flex flex-col bg-[#001D3D] text-black w-[60%] px-[3rem] py-[10rem] space-y-[1rem] signin_right'>
            <label className='font-bold text-white text-[1.2rem]'>Email Id</label>
            <input type='email' placeholder='Enter email' className='h-[2.5rem] w-[25rem] rounded-md p-[0.5rem] input_500px input_360px' value={loginRequest.email} name='email' onChange={handleChange}/>
            <label className='font-bold text-white text-[1.2rem]'>Password</label>
            <input type='password' placeholder='Enter password' className='h-[2.5rem] w-[25rem] rounded-md p-[0.5rem] input_500px input_360px' value={loginRequest.password} name='password' onChange={handleChange}/>
            <div className='flex flex-row items-center justify-between w-[25rem] pt-[2rem] input_500px input_360px button_500px'>
              <button className='bg-[#00F2BA] w-[10rem] h-[3rem] rounded-md font-bold text-white' onClick={loginUser}>Signin</button>
              <Link href={"/forgotPassword"} >
                <p className='text-white cursor-pointer'>Forgot Password?</p>
              </Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Signin