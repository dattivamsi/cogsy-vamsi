import React, { useContext } from "react";
import { ContextDetails } from "../App";
import { Button } from "antd";

function Cart() {
  const { cartItems, setCartItems, setProducts,products } = useContext(ContextDetails);
  let totalCost = 0;

  cartItems.forEach((item) => {
    let productCost = item.price * item.cartCount;
    totalCost += productCost;
  });

  const handlecart = (item, type) => {
    const updatedCartItems = cartItems
      .map((cartItem) => {
        if (cartItem.id === item.id) {
          let newCount = cartItem.cartCount;
          let newitemCount = products.itemCount
          if (type === "increase") {
            newCount++;
            newitemCount --;
          } else if (type === "decrease") {
            newitemCount++;
            newCount = Math.max(0, newCount - 1);
          }
          return { ...cartItem, cartCount: newCount };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.cartCount > 0);

    setCartItems(updatedCartItems);
  };
  console.log(cartItems);

  return (
    <div className="cart-card-container">
      <div>
        {cartItems?.map((ele) => (
          <div className="cart-card">
            <div className="right">
              <img src={ele?.image} alt="Image" className="product-images" />
              <div className="no-of-items">
                <Button onClick={() => handlecart(ele, "increase")}>+</Button>
                <p>{ele?.cartCount}</p>
                <Button onClick={() => handlecart(ele, "decrease")}>-</Button>
              </div>
            </div>
            <div className="description-details">
              <p>{ele?.title}</p>
              <p>{ele?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div style={{textAlign:"center"}} className="price-details">
          <p>Price Details</p>
        </div>
        <div className="price">
          <p>{`Price (${cartItems?.length} items)`}</p>
          <p>{totalCost.toFixed(2)}</p>
        </div>
        <hr />
        <div className="price">
          <p>Total Amount</p>
          <p>{totalCost.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
