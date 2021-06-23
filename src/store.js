import {createStore,combineReducers,applyMiddleware,compose} from 'redux'

import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers'
import { productListReducer,productDetailsReducer } from './reducers/productReducers'



const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer

})

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState={
   cart:{cartItems:cartItemsFromLocalStorage}

}


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;



const store = createStore(reducer,initialState,
   composeEnhancers(
      applyMiddleware(thunk)
   )
   
    )

    export default store