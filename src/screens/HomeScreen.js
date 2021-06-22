import React,{useState,useEffect} from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import products from "../products";
import { useDispatch,useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";


export default function HomeScreen() {

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading,error,products} = productList 



 // const [products, setproducts] = useState([])

//  async function fetchProducts (params) {
//   const res =  await fetch("/api/products")
//   const data = await res.json();
//   setproducts(data)
//  }

  useEffect(()=>{
   //fetchProducts()
   dispatch(listProducts())
  },[dispatch])


  return (
    <>
      <h1>ultimos productos</h1>
      {loading ? <h1>loading...</h1> : error ? <h3>{error}</h3> :

<Row>
{products.map((product) => (
  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
    <Product product={product}></Product>
  </Col>
))}
</Row>
      
      }
   
    </>
  );
}
