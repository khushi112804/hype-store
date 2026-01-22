import { useState, useEffect } from "react";
import { products } from "./data"; 
import Cart from "./Cart";
import Checkout from "./Checkout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("hypeCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // NAVIGATION STATE (Replaces the broken Router)
  const [currentView, setCurrentView] = useState("home"); // 'home', 'details', 'checkout'
  const [selectedProductId, setSelectedProductId] = useState(null);

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

  function handleOrder(userData) {
    alert(`Thanks ${userData.name}! Your order is on the way.`);
    setCart([]);
    setCurrentView("home");
  }

  // NAVIGATION FUNCTIONS
  function goHome() {
    setCurrentView("home");
  }

  function goToDetails(product) {
    setSelectedProductId(product.id);
    setCurrentView("details");
  }

  function goToCheckout() {
    setCurrentView("checkout");
  }

  return (
    <div className="app-container">
      
      {/* HEADER */}
      <nav style={{textAlign: "center", marginBottom: "40px", cursor: "pointer"}} onClick={goHome}>
         <h1>Khushi's Store (Cart: {cart.length})</h1>
      </nav>

      {/* --- THE VIEW SWITCHER --- */}
      
      {/* 1. HOME VIEW */}
      {currentView === "home" && (
        <Home 
          onAdd={addToCart} 
          onProductClick={goToDetails} 
        />
      )}

      {/* 2. PRODUCT DETAILS VIEW */}
      {currentView === "details" && (
        <ProductDetails 
          productId={selectedProductId} 
          onAdd={addToCart}
          onBack={goHome} 
        />
      )}

      {/* 3. CHECKOUT VIEW */}
      {currentView === "checkout" && (
         <Checkout onCheckout={handleOrder} onBack={goHome} />
      )}

      {/* CART & CHECKOUT BUTTON */}
      {currentView !== "checkout" && cart.length > 0 && (
        <>
          <Cart cartItems={cart} onRemove={removeFromCart} />
          <button 
            onClick={goToCheckout} 
            style={{width: "100%", marginTop: "20px", background: "#03dac6", color: "black"}}
          >
            Proceed to Checkout
          </button>
        </>
      )}

    </div>
  );
}

export default App;