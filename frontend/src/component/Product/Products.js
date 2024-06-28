import React, { Fragment, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import './Products.css';
import {useDispatch,useSelector} from "react-redux";
import {clearErrors,getProduct} from "../../actions/productAction";
import  Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import {useAlert} from "react-alert";
import Typography from "@material-ui/core/Typography"; 
import MetaData from '../layout/MetaData';



const categories=[
 "laptop",
 "footwear",
 "bottom",
 "tops",
 "attire",
 "camera",
 "smartphones",
];

const Products = () => {
  const dispatch=useDispatch();
  const alert=useAlert();
  
  const[currentPage,setCurrentPage]=useState(1);
  const[price,setPrice]=useState([0,25000]);
  const[category,setCategory]=useState("");
  const[ratings,setRatings]=useState(0);
 
  const {products,loading,error,productsCount,resultPerPage,filteredProductsCount} =useSelector(state=>state.products);

  
const {keyword}=useParams();

const setCurrentPageNo=(e)=>{
  setCurrentPage(e);
}

const priceHandler=(event,newPrice)=>{
  setPrice(newPrice);
}

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
   dispatch(getProduct(keyword,currentPage,price,category,ratings));
  },[dispatch,keyword,currentPage,price,category,ratings,alert,error]);

  let count =filteredProductsCount;

  return (
    <Fragment>
      {/* products */}
      {loading ?( <Loader />) : (
        <Fragment>
          <MetaData title="PRODUCTS--ECOMMERCE"/>
          <h2 className='productsHeading'>Products</h2>
          <div className='products'>
            {products && 
            products.map((product)=>
              <ProductCard key={product._id} product={product}/>
            )}
          </div>

          {/* ---------filters---------- */}
          <div className='filterBox'>
                      {/* price */}
                      <Typography>Price</Typography>
                      <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby='range-slider'
                        min={0}
                        max={25000}
                        
                      />
          
                      {/* categories */}
                      <Typography>Categories</Typography>
                      <ul className="categoryBox">
                        {categories.map((category)=>(
                          <li
                             className="category-link"
                             key={category}
                             onClick={()=>setCategory(category)}
                          >   
                          {category}
                          </li>
                        ))}
                      </ul>
          
                      {/*ratings */}
                      <fieldset>
                        <Typography component="legend">Ratings Above</Typography>
                        <Slider 
                         value={ratings}
                         onChange={(e,newRating)=>{
                          setRatings(newRating);
                         }}
                         aria-labelledby="continuos-slider"
                         valueLabelDisplay='auto'
                         min={0}
                         max={5}
                        
                        />
                      </fieldset>
            </div>
          
         


          {/* pagination */}
        {/* if resultsperpage < productsCount then only show pagination */}
          {resultPerPage<count && (
                <div className='paginationBox'>
                <Pagination 
                 activePage={currentPage}
                 itemsCountPerPage={resultPerPage}
                 totalItemsCount={productsCount}
                 onChange={setCurrentPageNo}
                 nextPageText="Next"
                 prevPageText="Prev"
                 firstPageText="1st"
                 lastPageText="Last"
                 itemClass="page-item"
                 linkClass="page-link"
                 activeClass="pageItemActive"//for pagination-box
                 activeLinkClass="pageLinkActive" //for text inside pagination box
                
                />
              </div>
          )}
          
        </Fragment>
      )}
    </Fragment>
  );
}

export default Products