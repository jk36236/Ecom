import React from 'react';
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/logo.png";
import { FaSearch, FaShoppingCart} from 'react-icons/fa';
import { BiSolidUserRectangle } from "react-icons/bi";

const options={
  burgerColorHover:"#a62d24",
   logo,
   logoWidth:"20vmax",
   logoHoverSize:"10px",
   logoHoverColor:"#eb4034",

   navColor1:"white",

   link1Text:"Home",
   link2Text:"Product",
   link3Text:"Contact",
   link4Text:"About",

   link1Url:"/",
   link2Url:"/product",
   link3Url:"/contact",
   link4Url:"/about",

   link1Size:"1.3vmax",
   link1Color:"rgba(35,35,35,0.8)",

   nav1justifyContent:"flex-end",
   nav2justifyContent:"flex-end",
   nav3justifyContent:"flex-start",
   nav4justifyContent:"flex-start",

   link1ColorHover:"#eb4034",
   link1Margin:"1vmax",
   
   
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

   searchIconColorHover: "#eb4034",
   cartIconColorHover: "#eb4034",
   profileIconColorHover: "#eb4034",
   cartIconMargin:"1vmax",

}
const Header = () => {
  return (
   <ReactNavbar {...options} />
  );
}

export default Header