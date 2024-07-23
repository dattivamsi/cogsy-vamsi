import React, { createContext, useState } from "react";
import "./App.css";
import TopNav from "./components/TopNav";
import Products from "./components/Products";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Cart from "./components/Cart";

export const ContextDetails = createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems,setCartItems] = useState([])

  return (
    <ContextDetails.Provider value={{ products, setProducts,cartItems,setCartItems }}>
      <div className="App">
        <BrowserRouter>
        <TopNav />
        <Routes>
          <Route path="/" index element={<Products />}/>
          <Route path="/cart" element={<Cart />}/>
          </Routes>
        </BrowserRouter>
        {/* <Products /> */}
      </div>
    </ContextDetails.Provider>
  );
}

export default App;
