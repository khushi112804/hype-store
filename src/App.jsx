import { useState, useEffect } from "react";
import { products } from "./data";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import Checkout from "./Checkout"; // <--- NEW IMPORT

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("hypeCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // NEW STATE: Are we checking out?
  const [isCheckout, setIsCheckout] = useState(false); 

  useEffect(() => {
    localStorage.setItem("hypeCart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart([...cart, product]);
  }

  function removeFromCart(indexToRemove) {
    const newCart = cart.filter((item, index) => index !== indexToRemove);
    setCart(newCart);
  }

  // NEW FUNCTION: Handle the final order
  function handleOrder(userData) {
    alert(`Thanks ${userData.name}! Your order is on the way.`);
    setCart([]); // Clear the cart
    setIsCheckout(false); // Hide the form
  }

  return (
    <div className="app-container">
     <h1>Khushi's Store (Cart: {cart.length})</h1>
      
      {/* 1. If we are NOT checking out, show products */}
      {!isCheckout && (
        <div className="grid">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} onAdd={addToCart} />
          ))}
        </div>
      )}

      {/* 2. Pass a "Show Checkout" button to the Cart */}
      {!isCheckout && cart.length > 0 && (
         <Cart 
            cartItems={cart} 
            onRemove={removeFromCart} 
         />
      )}

      {/* 3. The Toggle Button */}
      {!isCheckout && cart.length > 0 && (
        <button 
          onClick={() => setIsCheckout(true)} 
          style={{width: "100%", marginTop: "20px", background: "green"}}
        >
          Proceed to Checkout
        </button>
      )}

      {/* 4. Show Checkout Form if isCheckout is true */}
      {isCheckout && (
        <>
            <button onClick={() => setIsCheckout(false)}>Back to Store</button>
            <Checkout onCheckout={handleOrder} />
        </>
      )}

    </div>
  );
}

export default App;