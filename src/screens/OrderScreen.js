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
import { Link } from "react-router-dom";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../constants/orderConstants";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";




export const OrderScreen = (props) => {
  const orderId = props.match.params.id;

  const [sdkReady, setsdkReady] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay; //los dos puntos es para renombrar las variables

  const addPayPalScript = async () => {  
    const { data: clientId } = await axios.get("/api/config/paypal");
    return clientId
    
  };
 


  useEffect(() => {        


    if (!order || successPay) {

      dispatch({type:ORDER_PAY_RESET})

      //disparar esto asi no tengamos el success para que lo vea el usuario

      dispatch(getOrderDetails(orderId));
    }  

 
  }, [dispatch, orderId, successPay, order]);



  
 

  const successPaymentHandler= (paymentResult) =>{
    console.log(paymentResult);
   
    dispatch(payOrder(orderId, paymentResult))


  }

  return loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>{error}</p>
  ) : (
    <>
      <h1>Order {order._id}</h1>

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>shipping</h2>
              <p>
                <strong>addres</strong>
                {order.shippingAddress.address},{order.shippingAddress.city} ,
                {order.shippingAddress.postal} ,{order.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>payment method</h2>
              <p>{order.paymentMethod.paymentMethod}</p>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item>
            <h2>Order items</h2>
            {order.orderItems.length === 0 ? (
              <p>order empty</p>
            ) : (
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
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
                {order.isPaid ? <p>{order.paidAt}</p> : <p>Sin pagar</p>}
              </ListGroup.Item>

              <ListGroup.Item>
                {order.isDelivered ? <p>{order.deliveredAt}</p> : <p>Sin enviar</p>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
            
                 <ListGroup.Item>
               
              
                 <PayPalScriptProvider options={{ "client-id": "test" }}>

                    <PayPalButtons onApprove={(e)=>{successPaymentHandler(e)}}/>

                    </PayPalScriptProvider>
                   
                   </ListGroup.Item>
            
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
