import {createStore,combineReducers,applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'; //so that store can use reduxdevtools
import { productDetailsReducer, productReducer } from './reducers/productReducer';
import { forgotPasswordReducer, profileReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';


const reducer=combineReducers({
 products:productReducer,
 productDetails:productDetailsReducer,
 user:userReducer,
 profile:profileReducer,
 forgotPassword:forgotPasswordReducer,
 cart:cartReducer,
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