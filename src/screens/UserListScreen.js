import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, register,deleteUser } from "../actions/userActions";
import { FormContainer } from "../components/FormContainer";
import { LinkContainer } from "react-router-bootstrap";

export const UserListScreen = ({ history}) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;

  const userDelete = useSelector(state => state.userDelete)
  const { success:successDelete} = userDelete;


  useEffect(() => {

    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
      
    } else {
      history.push('/login')
    }


    
  }, [dispatch,history,successDelete]);

  const deleteHandler = (id) => {

      if (window.confirm('are you sure')) {
        dispatch(deleteUser(id))

        
      }
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <p>loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
