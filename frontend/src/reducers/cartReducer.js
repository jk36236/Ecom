import { ADD_TO_CART ,REMOVE_CART_ITEM} from "../constants/cartConstants";



export const cartReducer=(state={cartItems: []},action)=>{
  switch(action.type){
    case ADD_TO_CART:
    
      const item= action.payload;
       //check whether item(which we want to add to cart) already exists in cart
       //product is used as reference of productid
      const isItemExist=state.cartItems.find(
        (i)=>i.product === item.product
      );
      
      if(isItemExist){
        //exists,therefore find it in cart and replace it with new one selected
        return{
          ...state,
          cartItems:state.cartItems.map((i)=>
          i.product === isItemExist.product ? item : i
          ),
        }
      }else{
        //does not exists,therefore add in cart
       return{
        ...state,
        cartItems:[...state.cartItems,item],
       }
      }

    case REMOVE_CART_ITEM:
      return{
        ...state,
        cartItems:state.cartItems.filter((i)=>
        i.product !== action.payload
        ),
      }
    default:
      return state
}
}