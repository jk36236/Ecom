import React, { Fragment,useRef,useState,useEffect } from 'react'
import './LoginSignUp.css'
import Loader from '../layout/Loader/Loader.js'
import { Link, useNavigate } from 'react-router-dom'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";

import {useDispatch,useSelector} from "react-redux";
import {clearErrors,login,register} from '../../actions/userAction';
import {useAlert} from "react-alert";


const LoginSignUp = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const alert=useAlert();

  const {error,loading,isAuthenticated} =useSelector((state)=>state.user);

// reference of forms and btn
const loginTab=useRef(null); 
const registerTab=useRef(null);
const switcherTab=useRef(null);

const[loginEmail,setLoginEmail]=useState(""); 
const[loginPassword,setLoginPassword]=useState("");

const[user,setUser]=useState({
  name:"",
  email:"",
  password:"",
});

const {name,email,password}=user;

const[avatar,setAvatar]=useState();
const[avatarPreview,setAvatarPreview] =useState("/Profile.png");//public folder m h ye

const loginSubmit=(e)=>{
  e.preventDefault();
  dispatch(login(loginEmail,loginPassword));
}

const registerSubmit=(e)=>{
  e.preventDefault();
 
  const myForm=new FormData();//form ka naya data banajkar bhejenge
  myForm.set("name",name);
  myForm.set("email",email);
  myForm.set("password",password);
  myForm.set("avatar",avatar);
  
  // console.log("SignUp Form submitted");
  dispatch(register(myForm))//userdata is myform
 
 }


 const registerDataChange=(e)=>{
   //avatar ke liye alag se handle karenge onchange baki sabke liye same h
  if(e.target.name === "avatar"){
   const reader=new FileReader();//because hume 1 file ead krni h
   reader.onload=()=>{
    if(reader.readyState === 2){
      setAvatarPreview(reader.result);
      setAvatar(reader.result);
    }
   };
   //onload function tab call hoga jab isme file add hogi
   reader.readAsDataURL(e.target.files[0]);

  }else{
    setUser({ ...user, [e.target.name]: e.target.value});
  }
 }


useEffect(()=>{
 if(error){
  alert.error(error);
  dispatch(clearErrors());
 }

//  if user is logged in sent him to account page,he should not be able to access login page
 if(isAuthenticated){
  navigate('/account');
 }

},[dispatch,error,alert,isAuthenticated,navigate]);

 

const switchTabs=(e,tab)=>{ //tab-ke andar login/register ki value aa jayegai
if(tab === "login"){
  // btn
  switcherTab.current.classList.add("shiftToNeutral");
  switcherTab.current.classList.remove('shiftToRight');

  // form
  registerTab.current.classList.remove("shiftToNeutralForm");
  loginTab.current.classList.remove("shiftToLeft");
}

if(tab === "register"){
   // btn
   switcherTab.current.classList.add("shiftToRight");
   switcherTab.current.classList.remove('shiftToNeutral');
 
   // form
   registerTab.current.classList.add("shiftToNeutralForm");
   loginTab.current.classList.add("shiftToLeft");
}
}





  return (
<Fragment>
  {loading ? ( <Loader />):(
        <Fragment>
        <div className='LoginSignUpContainer'>
          <div className='LoginSignUpBox'>
            {/*---------------------login-signup toggle--------------------- */}
            <div>
              <div className='login_signUp_toggle'>
                <p onClick={(e)=> switchTabs(e,"login")}>LOGIN</p>
  
                <p onClick={(e)=> switchTabs(e,"register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
              {/* is btn ko hum border ki tarhe use karenge */}
            </div>
          {/*------------------- login form--------------------------------- */}
            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
              {/* email */}
              <div className='loginEmail'>
                <MailOutlineIcon />
                <input 
                type="email"
                placeholder='Email'
                required
                value={loginEmail}
                onChange={(e)=>setLoginEmail(e.target.value)}
                />
              </div>
             {/* password */}
              <div className='loginPassword'>
                <LockOpenIcon />
                <input 
                 type="password"
                 placeholder='Password'
                 required
                 value={loginPassword}
                 onChange={(e)=>setLoginPassword(e.target.value)}
                />
              </div>
              {/* forgot pswd */}
              <Link to= "/password/forgot">Forget Password ? </Link>
              {/* submit btn */}
              <input type="submit" value="Login" className='loginBtn'/>
  
            </form>
  {/* -------------------------------------------------------------------- */}
  {/*----------------register form------------------ */}
  
  <form 
   className='signUpForm'
   ref={registerTab}
   encType="multipart/form-data" //is form me hum sirf string, text data nhi bhej rahe h balki hum image bhi upload karenge user ki
   onSubmit={registerSubmit}
   >
    {/* name */}
    <div className='signUpName'>
      <FaceIcon />
      <input 
        type="text"
        placeholder='Name'
        required
        name="name"
        value={name}
        onChange={registerDataChange}
      />
    </div>
  {/* email */}
  <div className='signUpEmail'>
    <MailOutlineIcon />
    <input 
      type="email"
      placeholder='Email'
      required
      name="email"
      value={email}
      onChange={registerDataChange}
    />
  </div>
  {/* password */}
  <div className='signUpPassword'>
    <LockOpenIcon />
    <input 
      type="password"
      placeholder='Password'
      required
      name="password"
      value={password}
      onChange={registerDataChange}
    />
  </div>
  
  {/* image */}
  <div id="registerImage">
    <img src={avatarPreview} alt="Avatar Preview" />
    <input 
      type="file"
      name="avatar"
      accept="image/*"
      onChange={registerDataChange}
    />
  </div>
  
  {/* btn */}
  <input 
    type="submit"
    value="Register"
    className="signUpBtn"
  />
  </form>
  
          </div>
        </div>
      </Fragment>
  )}
</Fragment>
  );
}

export default LoginSignUp