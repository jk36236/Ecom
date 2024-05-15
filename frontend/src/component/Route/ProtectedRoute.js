import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate,Outlet} from 'react-router-dom';

const ProtectedRoute = ({isAdmin}) => {
  const {loading,isAuthenticated,user}=useSelector((state)=>state.user);

  return(
      isAuthenticated ? <Outlet />  : <Navigate to='/login' />
    );
};

export default ProtectedRoute