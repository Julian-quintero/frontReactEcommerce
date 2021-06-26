import React, { useEffect } from 'react'
import { Button, Card, Col, Form, ListGroup, Row, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'
import { CART_ADD_ITEM } from '../constants/cartConstants'





export const CartScreen = (props) => {
    const productId = props.match.params.id

    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1

    //esto mira en la barra de direcciones (?qty=1) y lo separa en un arreglo y cojo el numero despues del igual

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const { cartItems } = cart
    console.log(cartItems);

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }


    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        console.log('remove')
    }

    const checkoutHandler = () => {
        props.history.push('/login?redirect=shipping')
        //si no esta logeado va a login sino va a shipping
    }
    return (
        <Row>
            <Col md={8}>
                {cartItems.length === 0 ? <Link to='/'>no hay objetos en el carro</Link> : (

                    <ListGroup variant="flush">
                        {cartItems.map(item => (
                            
                            <ListGroup.Item key={item.product}>

                                <Row>
                
                                    <Col md={2}>

                                        <Image src={item.image} alt={item.name} fluid rounded></Image>

                                    </Col>
                                    <Col me={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        {item.price}
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control as='select' value={item.qty} onChange={(e) => { 
                                            dispatch(
                                                addToCart(item.product, Number(e.target.value))) }}>
                                            {[...Array(item.countInStock).keys()].map(x => (                                        
                                                <option key={x + 1} >{x + 1}</option>
                                            ))
                                            }

                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type="button" variant='light' onClick={() => removeFromCartHandler(item.product)}>borrar</Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}

                    </ListGroup>
                )}

            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup.Item>
                        <h3>
                        SUBTOTAL: 
                        {cartItems.reduce((acc,item)=>acc+item.qty,0)} {
                            //0 es donde inicia
                        }

                        </h3>
                        ${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
                       
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='button' className='btn-block' disabled={cartItems.length===0} onClick={checkoutHandler}>boton</Button>
                        </ListGroup.Item>
                </Card>
            </Col>
      
        </Row>
    )
}
