"use client";
import DashboardBar from '../components/dashboardbar/DashboardBar'
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdTitle } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import "./page.css";

const Transactions = () => {



  const tokenCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
  const token = tokenCookie?.split('=')[1];


  const [transactions, setTransactions] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/user/transactions/${token}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const trans = response.data;
        // if(trans.length > 6){
        //   trans.slice(0,5);
        // }
        // console.log(trans);
        // console.log(trans[0])
        setTransactions(trans);
      } catch (error:any) {
        alert(error.message);
      }
    }
    fetchTransactions();
  }, [token]);

  const deleteTransactionById = async(id : bigint)=> {
    try{
      const res = await axios.delete(`http://localhost:8082/transaction/deleteTransaction/${id}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
      });
      // console.log(res);
      alert(res.data.message);
      try {
        const response = await axios.get(`http://localhost:8082/user/transactions/${token}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const trans = response.data;
        setTransactions(trans);
      } catch (error:any) {
        alert(error.message);
      }

    }catch(error:any){
      alert(error.message);
    }
  }

  const findTransactionsByText = async()=>{
    try{
      const res = await axios.get(`http://localhost:8082/user/transactions/searchText/${token}/${searchInput}`, 
      {
          headers: {
            'Authorization': `Bearer ${token}`
          }
      });
      // console.log(res);
      setTransactions(res.data);
      // console.log(transactions);

    }catch(error:any){
      alert(error.message);
    }
  }


  return (
    <div className='flex flex-col h-[100vh]'>
        <DashboardBar/>
        <div className='bg-[#001D3D] w-[100%] grow py-[3rem] px-[4rem] flex flex-col space-y-[2rem] trans_main'>
          <div className='flex flex-row w-[100%] space-x-[2rem] trans_search_main items-center'>
            <input type='text' placeholder='Search' className='p-[0.8rem] text-[1.5rem] rounded-md w-[95%] trans_search_input' name='search_input' value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/>
            <button className='bg-[#001732] p-[1rem] text-center rounded-md text-[2rem] text-white trans_search_btn' onClick={findTransactionsByText}>
              <FaSearch/>
            </button>
          </div>
          <ul className='overflow-y-scroll h-[70vh] bg-white rounded-md p-[1.5rem] space-y-[2rem] trans_list'>
            {
              transactions.map((transaction)=>
                <li key={transaction['id']} className='flex flex-col p-[1rem] space-y-[1rem] bg-[#001732] border-b-[#ba61f2] border-b-[0.5rem] rounded-lg text-white hover:bg-[#fcf0de] hover:text-[#001732] trans_li'>
                  <div className='flex flex-row w-[100%] justify-between text-[1.7rem] trans_details_main'>
                    <div className='flex flex-row justify-between w-[95%] trans_details'>
                      <div className='flex flex-row items-center space-x-[0.5rem] w-[35%] trans_details_item'>
                        <MdTitle/>
                        {
                          transaction['type']==='Income'&&<p className='text-[#09DA4D] font-semibold'>{transaction['title']}</p>
                        }
                        {
                          transaction['type']==='Expense'&&<p className='text-[#f25d52] font-semibold'>{transaction['title']}</p>
                        }
                      </div>
                      <div className='flex flex-row items-center space-x-[0.5rem] w-[35%] trans_details_item'>
                        <FaMoneyBill/>
                        <p>₹ {transaction['amount']}</p>
                      </div>
                      <div className='flex flex-row items-center space-x-[0.5rem] w-[20%] trans_details_item'>
                        <MdOutlineDateRange/>
                        <p>{transaction['dateOfTransaction']}</p>
                      </div>
                    </div>
                    <button onClick={()=>deleteTransactionById(transaction['id'])}><MdDelete/></button>
                  </div>
                  <div className='flex flex-row flex-wrap'>
                    <p className='trans_ref'>{transaction['reference']}</p>
                  </div>
                </li>
              )
            }


            {
              transactions.length===0&&
              <p className='text-[4rem] text-center text-[#8f8e8c]'>No Transactions</p>
            }
          </ul>
        </div>
    </div>
  )
}

export default Transactions