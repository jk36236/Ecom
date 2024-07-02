
import React, { useEffect } from 'react';
import './Dashboard.css';
import Sidebar from'./Sidebar';
import { Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';
import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,ArcElement } from "chart.js"

import {Doughnut,Line} from 'react-chartjs-2';
import { useSelector,useDispatch } from 'react-redux';
import { getAdminProducts } from '../../actions/productAction';
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';
import MetaData from '../layout/MetaData';



const Dashboard = () => {

  const dispatch=useDispatch();
  const {products} =useSelector((state)=> state.products);
  const {orders} =useSelector((state)=>state.allOrders);
  const {users } = useSelector((state) => state.allUsers);
  const {user} =useSelector((state)=>state.user);


  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement,ArcElement, Title, Tooltip, Legend);

  let OutOfStock=0;

  products && products.forEach((item)=>{
   if(item.stock === 0){
    OutOfStock += 1;
   }
  });

  useEffect(()=>{
   dispatch(getAdminProducts());
   dispatch(getAllOrders());
   dispatch(getAllUsers());
  },[dispatch]);

  let totalAmount=0;
  orders && 
      orders.forEach((item)=>{
    totalAmount += item.totalPrice;
  });

const lineState={
  labels:["Initial Amount","Amount Earned"],
  datasets:[
    {
      label:"TOTAL AMOUNT",
      backgroundColor:["tomato"],
      hoverBackgroundColor:["rgb(197,72,49"],
      data:[0,totalAmount],
    },
  ], 
}

const doughnutState={
  labels:["Out of Stock","In Stock"],
  datasets:[
    {
      backgroundColor:["#00A6B4", "#6800B4"],
      hoverBackgroundColor:["#4B5000", "#35014F"],
      data:[ OutOfStock, products.length - OutOfStock],
    },
  ], 
}



  return (
    <>
    <MetaData title="Dashboard"/>
    <div className='dashboard'>
      <Sidebar />

{/* MAIN CONTAINER */}
      <div className='dashboardContainer'>
        <Typography component="h1">Dashboard</Typography>
{/* box1 */}
        <div className='dashboardSummary'>
          <div>
            <p>
              Total Amount <br /> Rs.{totalAmount}
            </p>
          </div>
{/* box2 */}
          <div className='dashboardSummaryBox2'>
            <Link to='/admin/products'>
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>

            <Link to='/admin/orders'>
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
 
            <Link to='/admin/users'>
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

{/* charts */}

      <div className='lineChart'>
        <Line 
         data={lineState}
        />
      </div>
 
      <div className='doughnutChart'>
        <Doughnut 
         data={doughnutState}
        />
      </div>

      </div>
      <p id="dashboardFooter">{user.name}'s Dashboard</p>
    </div>
    </>
  )
}

export default Dashboard