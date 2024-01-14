"use client";
import DashboardBar from '../components/dashboardbar/DashboardBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./page.css";

const Expenses = () => {


  const tokenCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
  const token = tokenCookie?.split('=')[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/user/expense/${token}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setExpense(response.data);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();

  }, [token]); 


  const [expense, setExpense] = useState(0.0);


  const [expenseInput, setExpenseInput] = useState({
      "title":"",
      "amount":"",
      "dateOfExpense":"",
      "source":"Education",
      "reference":""
    })
  
    const handleChange = (e: { target: { name: String; value: String; }; })=>{
      setExpenseInput({ ...expenseInput, [e.target.name as unknown as string]: e.target.value })
    }
  
    const submitExpenseInput = async()=>{
      // console.log(expenseInput);

      if(expenseInput===null || expenseInput.title===null || expenseInput.title===""||expenseInput.amount===null||expenseInput.amount===""){
        alert("Salary Title and Salary amount can't be empty");
        setExpenseInput(
          {
            "title":"",
            "amount":"",
            "dateOfExpense":"",
            "source":"Education",
            "reference":""
          }
        )
        return;
      }

      if(!expenseInput.amount.match("^[0-9]+(?:\.[0-9]{1,2})?$")){
        alert("Invalid amount");
        setExpenseInput(
          {
            "title":"",
            "amount":"",
            "dateOfExpense":"",
            "source":"Education",
            "reference":""
          }
        )
        return;
      }

      try {
          const res = await axios.post("http://localhost:8082/transaction/addExpense", expenseInput, {
              headers:{
                  "Authorization": "Bearer "+token
              }
          })
          alert(res.data.message);
          // console.log(res.data.message);
          try {
            const response = await axios.get(`http://localhost:8082/user/expense/${token}`,{
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            setExpense(response.data);
          } catch (error) {
            // console.log(error);
          }
      } catch (error:any) {
          alert(error.message);
      }finally{
          setExpenseInput(
              {
                "title":"",
                "amount":"",
                "dateOfExpense":"",
                "source":"Education",
                "reference":""
              }
          )
      }
      
    }

  return (
    <div className='flex flex-col h-[100vh]'>
        <DashboardBar/>
        <div className='flex flex-row w-[100%] grow expenses_main'>
          <div className='bg-[#001732] text-white w-[40%] flex flex-col px-[3rem] py-[15rem] expenses_left'>
            <p className='text-[2rem] title_360px'>Application</p>
            <p className='text-[2rem] title_360px'>Expenses Page</p>
            <p>Add expense to your transactions</p>
          </div>
          <div className='flex flex-col bg-[#001D3D] text-black w-[60%] px-[3rem] py-[5rem] space-y-[1rem] expenses_right'>
            <p className='bg-white p-[1rem] text-[2rem] text-center rounded-md mb-[4rem] font-bold expense-text'>
              <span className='text-[#001732]'>Total Expenses: </span>
              <span className='text-[#e8879d]'>₹{expense.toFixed(2)}</span>
            </p>
            <label className='font-bold text-white text-[1.2rem]'>Expense Title</label>
            <input maxLength={18} type='text' placeholder='Enter title' className='h-[2.5rem] w-[25rem] rounded-md p-[0.5rem] input_500px input_360px' name="title" value={expenseInput.title} onChange={handleChange}/>
            <label className='font-bold text-white text-[1.2rem]'>Expense Amount</label>
            <input maxLength={10} type='text' placeholder='Enter amount' className='h-[2.5rem] w-[25rem] rounded-md p-[0.5rem] input_500px input_360px' name="amount" value={expenseInput.amount} onChange={handleChange}/>
            <label className='font-bold text-white text-[1.2rem]'>Expense Date</label>
            <input maxLength={10} type='date' placeholder='Enter date' className='h-[2.5rem] w-[25rem] rounded-md p-[0.5rem] input_500px input_360px' name="dateOfExpense" value={expenseInput.dateOfExpense} onChange={handleChange}/>
            <label className='font-bold text-white text-[1.2rem]'>Source of Expense</label>
            <select name="source" className='h-[2.5rem] w-[25rem] rounded-md p-[0.5rem] input_500px input_360px' value={expenseInput.source} onChange={handleChange}>
              <option value="Education">Education</option>
              <option value="Groceries">Groceries</option>
              <option value="Health">Health</option>
              <option value="Subscriptions">Subscriptions</option>
              <option value="Takeaways">Takeaways</option>
              <option value="Clothing">Clothing</option>
              <option value="Travelling">Travelling</option>
              <option value="Others">Others</option>
            </select>
            <label className='font-bold text-white text-[1.2rem]'>Reference</label>
            <textarea maxLength={100} className='h-[6rem] w-[25rem] rounded-md p-[0.5rem] input_500px resize-none input_360px' placeholder='Add a reference' name="reference" value={expenseInput.reference} onChange={handleChange}></textarea>
            <button className='bg-[#e36475] w-[10rem] h-[3rem] rounded-md font-bold text-white' onClick={submitExpenseInput}>Add</button>
          </div>
        </div>
    </div>
  )
}

export default Expenses