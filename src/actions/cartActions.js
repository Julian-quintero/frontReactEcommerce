import React from 'react'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'



export const addToCart = (id,qty) => {
    return async (dispatch,getState) =>{

        const res = await fetch(`/api/products/${id}`);
        //60c6b1216d0c822f7c0c15d9
        const data = await res.json();

        dispatch({
            type:CART_ADD_ITEM,
            payload:{
                product:data._id,
                name:data.name,
                image:data.image,
                price:data.price,
                countInStock:data.countInStock,
                qty
            }
        })

        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

    }
}

export const removeFromCart = (id) => {
    return(dispatch,getState)=>{
        dispatch({
            type:CART_REMOVE_ITEM,
            payload:id
        })

        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

    }
}
