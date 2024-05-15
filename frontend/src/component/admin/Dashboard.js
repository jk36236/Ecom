
import React, { useEffect } from 'react';
import './Dashboard.css';
import Sidebar from'./Sidebar';
import { Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';
import {Doughnut,Line} from 'react-chartjs-2';
import { useSelector,useDispatch } from 'react-redux';
import { getAdminProducts } from '../../actions/productAction';


const Dashboard = () => {
  const dispatch=useDispatch();
  const {products} =useSelector((state)=> state.products);

  let outOfStock=0;

  products && products.forEach((item)=>{
   if(item.Stock === 0){
    outOfStock += 1;
   }
  });

  useEffect(()=>{
   dispatch(getAdminProducts());
  },[dispatch]);

const lineState={
  labels:["Initial Amount","Amount Earned"],
  datasets:[
    {
      label:"TOTAL AMOUNT",
      backgroundColor:["tomato"],
      hoverBackgroundColor:["rgb(197,72,49"],
      data:[0,4000],
    },
  ], 
}

const doughnutState={
  labels:["Out of Stock","In Stock"],
  datasets:[
    {
      backgroundColor:["#00A684,#6800B4"],
      hoverBackgroundColor:["#485000,#35014F"],
      data:[outOfStock, products.length - outOfStock],
    },
  ], 
}


  return (
    <div className='dashboard'>
      <Sidebar />

{/* MAIN CONTAINER */}
      <div className='dashboardContainer'>
        <Typography component="h1">Dashboard</Typography>
{/* box1 */}
        <div className='dashboardSummary'>
          <div>
            <p>
              Total Amount <br /> Rs.2000
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
              <p>4</p>
            </Link>

            <Link to='/admin/users'>
              <p>Users</p>
              <p>2</p>
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
    </div>
  )
}

export default Dashboard