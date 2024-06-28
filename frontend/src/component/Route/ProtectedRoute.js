import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate,Outlet} from 'react-router-dom';

const ProtectedRoute = ({isAdmin}) => {
  const {loading,isAuthenticated,user}=useSelector((state)=>state.user);

  // if(isAdmin === true){
  //   return (
  //    user.role !== 'admin' ? <Navigate to='/login' /> : <Outlet />
  //   )
  // }

  return(
 (!loading &&
     isAuthenticated === true ? <Outlet /> : <Navigate to='/login' /> 
 )
      );
};

export default ProtectedRoute