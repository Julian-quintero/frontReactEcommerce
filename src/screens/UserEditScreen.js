import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails,updateUser } from "../actions/userActions";
import { FormContainer } from "../components/FormContainer";
import { USER_UPDATE_RESET } from "../constants/userConstants";



export const UserEditScreen = (props) => {
  let location = props.location;

  let history = props.history

  const userId = props.match.params.id

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [isAdmin, setisAdmin] = useState()
 

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user} = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate} = userUpdate;


  useEffect(() => {

    if (successUpdate) {
        dispatch({type:USER_UPDATE_RESET})
        history.push('/admin/userlist')
    }else{

        if (!user.name || user._id !== userId) {
            //si no existe o si no hace match con la url
            dispatch(getUserDetails(userId))
            
        }else{
            setname(user.name)
            setemail(user.email)
            setisAdmin(user.isAdmin)
  
        }


    }


   
  }, [user,dispatch,userId,successUpdate,history]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({_id:userId,name,email,isAdmin}))
  };

  return (
      <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>go back
      </Link>
      
    <FormContainer>
      <h1>eDIT USER</h1>

      {loadingUpdate && <p>loading...</p>}
      {errorUpdate && <p>{errorUpdate}</p>}

      {loading ? <p>...loading</p> : error ? <p>{error}</p> : (
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
  
          <Form.Group controlId="isadmin">
            <Form.Control
              type="checkbox"
              label='is Admin'
              checked={isAdmin}
              onChange={(e) => setisAdmin(e.target.checked)}
            ></Form.Control>
          </Form.Group>
  
  
          <Button type="submit" variant="primary">
           Update
          </Button>
        </Form>
    

      )}
      
    </FormContainer>

      </>
  );
};
