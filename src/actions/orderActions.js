import axios from 'axios'
import {
  ORDER_CREATE_REQUEST, 
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from '../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'


export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userInfo.access}`
      }
    }    

    const { data } = await axios.post(
      `/api/orders/add/`,
      order,
      config
    );
    
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data
    });

    dispatch({
      type: CART_CLEAR_ITEMS,
      //payload: data
    });

    localStorage.removeItem('cartItems');
  }
  catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message
    });
  }
};


export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userInfo.access}`
      }
    }    

    const { data } = await axios.get(
      `/api/orders/${id}/`,
      config
    );
    
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data
    });
  }
  catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message
    });
  }
};


export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userInfo.access}`
      }
    }    

    const { data } = await axios.get(
      `/api/orders/myorders/`,
      config
    );
    
    dispatch({
      type: MY_ORDER_LIST_SUCCESS,
      payload: data
    });
  }
  catch (error) {
    dispatch({
      type: MY_ORDER_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message
    });
  }
};


export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userInfo.access}`
      }
    }    

    const { data } = await axios.get(
      `/api/orders/`,
      config
    );
    
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data
    });
  }
  catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message
    });
  }
};


export const payOrder = (id, paymentResults) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userInfo.access}`
      }
    }    

    const { data } = await axios.put(
      `/api/orders/${id}/pay/`,
      paymentResults,
      config
    );
    
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data
    });
  }
  catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message
    });
  }
};


export const deliverOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userInfo.access}`
      }
    }    

    const { data } = await axios.put(
      `/api/orders/${id}/deliver/`,
      {}, /* Required to avoid: 401 (Unauthorized) */
      config
    );
    
    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data
    });
  }
  catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message
    });
  }
};
