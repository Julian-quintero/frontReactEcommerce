import React from 'react'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'



export const addToCart = (id,qty) => {
    return async (dispatch,state) =>{

        const res = await fetch(`/api/products`);
        const data = await res.json();

        dispatch({
            type:CART_ADD_ITEM,
            payload:{
                product:data._id,
                name:data.name,
                image:data.image,
                price:data.price,
                countInStock:data.countInSotck,
                qty
            }
        })

        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

    }
}
