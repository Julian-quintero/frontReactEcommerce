import React from "react";
import {LinkContainer  } from "react-router-bootstrap";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

export default function Header() {
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
            <LinkContainer to="/">
              <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/">
              <Nav.Link ><i className="fas fa-user"></i>Login</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
