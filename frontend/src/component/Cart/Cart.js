import React, { Fragment } from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard'
import {useSelector,useDispatch} from "react-redux"
import {addItemsToCart,removeItemsFromCart} from '../../actions/cartAction'
import {Typography} from '@material-ui/core'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
import {Link,useNavigate} from "react-router-dom"
import MetaData from '../layout/MetaData'


const Cart = () => {
 const dispatch=useDispatch();
 const navigate=useNavigate();


 const{cartItems} = useSelector((state)=>state.cart);
  
 const increaseQuantity=(id,quantity,stock)=>{
  if(quantity >= stock){
    return;
  }
  const newQty= quantity + 1;
  dispatch(addItemsToCart(id,newQty));
 }

 const decreaseQuantity=(id,quantity)=>{
  if(quantity <= 1){
    return;
  }
  const newQty=quantity - 1;
  dispatch(addItemsToCart(id,newQty));
 }

 const deleteCartItems=(id)=>{
  dispatch(removeItemsFromCart(id));
 }

 const checkOutHandler=()=>{
  navigate('/login?redirect=/shipping');
 }

  return (
  <Fragment>
    <MetaData title="CART" />
    {cartItems.length === 0 ? (
      // when cart is empty
      <div className='emptyCart'>
        <RemoveShoppingCartIcon />
        <Typography>No Product in Your Cart</Typography>
        <Link to='/products'>View Products</Link>
      </div>
    ):(
      // when cart is not empty
      <Fragment>
      <div className='cartPage'>
        <div className='cartHeader'>
          <p>Product</p>
          <p>Quantity</p>
          <p>SubTotal</p>
        </div>
{cartItems && cartItems.map((item)=>(
  
  <div className='cartContainer' key={item.product}>
  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
  <div className='cartInput'>
    <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</button>
    <input type="number" value={item.quantity} readOnly/>
    <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
  </div>

  <p className='cartSubtotal'>
    {`Rs.${item.price * item.quantity}`}
  </p>
</div>
))}

{/* -------gross total-------- */}
        <div className='cartGrossTotal'>
          {/*  div empty -template grid columns ko fill krne ke liye-1st column ko
           */}
          <div></div>
          <div className='cartGrossTotalBox'>
            <p>Gross Total</p>
            <p>{`Rs.${cartItems.reduce(
              (acc,item)=> acc + item.quantity * item.price,
              0
            )}`}</p>
          </div>
      
           <div></div>
           <div className='checkOutBtn'>
            <button onClick={checkOutHandler}>Check Out</button>
           </div>
        </div>
      </div>
    </Fragment>
    )}
  </Fragment>
    )
}

export default Cart