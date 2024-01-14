"use client";
import Navbar from '../components/navbar/Navbar';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import "./page.css";

const ForgotPassword = () => {

  const router = useRouter();

  const [forgotRequest, setforgotRequest] =  useState(
    {
      "email":"",
      "password":"",
      "confirmPassword":""
    }
  )

  const handleChange = (e: { target: { name: any; value: any; }; })=>{
    setforgotRequest({...forgotRequest, [e.target.name]:e.target.value})
  }

  const forgotUser = async ()=>{
    if(forgotRequest===null||
      forgotRequest.email===null||forgotRequest.email===""||
      forgotRequest.password===null||forgotRequest.password===""||
      forgotRequest.confirmPassword===null||forgotRequest.confirmPassword==="")
    {
      alert("Please fill all the fields");
      setforgotRequest(
        {
          "email":"",
          "password":"",
          "confirmPassword":""
        }
      )
      return;
    }

    if(!forgotRequest.email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")){
      alert("Invalid Email");
      setforgotRequest(
        {
          "email":"",
          "password":"",
          "confirmPassword":""
        }
      )
      return;
    }

    if(!forgotRequest.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+={}|'<>,.?/~:])[A-Za-z0-9!@#$%^&*()_+={}|'<>,.?/~:].{5,}$")){
      alert("Password must contain at least one lowercase letter, at least one uppercase letter, at least one digit, at least one special character and should be of at least 6 characters");
      setforgotRequest(
        {
          "email":"",
          "password":"",
          "confirmPassword":""
        }
      )
      return;
    }

    if(forgotRequest.password!==forgotRequest.confirmPassword){
      alert("Passwords do not match");
      setforgotRequest(
        {
          "email":"",
          "password":"",
          "confirmPassword":""
        }
      )
      return;
    }



    try {
        const res = await axios.put("http://localhost:8082/auth/forgot-password",{
          "email":forgotRequest.email,
          "password":forgotRequest.password
        })
        alert("Verification Email sent. Please verify your email");
        router.push("/signin");
    } catch (error:any) {
      alert(error.message);
    }finally{
      setforgotRequest(
        {
          "email":"",
          "password":"",
          "confirmPassword":""
        }
      )
    }
  }

  return (
    <div className='flex flex-col h-[100vh]'>
        <Navbar/>
        <div className='flex flex-row w-[100%] grow forgotPassword_main'>
          <div className='bg-[#001732] text-white w-[40%] flex flex-col px-[3rem] py-[15rem] forgotPassword_left'>
            <p className='text-[2rem] title_360px'>Application</p>
            <p className='text-[2rem] title_360px'>Forgot Password Page</p>
            <p>Change your password from here to access.</p>
          </div>
          <div className='flex flex-col bg-[#001D3D] text-black w-[60%] px-[3rem] py-[10rem] space-y-[1rem] forgotPassword_right'>
            <label className='font-bold text-white text-[1.2rem]'>Email Id</label>
            <input type='email' placeholder='Enter email' className='h-[2.5rem] w-[25rem] rounded-md p-[0.5rem] input_500px input_360px' value={forgotRequest.email} name='email' onChange={handleChange}/>
            <label className='font-bold text-white text-[1.2rem]'>New Password</label>
            <input type='password' placeholder='Enter password' className='h-[2.5rem] w-[25rem] rounded-md p-[0.5rem] input_500px input_360px' value={forgotRequest.password} name='password' onChange={handleChange}/>
            <label className='font-bold text-white text-[1.2rem]'>Confirm New Password</label>
            <input type='password' placeholder='Enter password again' className='h-[2.5rem] w-[25rem] rounded-md p-[0.5rem] input_500px input_360px' value={forgotRequest.confirmPassword} name='confirmPassword' onChange={handleChange}/>
            <div className='flex flex-row items-center justify-between w-[25rem] pt-[2rem] input_500px input_360px button_500px'>
              <button className='bg-[#E89932] w-[10rem] h-[3rem] rounded-md font-bold text-white' onClick={forgotUser}>Change</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ForgotPassword