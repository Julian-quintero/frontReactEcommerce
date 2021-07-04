import {createStore,combineReducers,applyMiddleware,compose} from 'redux'

import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers'
import { productListReducer,productDetailsReducer } from './reducers/productReducers'
import { userDetailsReducer, userLoginReducer,userRegisterReducer,userUpdateProfileReducer } from './reducers/userReducers'



const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer


})



const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


const initialState={
   cart:{cartItems:cartItemsFromLocalStorage},
   userLogin:{userInfo:userInfoFromLocalStorage}

}


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;



const store = createStore(reducer,initialState,
   composeEnhancers(
      applyMiddleware(thunk)
   )
   
    )

    export default store