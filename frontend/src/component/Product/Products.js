import React, { Fragment, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import './Products.css';
import {useDispatch,useSelector} from "react-redux";
import {clearErrors,getProduct} from "../../actions/productAction";
import  Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from "react-js-pagination";

const Products = ({match}) => {
  const dispatch=useDispatch();
  
  const[currentPage,setCurrentPage]=useState(1);
 
  const {products,loading,error,productsCount,resultPerPage} =useSelector(state=>state.products);

  
const {keyword}=useParams();

const setCurrentPageNo=(e)=>{
  setCurrentPage(e);
}

  useEffect(()=>{
   dispatch(getProduct(keyword,currentPage));
  },[dispatch,keyword,currentPage]);

  return (
    <Fragment>
      {loading ?( <Loader />) : (
        <Fragment>
          <h2 className='productsHeading'>Products</h2>
          <div className='products'>
            {products && 
            products.map((product)=>
              <ProductCard key={product._id} product={product}/>
            )}
          </div>

          {/* pagination */}
        {/* if resultsperpage < productsCount then only show pagination */}
          {resultPerPage<productsCount && (
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