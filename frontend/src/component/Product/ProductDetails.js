import React, { Fragment, useEffect } from 'react';
import Carousel from "react-material-ui-carousel";
import './ProductDetails.css';
import {useDispatch,useSelector} from "react-redux";
import { clearErrors, getProductDetails } from '../../actions/productAction';
import {useParams} from "react-router-dom";
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard.js';
import Loader from '../layout/Loader/Loader.js';
import {useAlert} from "react-alert";
import MetaData from '../layout/MetaData';


const ProductDetails = () => {

  const dispatch=useDispatch();
  const alert=useAlert();

  const {product,loading,error}=useSelector((state)=>state.productDetails);
  const {id}=useParams();

  useEffect(()=>{
    if(error){
       alert.error(error);
       dispatch(clearErrors());
    }
  dispatch(getProductDetails(id));
  },[dispatch,id,error,alert]);

//options for stars
const options={
  edit:false,//iski vajeh se stars select nhi kr paenge
  color:"rgba(20,20,20,0.1)",
  activeColor:"tomato",//jo select krenge stars unka color
  size:window.innerWidth<600 ? 20: 25,
  value:product.ratings,
  isHalf:true,
};

  return (
    <Fragment>
      {loading ? <Loader />:(
        <Fragment>
          <MetaData title={`${product.name}--ECOMMERCE`}/>
        <div className='productDetails'>
          {/* --------CAROUSEL-------- */}
          <div>
            <Carousel>
              {product.images && 
              product.images.map((item,i)=>(
                <img className='CarouselImage' 
                key={item.url}
                src={item.url}
                alt={`${i} Slide`}/>//i-index,1st image-1st slide,2md image-2nd slide...
              ))}
            </Carousel>
          </div>
          {/* -------CAROUSEL END-------- */}
  
          {/* --------product details -------- */}
        <div>
          {/* -----1st block----- */}
            <div className='detailsBlock-1'>
              <h2>{product.name}</h2>
              <p>Product # {product._id}</p>
            </div>
            {/* ------2nd block-------- */}
            <div className='detailsBlock-2'>
              <ReactStars {...options} />
             <span>({product.numOfReviews} Reviews)</span>
            </div>
           {/* ------3rd block-------- */}
           <div className='detailsBlock-3'>
            <h1>{`Rs.${product.price}`}</h1>
                <div className='detailsBlock-3-1'>
                   <div className='detailsBlock-3-1-1'>
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                   </div>
                  <button>Add to Cart</button>
                </div>
  
                <p>
                  Status:
                  <b className={product.Stock<1 ?"redColor":"greenColor" }>
                    {product.Stock<1?"OutOfStock":"InStock"}
                  </b>
                </p>
            </div>
             {/* -------4th Block-------- */}
            <div className='detailsBlock-4'>
             Description: <p>{product.description}</p>
            </div>
         <button className='submitReview'>Submit Review</button> 
        </div>
      </div>
  
      {/* ------reviews------ */}
      <h3 className='reviewsHeading'>REVIEWS</h3>
      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
        {product.reviews && 
        product.reviews.map((review)=> <ReviewCard review={review} /> )
        }
        </div>
      ):(
        <p className='noReviews'>No Reviews Yet</p>
      )}
      </Fragment>
      )}
    </Fragment>
  );
}

export default ProductDetails