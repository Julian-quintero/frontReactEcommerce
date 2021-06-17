import {createStore,combineReducers,applyMiddleware,compose} from 'redux'

import thunk from 'redux-thunk'
import { productListReducer,productDetailsReducer } from './reducers/productReducers'



const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer 

})

const initialStore={}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;



const store = createStore(reducer,
   composeEnhancers(
      applyMiddleware(thunk)
   )
   
    )

    export default store