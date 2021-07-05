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



export const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
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
                <strong>Method:</strong>
                {cart.paymentMethod}
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
                       <Col>items</Col>
                    </ListGroup.Item>

                </ListGroup>
            </Card>
        </Col>
      </Row>
    </>
  );
};
