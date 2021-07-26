import axios from "axios";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_SUCCESS,ORDER_DETAILS_REQUEST, ORDER_PAY_FAIL, ORDER_PAY_SUCCESS, ORDER_PAY_REQUEST, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL } from "../constants/orderConstants";



export const createOrder = (order) => {

    return async (dispatch, getState) => {
      dispatch({ type: ORDER_CREATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      try {
        const res = await fetch(`/api/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
          body: JSON.stringify(
            order         
          ),
        });
  
        const data = await res.json();

        if (data.message) {
            throw new Error(data.message); //esto es provicional, lo puse por que habia un error hay que solucionar
        }
  
      
      
        dispatch({
          type: ORDER_CREATE_SUCCESS,
          payload: data,
        });
  
        //me logeo al registrarme
      } catch (error) {
        dispatch({
          type: ORDER_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
  };

  export const getOrderDetails = (id) => {
    
 
    return async (dispatch, getState) => {
      dispatch({ type: ORDER_DETAILS_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      try {
        const res = await fetch(`/api/orders/${id}`, {
          method: "GET",
          headers: {     
            Authorization: `Bearer ${userInfo.token}`,
          }  
        });
  
        const data = await res.json();

        if (data.message) {
            throw new Error(data.message); //esto es provicional, lo puse por que habia un error hay que solucionar
        }  
       
      
        dispatch({
          type: ORDER_DETAILS_SUCCESS,
          payload: data,
        });
  
        //me logeo al registrarme
      } catch (error) {
        dispatch({
          type: ORDER_DETAILS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
  };

  export const payOrder = (orderId,paymentResult) => {


    const paymentResult2 = { 
      id:'123',
      status:'paid',
      update_time:'bla',
      email_address:'123346@gmal.com'
    }

 
    return async (dispatch, getState) => {
      dispatch({ type: ORDER_PAY_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();

      const config = { headers: {    
        'Content-Type':'application/json', 
        Authorization: `Bearer ${userInfo.token}`        
      }

      }

      try {

        const {data } = await axios.put(`/api/orders/${orderId}/pay`,paymentResult2,config)    
  


        if (data.message) {
            throw new Error(data.message); //esto es provicional, lo puse por que habia un error hay que solucionar
        }
  
  
      
        dispatch({
          type: ORDER_PAY_SUCCESS,
          payload: data,
        });         
  
        //me logeo al registrarme
      } catch (error) {
        dispatch({
          type: ORDER_PAY_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
  };

  export const listOrders = () => {
    
 
    return async (dispatch, getState) => {
      dispatch({ type: ORDER_LIST_REQUEST});
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      try {
        const res = await fetch(`/api/orders`, {
          method: "GET",
          headers: {     
            Authorization: `Bearer ${userInfo.token}`,
          }  
        });
  
        const data = await res.json();

        if (data.message) {
            throw new Error(data.message); //esto es provicional, lo puse por que habia un error hay que solucionar
        }  
       
      
        dispatch({
          type: ORDER_LIST_SUCCESS,
          payload: data,
        });
  
        //me logeo al registrarme
      } catch (error) {
        dispatch({
          type: ORDER_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
  };
  
  