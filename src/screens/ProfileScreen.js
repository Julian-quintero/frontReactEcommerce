import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails,updateUserProfile } from "../actions/userActions";
import { FormContainer } from "../components/FormContainer";

export const ProfileScreen = (props) => {
  let location = props.location;

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [message, setmessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails= useSelector((state) => state.userDetails);
  const { loading, error, user} = userDetails;

  const userLogin= useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  
  const userUpdateProfile= useSelector((state) => state.userUpdateProfile);
  const {success} = userUpdateProfile;


  useEffect(() => {
    if (!userInfo) {
      //si no estoy logeado voy a redirecion
      props.history.push('/login');
    }else{
        if (!user.name){
              dispatch(getUserDetails('profile'))
        }else{
            setname(user.name)
            setemail(user.email)

        }
    }
  }, [props.history, userInfo, dispatch,user]);
  const submitHandler = (e) => {
    e.preventDefault();  

    if (password !== confirmPassword) {
      setmessage("password error");
    } else {
     
        dispatch(updateUserProfile({id:user._id,name,email,password}))
   
    }
  };

  return (
    <FormContainer>

      
      <Row >
        <Col md={3}>

        <h1>USER PROFILE</h1>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      {success && <p>profile updated</p>}


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
          UPDATE
        </Button>
      </Form>     
    
        </Col>
        <Col md={9}>
            <h2>my orders</h2>
        </Col>
      </Row>
    </FormContainer>
  );
};
