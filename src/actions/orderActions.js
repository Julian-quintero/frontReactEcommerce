import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../constants/orderConstants";



export const createOrder = (order) => {
    console.log(order);
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
  
        console.log("data", data);  
      
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
  