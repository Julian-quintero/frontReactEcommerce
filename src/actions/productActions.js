import axios from "axios";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUESTS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUESTS,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUESTS,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUESTS,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUESTS,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/productsConstants";

export const listProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_LIST_REQUEST,
      });

      const res = await fetch(`/api/products`);
      const data = await res.json();

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listProductsDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_DETAILS_REQUESTS,
      });

      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();

      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DELETE_REQUESTS });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      await axios.delete(`/api/products/${id}`, config);

      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
      });

      //me logeo al registrarme
    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};


export const createProduct = () => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUESTS });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
     const {data} =  await axios.post(`/api/products`,{}, config); //post pero no enviamos data

      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload:data
      });

      //me logeo al registrarme
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUESTS });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type':'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
     const {data} =  await axios.put(`/api/products/${product._id}`,product, config); //post pero no enviamos data

      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload:data
      });

      //me logeo al registrarme
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};


export const createProductReview = (productId, review) => {
  // el objeto review tiene el review y un comentario
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUESTS });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type':'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
     await axios.post(`/api/products/${productId}/reviews`,review, config); //post pero no enviamos data

      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS
      });

      //me logeo al registrarme
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
