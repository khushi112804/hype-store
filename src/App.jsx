import { useState, useEffect } from "react";
import { products } from "./data"; 
import Cart from "./Cart";
import Checkout from "./Checkout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

function App() {
  // 1. APP STATE
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("hypeCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. NAVIGATION STATE
  const [currentView, setCurrentView] = useState("home"); 
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    localStorage.setItem("hypeCart", JSON.stringify(cart));
  }, [cart]);

  // --- ACTIONS ---
  function addToCart(product) {
    setCart([...cart, product]);
  }

  function removeFromCart(indexToRemove) {
    const newCart = cart.filter((item, index) => index !== indexToRemove);
    setCart(newCart);
  }

  function handleOrder(userData) {
    alert(`Order Placed! Thanks ${userData.name}.`);
    setCart([]);
    setCurrentView("home");
  }

  // --- NAVIGATION ---
  function goHome() {
    setCurrentView("home");
  }

  function goToDetails(product) {
    setSelectedProductId(product.id);
    setCurrentView("details");
  }

  function goToCart() {
    setCurrentView("cart");
  }

  function goToCheckout() {
    setCurrentView("checkout");
  }

  return (
    <div className="app-container">
      
      {/* --- PROFESSIONAL NAVBAR --- */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        background: "#1e1e1e",
        borderBottom: "1px solid #333",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        {/* LOGO (Left) */}
        <div onClick={goHome} style={{cursor: "pointer", display: "flex", alignItems: "center", gap: "10px"}}>
          <h1 style={{margin: 0, fontSize: "1.8rem", color: "#ffffff", letterSpacing: "1px"}}>
            KHUSHI'S <span style={{color: "#03dac6"}}>STORE</span>
          </h1>
        </div>

        {/* CART BUTTON (Right) */}
        <div onClick={goToCart} style={{position: "relative", cursor: "pointer"}}>
          <span style={{fontSize: "1.8rem"}}>🛍️</span>
          {/* Red Notification Badge */}
          {cart.length > 0 && (
            <span style={{
              position: "absolute",
              top: "-5px",
              right: "-10px",
              background: "#ff4757",
              color: "white",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "0.8rem",
              fontWeight: "bold"
            }}>
              {cart.length}
            </span>
          )}
        </div>
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      <div style={{padding: "40px 20px"}}>

        {/* 1. HOME VIEW */}
        {currentView === "home" && (
          <Home onAdd={addToCart} onProductClick={goToDetails} />
        )}

        {/* 2. PRODUCT DETAILS VIEW */}
        {currentView === "details" && (
          <ProductDetails 
            productId={selectedProductId} 
            onAdd={addToCart}
            onBack={goHome} 
          />
        )}

        {/* 3. CART VIEW */}
        {currentView === "cart" && (
          <div style={{maxWidth: "800px", margin: "0 auto", color: "white"}}>
            <h2 style={{borderBottom: "1px solid #333", paddingBottom: "10px", marginBottom: "20px"}}>
              Your Shopping Bag
            </h2>
            
            {cart.length === 0 ? (
              <div style={{textAlign: "center", padding: "50px", color: "#888"}}>
                <h3>Your cart is empty</h3>
                <button 
                  onClick={goHome} 
                  style={{marginTop: "20px", padding: "10px 20px", background: "#03dac6", color: "black", border: "none", cursor: "pointer", fontWeight: "bold"}}
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <Cart cartItems={cart} onRemove={removeFromCart} />
                <div style={{textAlign: "right", marginTop: "30px"}}>
                  <h3>Total: <span style={{color: "#03dac6"}}>${cart.reduce((sum, item) => sum + item.price, 0)}</span></h3>
                  <button 
                    onClick={goToCheckout} 
                    style={{
                      marginTop: "10px", 
                      padding: "15px 40px", 
                      background: "#03dac6", 
                      color: "black", 
                      border: "none", 
                      fontSize: "1.1rem", 
                      cursor: "pointer", 
                      fontWeight: "bold"
                    }}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* 4. CHECKOUT VIEW */}
        {currentView === "checkout" && (
           <Checkout onCheckout={handleOrder} onBack={goToCart} />
        )}

      </div>
    </div>
  );
}

export default App;