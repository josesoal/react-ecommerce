import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducer, productDetailsReducer } from './reducers/productReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
});
const initialState = {};
const midleware = [thunk];

const store = createStore( reducer, initialState, 
  composeWithDevTools(applyMiddleware(...midleware)) );

export default store;