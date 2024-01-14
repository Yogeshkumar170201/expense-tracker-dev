"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardBar from '../components/dashboardbar/DashboardBar';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import "./page.css";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

interface Transaction {
  date: string;
  amount: number;
}



const Dashboard = () => {


  const tokenCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
  const token = tokenCookie?.split('=')[1];

  const [username, setUsername] = useState("");
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState(0.0);
  const [incomesSourceWise, setIncomesSourceWise] = useState([]);
  const [expensesSourceWise, setExpensesSourceWise] = useState([]);


  useEffect(()=>{
    const fetchUser = async ()=>{
        axios.get(`http://localhost:8082/user/${token}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(response => setUsername(response.data))
        .catch((error:any)=>alert(error))
    }
    fetchUser();
    // console.log(username);
  },[token]);


  useEffect(()=>{
      const fetchLastMonthIncomes = async ()=>{
          axios.get(`http://localhost:8082/user/transactions/lastMonthIncome/${token}`,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }).then((response)=>setIncomes(response.data))
          .catch ((error:any)=>alert(error)) 
      }
      fetchLastMonthIncomes();
      // console.log(incomes);
  },[token]);

  useEffect(()=>{
    const fetchLastMonthExpenses = async ()=>{
          axios.get(`http://localhost:8082/user/transactions/lastMonthExpense/${token}`,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }).then((response)=>setExpenses(response.data))
          .catch ((error:any)=>alert(error)) 
      }
      fetchLastMonthExpenses();
      // console.log(expenses);
  },[token]);

  useEffect(()=>{
    const fetchAmount = async ()=>{
          axios.get(`http://localhost:8082/user/amount/${token}`,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }).then((response)=>setAmount(response.data))
          .catch ((error:any)=>alert(error)) 
      }
      fetchAmount();
  },[token]);

  useEffect(()=>{
    const fetchLastMonthIncomesSourceWise = async ()=>{
          axios.get(`http://localhost:8082/user/incomes/sourceWise/${token}`,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }).then((response)=>setIncomesSourceWise(response.data))
          .catch ((error:any)=>alert(error)) 
      }
      fetchLastMonthIncomesSourceWise();
  },[token]);

  useEffect(()=>{
    const fetchLastMonthExpensesSourceWise = async ()=>{
          axios.get(`http://localhost:8082/user/expenses/sourceWise/${token}`,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }).then((response)=>setExpensesSourceWise(response.data))
          .catch ((error:any)=>alert(error)) 
      }
      fetchLastMonthExpensesSourceWise();
  },[token]);



  const getLabels = ()=>{

    const today = new Date();
    const endDate = new Date(today);
    const startDate = new Date(today);
    endDate.setDate(today.getDate()); 
    startDate.setDate(today.getDate()-7);
    
    const dates: string[] = [];
    while (startDate <= endDate) {
      const formattedDate = startDate.toISOString().slice(0, 10);
      dates.push(formattedDate);
      startDate.setDate(startDate.getDate() + 1);
    }
    return dates;
  }

  const getIncomeData = ()=>{
    let myMap: Map<string, number> = new Map();

  
    // console.log(incomes);
    for(const inc of incomes){
      // console.log(inc['date'], inc['amount']);
      myMap.set(inc['date'], inc['amount']);
    };
    // console.log(myMap);
    var data : number[] = [];
    const labels :string[] = getLabels();
    for(const label of labels){
      const value = myMap.get(label);
      if (value !== undefined) {
          data.push(value);
      } else {
          data.push(0);
      }
    }
    return data;
  }

  const getExpenseData = ()=>{
    let myMap: Map<string, number> = new Map();

  
    // console.log(incomes);
    for(const exp of expenses){
      // console.log(inc['date'], inc['amount']);
      myMap.set(exp['date'], exp['amount']);
    };
    // console.log(myMap);
    var data : number[] = [];
    const labels :string[] = getLabels();
    for(const label of labels){
      const value = myMap.get(label);
      if (value !== undefined) {
          data.push(value);
      } else {
          data.push(0);
      }
    }
    return data;
  }

  const getIncomeSources = ()=>{
    return [
      'Salary',
      'Freelancing',
      'Investments',
      'Stocks',
      'Bitcoin',
      'Bank Transfer',
      'Youtube',
      'Others'
    ];
  }

  const getExpenseSources = ()=>{
    return [
      'Education',
      'Groceries',
      'Health',
      'Subscriptions',
      'Takeaways',
      'Clothing',
      'Travelling',
      'Others'
    ];
  }

  const getIncomeDataSourceWise = ()=>{
    let myMap: Map<string, number> = new Map();
    for(const inc of incomesSourceWise){
      // console.log(inc['date'], inc['amount']);
      myMap.set(inc['source'], inc['amount']);
    };
    var data : number[] = [];
    const labels :string[] = getIncomeSources();
    for(const label of labels){
      const value = myMap.get(label);
      if (value !== undefined) {
          data.push(value);
      } else {
          data.push(0);
      }
    }
    return data;
  }

  const getExpenseDataSourceWise = ()=>{
    let myMap: Map<string, number> = new Map();
    for(const exp of expensesSourceWise){
      // console.log(inc['date'], inc['amount']);
      myMap.set(exp['source'], exp['amount']);
    };
    var data : number[] = [];
    const labels :string[] = getExpenseSources();
    for(const label of labels){
      const value = myMap.get(label);
      if (value !== undefined) {
          data.push(value);
      } else {
          data.push(0);
      }
    }
    return data;
  }


  return (
    <div className='flex flex-col h-[100vh]'>
        <DashboardBar/>
        <div className='bg-[#001D3D] grow p-[2rem]'>
          <p className='gradient-text text-[3rem] text-right font-extrabold user-text'>Welcome {username.split('@')[0]},</p>

          <p className='bg-white p-[1rem] text-[2rem] text-center rounded-md my-[4rem] font-bold amount-text'>
              <span className='text-[#001732]'>Total Amount: </span>
              {amount>=0&&<span className='text-[#80e37b]'>₹ {amount.toFixed(2)}</span>}
              {amount<0&&<span className='text-[#e8879d]'>₹ {amount.toFixed(2)}</span>}
          </p>
          {incomesSourceWise.length===0&&expensesSourceWise.length===0&&<p className='text-[#8F8E8C] text-[5rem] text-center'>No Transactions</p>}
          {incomesSourceWise.length>0&&<div className='flex flex-row items-center justify-around pt-[5rem] graph-div'>
            <div className='w-[45%] line-chart-div'>
              <Line data={{
                  labels: getLabels(),
                  datasets:[{
                    label:'Incomes',
                    data : getIncomeData(),
                    borderColor: 'aqua',
                    tension: 0.4
                  }],
                }}
                options={{
                  scales: {
                      x: {
                          type: 'category',
                      },
                      y: {
                          type: 'linear',
                      },
                  },
                }}
              /> 
            </div>
            <div className='w-[25%] pie-chart-div' >
              <Pie data={
                  {
                    labels: getIncomeSources(),
                    datasets:[
                      {
                        data: getIncomeDataSourceWise(),
                        backgroundColor: ['#f07f92', '#f07fcc', '#e37ff0', '#ac7ff0', '#7f87f0', '#7fd5f0', '#7ff0b0', '#f2b28d'],
                      }
                    ]
                  }
                }>
                
              </Pie>
            </div>
          </div>}
          {expensesSourceWise.length>0&&<div className='pt-[10rem] flex flex-row justify-around items-center graph-div'>
            <div className='w-[45%] line-chart-div'>
              <Line data={{
                labels: getLabels(),
                datasets:[{
                  label:'Expenses',
                  data : getExpenseData(),
                  borderColor: 'aqua',
                  tension: 0.4
                }],
              }}
                options={{
                  scales: {
                      x: {
                          type: 'category',
                      },
                      y: {
                          type: 'linear',
                      },
                  },
                }}
              /> 
      
            </div>
            <div className='w-[25%] pie-chart-div'>
              <Pie data={
                {
                  labels: getExpenseSources(),
                  datasets:[
                    {
                      data: getExpenseDataSourceWise(),
                      backgroundColor: ['#f07f92', '#f07fcc', '#e37ff0', '#ac7ff0', '#7f87f0', '#7fd5f0', '#7ff0b0', '#f2b28d'],
                    }
                  ]
                }
              }>
              </Pie>
            </div>
          </div>}
    
        </div>
    </div>
  )
}

export default Dashboard