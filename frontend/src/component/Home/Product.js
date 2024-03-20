import React from 'react';
import {Link} from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

//options for stars
const options={
  edit:false,//iski vajeh se stars select nhi kr paenge
  color:"rgba(20,20,20,0.1)",
  activeColor:"tomato",//jo select krenge stars unka color
  size:window.innerWidth<600 ? 20: 25,
  value:2.5,
  isHalf:true,
};
const Product = ({product}) => {
  return (
    <Link className='productCard' to={product._id}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>

      <div>
        <ReactStars {...options} />
        <span>(256 reviews)</span>
      </div>
      <span>{product.price}</span>
    </Link>
  );
}

export default Product