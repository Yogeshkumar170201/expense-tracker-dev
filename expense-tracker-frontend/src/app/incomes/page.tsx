"use client";
import DashboardBar from '../components/dashboardbar/DashboardBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./page.css";

const Incomes = () => {

  const tokenCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
  const token = tokenCookie?.split('=')[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/user/income/${token}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setIncome(response.data);
        // console.log(response.data);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();

  }, [token]); 


  const [income, setIncome] = useState(0.0);


  const [incomeInput, setIncomeInput] = useState({
      "title":"",
      "amount":"",
      "dateOfIncome":"",
      "source":"Salary",
      "reference":""
    })

  
    const handleChange = (e: { target: { name: String; value: String; }; })=>{
      setIncomeInput({ ...incomeInput, [e.target.name as unknown as string]: e.target.value })
    }
  
    const submitIncomeInput = async()=>{

      if(incomeInput===null || incomeInput.title===null || incomeInput.title===""||incomeInput.amount===null||incomeInput.amount===""){
        alert("Salary Title and Salary amount can't be empty");
        setIncomeInput(
          {
            "title":"",
            "amount":"",
            "dateOfIncome":"",
            "source":"Salary",
            "reference":""
          }
        )
        return;
      }

      if(!incomeInput.amount.match("^[0-9]+(?:\.[0-9]{1,2})?$")){
        alert("Invalid amount");
        setIncomeInput(
          {
            "title":"",
            "amount":"",
            "dateOfIncome":"",
            "source":"Salary",
            "reference":""
          }
        )
        return;
      }

      // console.log(incomeInput);
      try {
          const res = await axios.post("http://localhost:8082/transaction/addIncome", incomeInput, {
              headers:{
                  "Authorization": "Bearer "+token
              }
          })
          alert(res.data.message);
          // console.log(res.data.message);
          try {
            const response = await axios.get(`http://localhost:8082/user/income/${token}`,{
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            setIncome(response.data);
            // console.log(response.data);
          } catch (error) {
            // console.log(error);
          }
      } catch (error:any) {
          alert(error.message);
      }finally{
          setIncomeInput(
              {
                "title":"",
                "amount":"",
                "dateOfIncome":"",
                "source":"Salary",
                "reference":""
              }
          )
      }
      
    }

  return (
    <div className='flex flex-col h-[100vh]'>
        <DashboardBar/>
        <div className='flex flex-row w-[100%] grow incomes_main'>
          <div className='bg-[#001732] text-white w-[40%] flex flex-col px-[3rem] py-[15rem] incomes_left'>
            <p className='text-[2rem] title_360px'>Application</p>
            <p className='text-[2rem] title_360px'>Incomes Page</p>
            <p>Add income to your transactions</p>
          </div>
          <div className='flex flex-col bg-[#001D3D] text-black w-[60%] px-[3rem] py-[5rem] space-y-[1rem] incomes_right'>
            <p className='bg-white p-[1rem] text-[2rem] text-center rounded-md mb-[4rem] font-bold income-text'>
              <span className='text-[#001732]'>Total Income: </span>
              <span className='text-[#80e37b]'>₹ {income.toFixed(2)}</span>
            </p>
            <label className='font-bold text-white text-[1.2rem]'>Salary Title</label>
            <input maxLength={17} type='text' placeholder='Enter title' className='h-[2.5rem] w-[25rem] rounded-md p-[0.5rem] input_500px input_360px' value={incomeInput.title} name='title' onChange={handleChange}/>
            <label className='font-bold text-white text-[1.2rem]'>Salary Amount</label>
            <input maxLength={10} type='text' placeholder='Enter amount' className='h-[2.5rem] w-[25rem] rounded-md p-[0.5rem] input_500px input_360px' value={incomeInput.amount} name='amount' onChange={handleChange}/>
            <label className='font-bold text-white text-[1.2rem]'>Salary Date</label>
            <input maxLength={10} type='date' placeholder='Enter date' className='h-[2.5rem] w-[25rem] rounded-md p-[0.5rem] input_500px input_360px' value={incomeInput.dateOfIncome} name='dateOfIncome' onChange={handleChange}/>
            <label className='font-bold text-white text-[1.2rem]'>Source of Salary</label>
            <select name="source" className='h-[2.5rem] w-[25rem] rounded-md p-[0.5rem] input_500px input_360px' value={incomeInput.source} onChange={handleChange}>
              <option value="Salary">Salary</option>
              <option value="Freelancing">Freelancing</option>
              <option value="Investments">Investments</option>
              <option value="Stocks">Stocks</option>
              <option value="Bitcoin">Bitcoin</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Youtube">Youtube</option>
              <option value="Others">Others</option>
            </select>
            <label className='font-bold text-white text-[1.2rem]'>Reference</label>
            <textarea maxLength={100} className='h-[6rem] w-[25rem] rounded-md p-[0.5rem] input_500px resize-none input_360px' placeholder='Add a reference' name="reference" value={incomeInput.reference} onChange={handleChange}></textarea>
            <button className='bg-[#80E37A] w-[10rem] h-[3rem] rounded-md font-bold text-white' onClick={submitIncomeInput}>Add</button>
          </div>
        </div>
    </div>
  )
}

export default Incomes