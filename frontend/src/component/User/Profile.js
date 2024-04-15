import React,{Fragment,useEffect} from 'react'
import MetaData from '../layout/MetaData'
import {useSelector} from 'react-redux'
import Loader from '../layout/Loader/Loader'
import {Link,useNavigate} from "react-router-dom"
import './Profile.css';


const Profile = () => {
  const navigate=useNavigate();

  const{loading,isAuthenticated,user}=useSelector(state=>state.user);

useEffect(()=>{
  if(isAuthenticated === false){
    navigate('/login');
  }
},[navigate,isAuthenticated]);


  return (
  <Fragment>
    {loading ? (<Loader />) :(
          <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className='profileContainer'>
            {/* 1st div -left*/}
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            {/* 2nd div-right */}
            <div>
            <div>
              <h4>Full Name</h4>
              <p>{user.name}</p>
            </div>
            <div>
              <h4>Email</h4>
              <p>{user.email}</p>
            </div>
            <div>
              <h4>Joined On</h4>
              <p>{String(user.createdAt).substr(0,10)}</p>
              {/* hume sirf date cahiye,string me convert karke usme se 1st 10 characters cahiye joki date h */}
            </div>
            <div>
              <Link to="/orders">My Orders</Link>
              <Link to="/password/update">Change Password</Link>
            </div>
            </div>
          </div>
        </Fragment>
    )}
  </Fragment>
  )
}

export default Profile