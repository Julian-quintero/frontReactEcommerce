import React from "react";
import {LinkContainer  } from "react-router-bootstrap";
import { Container, Nav, Navbar, Button, NavDropdown } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../actions/userActions";



export default function Header() {

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const logoutHandler = () =>{
    dispatch(logout())
  }
  return (
    <header>
     
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <LinkContainer to="/">
          <Navbar.Brand>RProshop</Navbar.Brand>
          </LinkContainer>
         
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto"> {/*margin left*/ }
            <LinkContainer to="/cart">
              <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
              </LinkContainer>
              {userInfo ? (

              <NavDropdown title={userInfo.name}>
                <LinkContainer to="/profile">

                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>

              </NavDropdown>
              
              ) 
              
              :

              <LinkContainer to="/login">
              <Nav.Link ><i className="fas fa-user"></i>Login</Nav.Link>
              </LinkContainer>
          
              
              }
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
