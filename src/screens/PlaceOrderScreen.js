import React, { useEffect, useState } from "react";
import {
  LinkContainer,
  Form,
  Col,
  Button,
  Image,
  ListGroup,
  Card,
  Row,
} from "react-bootstrap";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import { logout } from "../actions/userActions";
import { CheckoutSteps } from "../components/CheckoutSteps";
import { FormContainer } from "../components/FormContainer";
import {Link} from 'react-router-dom'
import { createOrder } from "../actions/orderActions";





export const PlaceOrderScreen = ({ history}) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()

  //calculate prices
  cart.itemsPrice = cart.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0)
  cart.shippingPrice = cart.itemsPrice<100?0:100
  cart.taxPrice=Number((0.15*cart.itemsPrice.toFixed(2)))
  cart.totalPrice = Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice) + Number(cart.itemsPrice)

  const orderCreate = useSelector((state) => state.orderCreate)
  const {order,success,error} = orderCreate

  useEffect(() => {

    if (success) {
      history.push(`/order/${order._id}`)
      
    }
    //eslint-disable-next-line
    

  }, [history,success])
  const placeholderHandler = () => {
    dispatch(createOrder({
      orderItems:cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod.paymentMethod, 
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice

    }))
      
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>shipping</h2>
              <p>
                <strong>addres</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city} ,
                {cart.shippingAddress.postal} ,{cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>payment method</h2>
              <p>             
               
                {cart.paymentMethod.paymentMethod}
              </p>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item>
            <h2>Order items</h2>
            {cart.cartItems.length === 0 ? (
              <p>cart empty</p>
            ) : (
              <ListGroup variant="flush">
                {cart.cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        ></Image>
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty} * {item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>order summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                       <Col>items</Col>
                       <Col>${cart.itemsPrice}</Col>
                       </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                       <Col>shipping</Col>
                       <Col>${cart.shippingPrice}</Col>
                       </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                       <Col>tax</Col>
                       <Col>${cart.taxPrice}</Col>
                       </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                       <Col>total</Col>
                       <Col>${cart.totalPrice}</Col>
                       </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {error && <p>{error}</p>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='button' className='btn-block' disabled={cart.cartItems===0} onClick={placeholderHandler}>Place order</Button>
               
                    </ListGroup.Item>
                

                </ListGroup>
            </Card>
        </Col>
      </Row>
    </>
  );
};
