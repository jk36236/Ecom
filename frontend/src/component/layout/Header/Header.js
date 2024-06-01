import React from 'react';
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/logo.png";
import { FaSearch, FaShoppingCart} from 'react-icons/fa';
import { BiSolidUserRectangle } from "react-icons/bi";

const options={
  burgerColorHover:'#3027ae',
   logo,
   logoWidth:"20vmax",
   logoHoverSize:"10px",
   logoHoverColor:"#ffdf00",

   navColor1:"white",

   link1Text:"Home",
   link2Text:"Products",
   link3Text:"Contact",
   link4Text:"About",

   link1Url:"/",
   link2Url:"/products",
   link3Url:"/contact",
   link4Url:"/about",

   link1Size:"1.3vmax",
   link1Color:"rgba(35,35,35,0.8)",

   nav1justifyContent:"flex-end",
   nav2justifyContent:"flex-end",
   nav3justifyContent:"flex-start",
   nav4justifyContent:"flex-start",

   link1ColorHover:"#ffdf00",
   link1Margin:"1vmax",
   profileIconUrl:"/login",
   
//icons
   searchIcon:true,
   SearchIconElement:FaSearch,
   cartIcon:true,
   CartIconElement:FaShoppingCart,
   profileIcon:true,
   ProfileIconElement:BiSolidUserRectangle,

   searchIconColor: "rgba(35, 35, 35,0.8)",
   cartIconColor: "rgba(35, 35, 35,0.8)",
   profileIconColor: "rgba(35, 35, 35,0.8)",

   searchIconColorHover: "#ffdf00",
   cartIconColorHover: "#ffdf00",
   profileIconColorHover: "#ffdf00",
   cartIconMargin:"1vmax",

}
const Header = () => {
  return (
   <ReactNavbar {...options} />
  );
}

export default Header