import React, { Fragment, useEffect } from 'react'
import {CgMouse} from 'react-icons/cg';
import './Home.css';
import Product from './Product';
import MetaData from '../layout/MetaData';
import { getProduct } from '../../actions/productAction';
import {useSelector,useDispatch} from 'react-redux';
import Loader from '../layout/Loader/Loader';
import {useAlert} from "react-alert";


const Home = () => {
  const alert=useAlert();

const dispatch=useDispatch();

const {loading,error,product,productCount}=useSelector(state=>state.products);

//----triggering getProducts actions----
useEffect(()=>{
  if(error){
    return alert.error(error);
  }
dispatch(getProduct());
},[dispatch,error]);

  return (
   <Fragment>

    {loading ?(
      <Loader />
      ):(
       <Fragment>

       <MetaData title="ECOMMERCE" />
       {/*------------- banner---------- */}
       <div className="banner">
         <p>Welcome to Ecommerce</p>
         <h1>FIND AMAZING PRODUCTS BELOW</h1>
 
         <a href="#container">
           <button>
             Scroll <CgMouse />
           </button>
         </a>
       </div>
 {/* ------------Featured Products------------------- */}
       <h2 className='homeHeading'>Featured Products</h2>
 
     <div className='container' id='container'>
       {/* if products exists show them using map */}
       {product && product.map(product=>(
         <Product product={product} />
       ))}
       
     </div>
     </Fragment>
    ) }
   </Fragment>
   
  );
}

export default Home