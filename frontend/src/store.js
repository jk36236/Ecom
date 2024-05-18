import {createStore,combineReducers,applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'; //so that store can use reduxdevtools
import { adminProductReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, reviewReducer } from './reducers/productReducer';
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer';


const reducer=combineReducers({
 products:productReducer,
 productDetails:productDetailsReducer,
 user:userReducer,
 profile:profileReducer,
 forgotPassword:forgotPasswordReducer,
 cart:cartReducer,
 newOrder:newOrderReducer,
 myOrders:myOrdersReducer,
 orderDetails:orderDetailsReducer,
 newReview:newReviewReducer,
 newProduct:newProductReducer,
 product:adminProductReducer,
 allOrders:allOrdersReducer,
 order:orderReducer,
 allUsers:allUsersReducer,
 userDetails:userDetailsReducer,
 review:reviewReducer,
 productreviews:productReviewsReducer,
});

//if anything in localstorage set it in cart initialstate otherwise empty
let initialState={
  cart:{
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    shippingInfo:localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : [],
  },
};

const middleware=[thunk];

const store=createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;