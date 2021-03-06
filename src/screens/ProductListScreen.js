import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts,deleteProduct,createProduct } from "../actions/productActions";
import { FormContainer } from "../components/FormContainer";
import { LinkContainer } from "react-router-bootstrap";
import { PRODUCT_CREATE_RESET, PRODUCT_DETAILS_RESET } from "../constants/productsConstants";

export const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);

  const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);

  const { loading:loadingCreate, error:errorCreate, success:successCreate,product:createdProduct } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({type:PRODUCT_CREATE_RESET})
  
    if (!userInfo.isAdmin) {
      history.push('/login')
     
    }
    
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    }else{
      dispatch(listProducts());
    }
  }, [dispatch, history, userInfo,successDelete,successCreate,createdProduct]);

  const deleteHandler = (id) => {
    if (window.confirm("are you sure")) {
      dispatch(deleteProduct(id))
    }
  };

  const createProductHandler= () =>{
    dispatch(createProduct())
  }
  

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>products</h1>
        </Col>
        <Col className="text-right">
          <Button onClick={createProductHandler}>
            <i className="fa fa-plus"></i>Create product
          </Button>
        </Col>
      </Row>
      <h1>Users</h1>

      


      {loadingDelete && <p>loading...</p>}
      {errorDelete && <p>{errorDelete}</p>}

      {loadingCreate && <p>loading...</p>}
      {errorCreate && <p>{errorCreate}</p>}

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
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                    {product.category}
            
                </td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
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
