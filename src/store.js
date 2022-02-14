import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { 
  productListReducer, 
  productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { 
  userLoginReducer, 
  userRegisterReducer, 
  userDetailsReducer, 
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer } from './reducers/userReducers'
import { 
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrderListReducer } from './reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrderList: myOrderListReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});

const cartItemFromStorage = localStorage.getItem('cartItems') ?
  JSON.parse( localStorage.getItem('cartItems') ) : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
  JSON.parse( localStorage.getItem('shippingAddress') ) : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ?
  JSON.parse( localStorage.getItem('paymentMethod') ) : null

const userLoginFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse( localStorage.getItem('userInfo') ) : null

const initialState = {
  cart: { 
    cartItems: cartItemFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage 
  },
  userLogin: { userInfo: userLoginFromStorage },
};

const midleware = [thunk];

const store = createStore( 
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...midleware)) 
);

export default store;