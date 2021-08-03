import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button,Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductsDetails, createProductReview } from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productsConstants";



export default function ProductScreen(props) {
  // const [product, setproduct] = useState({})

  //  async function fetchProduct (props) {
  //   const res =  await fetch(`/api/products/${props.match.params.id}`)
  //   const data = await res.json()
  //   setproduct(data)
  //  }

  const match = props.match

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  


  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);

  const productReviewCreate = useSelector((state) => state.productReviewCreate);

  const { success:successProductReview, error: errorProductReview} = productReviewCreate;  

  const { loading, error, product} = productDetails;


  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo} = userLogin;


  

  useEffect(() => {
    //fetchProduct(props)
    if (successProductReview) {
      alert('review submmittted')
      setRating(0)
      setComment('')
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
      
    }
    dispatch(listProductsDetails(props.match.params.id));
  }, [props,match,successProductReview,dispatch]);

  const addToCartHandler=()=>{
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(match.params.id,{rating,comment}))
  }

  return (
    <div>
      <Link className="btn btn-dark my-3" to="/">
        go back
      </Link>

      {loading ? (
        <h1>loading</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description : ${product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>price:</Col>
                    <Col>
                      <strong>$ {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "in Stock" : "no hay"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock>0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                      <Form.Control as='select' value={qty} onChange={(e)=>{setQty(e.target.value)}}>
                       {[...Array(product.countInStock).keys()].map(x=>(
                         console.log(x),
                          <option key={x+1} >{x+1}</option>
                        ))
                      }

                      </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}



                <ListGroup.Item>
                  <Button
                  onClick={addToCartHandler}
                    className="btn btn-dark"
                    type="button"
                    disable={product.countInStock === 0}
                  >
                    add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <h2>review</h2>
      {product.reviews.length === 0 && <p>No Reviews</p>}
      <ListGroup variant='flush'>
        {product.reviews.map(review => (
         
          <ListGroup.Item key={review._id}>
            <strong>{review.name}</strong>
          <Rating value={review.rating}></Rating>
          <p>{review.createdAt.substring(0, 10)}</p>
          <p>{review.comment}</p>

          </ListGroup.Item>
        ))}
        <ListGroup.Item>
          <h2>write review</h2>
      {errorProductReview && <p>{errorProductReview}</p>}
          {userInfo ? (

            <Form onSubmit={submitHandler}>
              <Form.Group controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control as='select' value={rating} onChange={(e)=> setRating(e.target.value)}>
                  <option value=''>
                    select....
                  </option>
                  <option value='1'>
                    1-bad
                  </option>
                  <option value='2'>
                    2-Poor
                  </option>
                  <option value='3'>
                    3-failr
                  </option>
                  <option value='4'>
                    4-good
                  </option>
                  <option value='5'>
                    5-excelente
                  </option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="comment">
                <Form.Label>comment

                </Form.Label>
                <Form.Control as='textarea' row="3" value={comment} onChange={(e)=>setComment(e.target.value)}></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">submit</Button>
            </Form>


          ) : <p>please log in <Link to="/login"></Link> </p>}
        </ListGroup.Item>
      </ListGroup>
          </Col>
        </Row>
        </>
      )}
    </div>
  );
}
