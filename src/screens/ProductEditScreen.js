import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails,updateUser } from "../actions/userActions";
import { FormContainer } from "../components/FormContainer";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import { listProductsDetails,updateProduct } from "../actions/productActions";
import { PRODUCT_DETAILS_RESET, PRODUCT_UPDATE_RESET } from "../constants/productsConstants";




export const ProductEditScreen = (props) => {
  let location = props.location;

  let history = props.history

  const productId = props.match.params.id

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0)
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('') 

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product} = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate} = productUpdate;




 


  useEffect(() => {


    if (successUpdate) {
        dispatch({type: PRODUCT_UPDATE_RESET})
        dispatch({type:PRODUCT_DETAILS_RESET})
        history.push('/admin/productlist')
        
    }else{

        if(product===undefined || !product.name || product._id !== productId ) {
            //si no existe o si no hace match con la url
            console.log('ENTRE');
            dispatch(listProductsDetails(productId))
            
        }else{
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
          
  
        }

    }

       


    }


   
  , [dispatch,productId,history,product,successUpdate]);
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,

    }))

  };

  return (
      <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>go back
      </Link>
      
    <FormContainer>
      <h1>edit product</h1>
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
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Form.Group controlId="Price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="Image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Price"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="Brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Price"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          
          <Form.Group controlId="CountInStock">
            <Form.Label>CountInStock</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Price"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>
  

          <Form.Group controlId="Category">
            <Form.Label>category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Price"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          
          <Form.Group controlId="description">
            <Form.Label>description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Price"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
