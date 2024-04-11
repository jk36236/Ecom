import React, { Fragment,useState } from 'react';
import './Header.css';
import {SpeedDial,SpeedDialAction} from '@material-ui/lab';
import DashBoardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import {useNavigate} from "react-router-dom";
import { useAlert } from 'react-alert';
import {logout} from '../../../actions/userAction';
import {useDispatch} from "react-redux";
import Backdrop  from '@material-ui/core/Backdrop';

const UserOptions = ({user}) => {
  const navigate=useNavigate();
  const alert=useAlert();
  const dispatch=useDispatch();


  const[open,setOpen]=useState(false);


  // icon options for speedDialAction
  const options=[
    {icon:<ListAltIcon />,name:"Orders", func:orders},
    {icon:<PersonIcon />,name:"Profile", func: account},
    {icon:<ExitToAppIcon />,name:"Logout",func:logoutUser},
  ];

  //if user is admin then only show dashboard icon,
  //to show on top used unshift-1st position pe add kr dega dashboard icon ko options array main
  if(user.role === "admin"){
    options.unshift({icon:<DashBoardIcon />,name:"Dashboard",func:dashboard});
  }

// functions-which will be called on click of icons
function dashboard(){
  navigate("/dashboard");
}

function orders(){
  navigate("/orders");
}

function account(){
  navigate("/account");
}

function logoutUser(){
  dispatch(logout());
  alert.success("Logout Successfully");
}
  return (
     <Fragment>
      <Backdrop open={open} style={{zIndex:"10"}}/>
      <SpeedDial
      ariaLabel='SpeedDial tooltip example'
      onClose={()=> setOpen(false)}
      onOpen={()=>setOpen(true)}
      open={open}
      direction="down"
      className='speedDial'
      style={{zIndex:"11"}}
      icon={
        <img 
         className='speedDialIcon'
         src={user.avatar.url ? user.avatar.url : "/Profile.png"}
         alt="Profile"
        />
      }
      >

     {options.map((item)=>(
      <SpeedDialAction icon={item.icon} key={item.name} tooltipTitle={item.name} onClick={item.func} />   
     ))}
      </SpeedDial>
     </Fragment>
    );
}

export default UserOptions