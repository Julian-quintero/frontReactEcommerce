import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { orderCreateReducers,orderDetailsReducers,orderPayReducer } from "./reducers/orderReducers";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer
} from "./reducers/userReducers";






const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList:userListReducer,
  userDelete:userDeleteReducer,
  userUpdate:userUpdateReducer,
  orderCreate: orderCreateReducers,
  orderDetails:orderDetailsReducers,
  orderPay:orderPayReducer,

});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {}

const initialState = {
  cart: { cartItems: cartItemsFromLocalStorage,shippingAddress: shippingAddressFromLocalStorage },
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
