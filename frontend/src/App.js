import './App.css';
import Header from './component/layout/Header/Header';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import WebFont from 'webfontloader';
import React from 'react';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products.js';
import Search from './component/Product/Search.js';





function App() {
  //downloading font before page load
  React.useEffect(()=>{
   WebFont.load({
    google:{
    families:["Roboto","Droid Sans","Chilanka"]
    }
   })
  },[]);

  return (
    <Router>
     <Header />
     <Routes>
     <Route path='/' element={<Home />} /> 
     <Route path='/product/:id' element={<ProductDetails />} /> 
     <Route path='/products' element={<Products />} /> 
     <Route path='/products/:keyword' element={<Products />} /> 
     <Route path='/search' element={<Search />} /> 

     </Routes>
     <Footer />
    </Router>
   
  );
}

export default App;
