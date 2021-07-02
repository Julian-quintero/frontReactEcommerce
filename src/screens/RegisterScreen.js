import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { FormContainer } from "../components/FormContainer";

export const RegisterScreen = (props) => {
  let location = props.location;

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [message, setmessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      //si estoy logeado voy a redirecion
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    //DISPATCH REGISTER

    if (password !== confirmPassword) {
      setmessage("password error");
    } else {
      console.log("regitrado");
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign UP</h1>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an account?
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
