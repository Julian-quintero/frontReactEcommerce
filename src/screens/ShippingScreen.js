import React, { useEffect, useState } from "react";
import { LinkContainer,Form } from "react-bootstrap";
import { Container, Nav, Navbar, Button, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import { logout } from "../actions/userActions";
import { CheckoutSteps } from "../components/CheckoutSteps";
import { FormContainer } from "../components/FormContainer";

export const ShippingScreen = ({ history }) => {

    

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    


  const [address, setaddress] = useState(shippingAddress.address);
  const [city, setcity] = useState(shippingAddress.city);
  const [postal, setpostal] = useState(shippingAddress.postal);
  const [country, setcountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();  
    dispatch(saveShippingAddress({address,city,postal,country}))
    history.push('/payment')
  }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2></CheckoutSteps>
      <h1>shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setaddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>city</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setcity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postal">
          <Form.Label>postal</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal"
            value={postal}
            required
            onChange={(e) => setpostal(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setcountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};
