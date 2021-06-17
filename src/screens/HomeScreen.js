import React,{useState,useEffect} from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import products from "../products";

export default function HomeScreen() {


 const [products, setproducts] = useState([])

 async function fetchProducts (params) {
  const res =  await fetch("/api/products")
  const data = await res.json();
  setproducts(data)
 }

  useEffect(()=>{
   fetchProducts()
  },[])

  return (
    <>
      <h1>ultimos productos</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
    </>
  );
}
