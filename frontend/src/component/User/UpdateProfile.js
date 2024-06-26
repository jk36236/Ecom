import React, { Fragment,useState,useEffect } from 'react'
import './UpdateProfile.css';
import Loader from '../layout/Loader/Loader.js'
import { useNavigate } from 'react-router-dom'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from "@material-ui/icons/Face";
import {useDispatch,useSelector} from "react-redux";
import {clearErrors,loadUser,updateProfile} from '../../actions/userAction';
import {useAlert} from "react-alert";
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';


const UpdateProfile = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const alert=useAlert();

  const {user} =useSelector((state)=>state.user);
  const{error,isUpdated,loading} =useSelector((state)=>state.profile);

  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[avatar,setAvatar]=useState();
  const[avatarPreview,setAvatarPreview] =useState("/Profile.png");

  
  const updateProfileSubmit=(e)=>{
    e.preventDefault();
   
    const myForm=new FormData();//form ka naya data banajkar bhejenge
    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("avatar",avatar);
    dispatch(updateProfile(myForm));//userdata is myform
   };
  
  
   const updateProfileDataChange=(e)=>{
     const reader=new FileReader();//because hume 1 file read krni h
     reader.onload=()=>{
      if(reader.readyState === 2){
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
     };
     //onload function tab call hoga jab isme file add hogi
     reader.readAsDataURL(e.target.files[0]);
   };
  
  
  useEffect(()=>{
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate('/account');

    dispatch({
      type:UPDATE_PROFILE_RESET,//taki isUpdate false ho jaye
    });
   }
  },[dispatch,error,alert,navigate,user,isUpdated]);


  return (
    <Fragment>
      {loading ? (<Loader />): (
       
       <Fragment>
      <MetaData title="Update Profile"/>
        <div className='updateProfileContainer'>
          <div className='updateProfileBox'>
            <h2 className='updateProfileHeading'>Update Profile</h2>
<form 
   className='updateProfileForm'
   encType="multipart/form-data" 
   onSubmit={updateProfileSubmit}
   >
    {/* name */}
    <div className='updateProfileName'>
      <FaceIcon />
      <input 
        type="text"
        placeholder='Name'
        required
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  {/* email */}
  <div className='updateProfileEmail'>
    <MailOutlineIcon />
    <input 
      type="email"
      placeholder='Email'
      required
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />
  </div>
  
  {/* image */}
  <div id="updateProfileImage">
    <img src={avatarPreview} alt="Avatar Preview" />
    <input 
      type="file"
      name="avatar"
      accept="image/*"
      onChange={updateProfileDataChange}
    />
  </div>
  
  {/* btn */}
  <input 
    type="submit"
    value="Update"
    className="updateProfileBtn"
  />
  </form>
  
          </div>
          </div>
    </Fragment>
  
      )}
    </Fragment>
  )
}

export default UpdateProfile