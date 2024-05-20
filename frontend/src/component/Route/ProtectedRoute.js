import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate,Outlet} from 'react-router-dom';

const ProtectedRoute = ({isAdmin}) => {
  const {isAuthenticated,user}=useSelector((state)=>state.user);

  return(
    
      isAuthenticated === false ? <Navigate to='/login' /> : <Outlet /> ,
      isAdmin === true && user.role !== "admin" ?  <Navigate to='/login' /> : <Outlet />
    
    );
};

export default ProtectedRoute