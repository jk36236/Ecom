import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import './ProductList.css';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import Loader from '../layout/Loader/Loader';


const OrderList = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const alert = useAlert();

  const {loading, error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);


  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.6 },

    { field: "status", headerName: "Status", minWidth: 150, flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 170, flex: 0.4, },
    {field:"amount",headerName:"Amount",type:"number",minWidth:230,flex:0.4},


    {field:"actions",headerName:"Actions",flex:0.3,minWidth:130,type:"number",sortable:false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders && orders.forEach((item) => {
      rows.push({
        itemsQty:item.orderItems.length,
        id:item._id,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });
  


    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
      }
  
      if (isDeleted) {
        alert.success("Order Deleted Successfully");
        navigate("/admin/orders");
        dispatch({ type: DELETE_ORDER_RESET });
      }
  
      dispatch(getAllOrders());
    }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />
      {loading ?
       (
       <Loader />
       ):(

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
       )}
    </Fragment>
  );
};

export default OrderList;