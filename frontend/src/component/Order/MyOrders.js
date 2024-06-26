import React,{Fragment,useEffect} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import { useSelector,useDispatch } from 'react-redux';
import { clearErrors,myOrders } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert'; 
import './MyOrders.css';
import MetaData from '../layout/MetaData';
import LaunchIcon from '@material-ui/icons/Launch';

const MyOrders = () => {
  const dispatch=useDispatch();
  const alert=useAlert();

  const {loading,error,orders } = useSelector((state)=>state.myOrders);

  const {user} =useSelector((state)=>state.user);


  const columns=[
    {field:"id", headerName:"Order ID",minWidth:300,flex:0.6},
    {field:"status", headerName:"Status",minWidth:150,flex:0.4,
    //if status is delivered green color else redcolor
    cellClassName:(params)=>{
       return params.getValue(params.id,"status") === "Delivered" ? "greenColor": "redColor";
    },
  },
    {field:"itemsQty",headerName:"Items Qty",type:"number",minWidth:180,flex:0.3},
    {field:"amount",headerName:"Amount",type:"number",minWidth:230,flex:0.4},
    {field:"actions",headerName:"Actions",flex:0.3,minWidth:130,type:"number",sortable:false,
     renderCell:(params)=>{
      return(
     <Link to={`/order/${params.getValue(params.id,"id")}`} >
      <LaunchIcon />
     </Link>
      );
     },
  },//icon
  ];
  const rows=[];

  orders && 
  orders.forEach((item,index)=>{
    rows.push({
      itemsQty:item.orderItems.length,
      id:item._id,
      status:item.orderStatus,
      amount:item.totalPrice,
    });
  });

  useEffect(()=>{
   if(error){
    alert.error(error);
    dispatch(clearErrors());
   }

   dispatch(myOrders());
  },[dispatch,alert,error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ?
       (
       <Loader />
       ):
       (
       <div className='myOrdersPage'>
        {/* table */}
        <DataGrid
           rows={rows}
           columns={columns}
           pageSize={10}
           rowsPerPageOptions={[10]}
           disableSelectionOnClick
           className='myOrdersTable'
           autoHeight
         />
         
      <p id="myOrdersHeading">{user.name}'s Orders</p>

       </div>
      )}
    </Fragment>
    )
}

export default MyOrders