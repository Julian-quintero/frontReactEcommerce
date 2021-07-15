import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import { CartScreen } from "./screens/CartScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { ShippingScreen } from "./screens/ShippingScreen";
import { PaymentScreen } from "./screens/PaymentScreen";
import { PlaceOrderScreen } from "./screens/PlaceOrderScreen";
import { OrderScreen } from "./screens/OrderScreen";
import { UserListScreen } from "./screens/UserListScreen";



function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>
        

        <main className="py-3">
          <Container>
          <Route path="/login" component={LoginScreen} exact></Route>
          <Route path="/register" component={RegisterScreen} exact></Route>
          <Route path="/profile" component={ProfileScreen} exact></Route>
          <Route path="/shipping" component={ShippingScreen} exact></Route>
          <Route path="/payment" component={PaymentScreen} exact></Route>
          <Route path="/placeorder" component={PlaceOrderScreen} exact></Route>
          <Route path="/order/:id" component={OrderScreen} exact></Route>
          <Route path="/admin/userlist" component={UserListScreen} exact></Route>

            <Route path="/" component={HomeScreen} exact></Route>
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            {/** ? es opcional */}
          </Container>
        </main>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
