import React, { useEffect } from 'react'
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'
import { CART_ADD_ITEM } from '../constants/cartConstants'





export const CartScreen = (props) => {
    const productId = props.match.params.id

    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1
    console.log(qty);
    //esto mira en la barra de direcciones (?qty=1) y lo separa en un arreglo y cojo el numero despues del igual
    
    const dispatch = useDispatch()

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId,qty))
        }
        
     
    }, [dispatch,productId,qty])
    return (
        <div>
            cart
            
        </div>
    )
}
