import logo from "./logo.svg";
import { useEffect, useState } from "react";
// import './App.css';
// import './catageries.style.scss'
// import CategoryItem from './component/catagery-item/category-item.component';

import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.components";
import SignUpForm from "./component/sign-up-form/sign-up-form.component";
import SignIn from "./component/form-input/form-input.component";

import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import Protected from "./component/protected/private";
import { Dashbord } from "./component/Dashbord/dashbord";
import Cart from "./component/directory/cart";
import { useContext } from "react";
import { CartContext } from "./contexts/cart.context";
import axios from "axios";
function App() {
  // const [categories,setCategories] = useState(array)
  const { cartData, setCartData } = useContext(CartContext);
  const location = useLocation().pathname;
  const getData = async () => {
    const data = await axios.get(`http://localhost:8000/cart/get`);

    console.log(data.data.products);
    setCartData(data.data.products ? data.data.products : []);
  };
  useEffect(() => {
    getData();
  }, [location]);
  console.log("Checking Cart Data =>", cartData);

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUpForm />} />
        {/* <Route path="/navigation" element={<Navigation />} /> */}

        <Route path="/home" element={<Protected Component={Home} />} />
        <Route path="/shop" element={<Protected Component={Shop} />} />
        <Route path="/dashbord" element={<Protected Component={Dashbord} />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Protected Component={Checkout} />} />
      </Routes>
    </>
  );
}

export default App;
