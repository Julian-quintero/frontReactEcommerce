import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button,Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductsDetails } from "../actions/productActions";

export default function ProductScreen(props) {
  // const [product, setproduct] = useState({})

  //  async function fetchProduct (props) {
  //   const res =  await fetch(`/api/products/${props.match.params.id}`)
  //   const data = await res.json()
  //   setproduct(data)
  //  }

  const [qty, setQty] = useState(0)

  


  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product} = productDetails;
  

  useEffect(() => {
    //fetchProduct(props)
    dispatch(listProductsDetails(props.match.params.id));
  }, [props]);

  const addToCartHandler=()=>{
    props.history.push(`/cart/${props.match.params.id}?qty=${qty+1}`)
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
      )}
    </div>
  );
}
