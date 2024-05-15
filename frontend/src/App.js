import './App.css';
import {useState,useEffect} from 'react';
import Header from './component/layout/Header/Header';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import WebFont from 'webfontloader';
import React from 'react';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products.js';
import Search from './component/Product/Search.js';
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import UserOptions from './component/layout/Header/UserOptions';
import Profile from './component/User/Profile.js';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/admin/Dashboard';
import ProductList from './component/admin/ProductList';








function App() {

  const {isAuthenticated,user} =useSelector(state=>state.user);
  const [stripeApiKey,setStripeApiKey]=useState("");
 
  //getting stripe api key from backend
  async function getStripeApiKey(){
    const {data}=await axios.get('/api/v1/stripeapikey');
    setStripeApiKey(data.stripeApiKey);
  }

  //downloading font before page load
  useEffect(()=>{
   WebFont.load({
    google:{
    families:["Roboto","Droid Sans","Chilanka"]
    }

   });

   //setting user in state when site loads
   store.dispatch(loadUser());
   getStripeApiKey();
  },[]);

  return (
    <Router>
     <Header />

     {isAuthenticated && <UserOptions user={user}/>}


     
     
     <Routes>
     <Route path='/' element={<Home />} /> 
     <Route path='/product/:id' element={<ProductDetails />} /> 
     <Route path='/products' element={<Products />} /> 
     <Route path='/products/:keyword' element={<Products />} /> 
     <Route path='/search' element={<Search />} />
     <Route path='/login' element={<LoginSignUp />} />


     {/* --------protected routes--------- */}
     <Route element={<ProtectedRoute />}>
     <Route path='/account' element={<Profile />}/> 
     <Route path='/me/update' element={<UpdateProfile />}/>
     <Route path='/password/update' element={<UpdatePassword />}  />
     <Route path='/shipping' element={<Shipping />} />
     <Route path='/success' element={<OrderSuccess />} />
     <Route path='/orders' element={<MyOrders />} />
     <Route path='/order/confirm' element={<ConfirmOrder/>} />
     <Route path='/order/:id' element={<OrderDetails />} />
     {stripeApiKey && (
        <Route path='/process/payment' element={
          <Elements stripe={loadStripe(stripeApiKey)}> 
           <Payment />
           </Elements>
      } />
     )};

     <Route isAdmin={true} path='/admin/dashboard' element={<Dashboard />} />
     <Route isAdmin={true} path='/admin/products' element={<ProductList />} />

     </Route>

    
     

     {/* ---------------------------------- */}

     <Route path='/password/forgot' element={<ForgotPassword />}  />
     <Route path='/password/reset/:token' element={<ResetPassword />}  />
     <Route path='/cart' element={<Cart />} />


     </Routes>
     <Footer />
    </Router>
   
  );
}

export default App;
