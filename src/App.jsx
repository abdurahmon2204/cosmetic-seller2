import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./assets/Pages/ProductList/ProductList";
import ProductDetail from "./assets/Pages/OneProduct/OneProduct";
import Cart from "./assets/Pages/Cart/Cart";
import Navbar from "./assets/Componnets/Navbar";
import About from "./assets/Pages/About/About";
import Login from "./assets/Pages/Login/Login";


function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <Navbar cartCount={cart.length} />
      
      <Routes>
        <Route path="/" element={<ProductList />} />
        
        <Route
          path="/oneproduct/:id"
          element={<ProductDetail cart={cart} setCart={setCart} />}
        />

        

        
        <Route 
          path="/cart" 
          element={<Cart cart={cart} setCart={setCart} />} 
        />

        <Route path="/products" element={<ProductList />} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;