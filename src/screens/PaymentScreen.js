import React, { useEffect, useState } from "react";
import { LinkContainer, Form,Col } from "react-bootstrap";
import { Container, Nav, Navbar, Button, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import { logout } from "../actions/userActions";
import { CheckoutSteps } from "../components/CheckoutSteps";
import { FormContainer } from "../components/FormContainer";

export const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

if (!shippingAddress) {
    history.push("/shipping")
    
}

  const [paymentMethod, setpaymentMethod] = useState('paypal')
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod({paymentMethod}));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <h1>payment method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label as='legend'>select method</Form.Label>
          <Col>
          <Form.Check type='radio' label='paypal or credit card' id='paypal' name='paymentMethod' value='paypal' checked onChange={(e)=>setpaymentMethod(e.target.value)}></Form.Check>
          </Col>
 
        </Form.Group>    
    
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};
