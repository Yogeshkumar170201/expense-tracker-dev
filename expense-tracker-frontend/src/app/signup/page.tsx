"use client";
import Navbar from '../components/navbar/Navbar'
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import "./page.css";

const Signup = () => {

  const router = useRouter();
  const [registerRequest, setRegisterRequest] =  useState(
    {
      "name":"",
      "email":"",
      "password":""
    }
  )

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e: { target: { name: any; value: any; }; })=>{
    setRegisterRequest({...registerRequest, [e.target.name]:e.target.value})
  }

  const registerUser = async ()=>{
    if(registerRequest===null||registerRequest.name===null||registerRequest.name===""||
    registerRequest.email===""||registerRequest.email===null||
    registerRequest.password===""||registerRequest.password===null||
    confirmPassword===null||confirmPassword==="")
    {
      alert("Please fill all fields");
      setRegisterRequest(
        {
          "name":"",
          "email":"",
          "password":""
        }
      )
      setConfirmPassword("");
      return;
    }

    if(registerRequest.password!==confirmPassword){
      alert("Passwords do not match");
      setRegisterRequest(
        {
          "name":"",
          "email":"",
          "password":""
        }
      )
      setConfirmPassword("");
      return;
    }

    if(!registerRequest.email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")){
      alert("Enter a valid email address");
      setRegisterRequest(
        {
          "name":"",
          "email":"",
          "password":""
        }
      )
      setConfirmPassword("");
      return;
    }

    if(!registerRequest.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+={}|'<>,.?/~:])[A-Za-z0-9!@#$%^&*()_+={}|'<>,.?/~:].{5,}$")){
      alert("Password must contain at least one lowercase letter, at least one uppercase letter, at least one digit, at least one special character and should be of at least 6 characters");
      setRegisterRequest(
        {
          "name":"",
          "email":"",
          "password":""
        }
      )
      setConfirmPassword("");
      return;
    }
  
    const {data} = await axios.post("http://localhost:8082/auth/register", registerRequest)
    alert(data['message']);
    setRegisterRequest(
      {
        "name":"",
        "email":"",
        "password":""
      }
    )
    setConfirmPassword("");
    router.push('/signin')
  }

  return (
    <div className='flex flex-col h-[100vh]'>
        <Navbar/>
        <div className='flex flex-row w-[100%] grow signup_main'>
          <div className='bg-[#001732] text-white w-[40%] flex flex-col px-[3rem] py-[15rem] signup_left'>
            <p className='text-[2rem] title_360px'>Application</p>
            <p className='text-[2rem] title_360px'>Signup Page</p>
            <p>Register from here to access.</p>
          </div>
          <div className='flex flex-col bg-[#001D3D] text-black w-[60%] px-[3rem] py-[10rem] space-y-[1rem] signup_right'>
            <label className='font-bold text-white text-[1.2rem]'>Name</label>
            <input type='text' placeholder='Enter name' className='h-[2.5rem] w-[25rem] rounded-md p-[0.5rem] input_500px input_360px' value={registerRequest.name} name='name' onChange={handleChange}/>
            <label className='font-bold text-white text-[1.2rem]'>Email Id</label>
            <input type='email' placeholder='Enter email' className='h-[2.5rem] w-[25rem] rounded-md p-[0.5rem] input_500px input_360px' value={registerRequest.email} name='email' onChange={handleChange}/>
            <label className='font-bold text-white text-[1.2rem]'>Password</label>
            <input type='password' placeholder='Enter password' className='h-[2.5rem] w-[25rem] rounded-md p-[0.5rem] input_500px input_360px' value={registerRequest.password} name='password' onChange={handleChange}/>
            <label className='font-bold text-white text-[1.2rem]'>Confirm Password</label>
            <input type='password' placeholder='Enter password again' className='h-[2.5rem] w-[25rem] rounded-md p-[0.5rem] input_500px input_360px'value={confirmPassword} name='confirmPassword' onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
            <div className='flex flex-row items-center justify-between w-[25rem] pt-[2rem] input_500px input_360px button_500px'>
              <button className='bg-[#e36475] w-[10rem] h-[3rem] rounded-md font-bold text-white' onClick={registerUser}>Signup</button>
              <Link href={"/forgotPassword"}>
                <p className='text-white cursor-pointer'>Forgot Password?</p>
              </Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Signup