import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom"; 

// --- IMPORTS (Check these paths match your files!) ---
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./Checkout"; 
import Cart from "./Cart";         
import Toast from "./Toast";       

// --- 1. Wrapper Component ---
function AppContent() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("hypeCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    localStorage.setItem("hypeCart", JSON.stringify(cart));
  }, [cart]);

  function showNotification(message) {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000); 
  }

  function addToCart(product) {
    setCart([...cart, product]);
    showNotification(`Added ${product.name} to Bag!`);
  }

  function removeFromCart(indexToRemove) {
    const newCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(newCart);
    showNotification("Item removed from Bag");
  }

  // --- UI RENDER ---
  return (
    <div className="app-container">
      {/* NAVBAR */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 40px", background: "#1e1e1e", borderBottom: "1px solid #333",
        position: "sticky", top: 0, zIndex: 100
      }}>
        <Link to="/" style={{textDecoration: "none"}}>
          <h1 style={{margin: 0, fontSize: "1.8rem", color: "#ffffff", letterSpacing: "1px"}}>
            KHUSHI'S <span style={{color: "#03dac6"}}>STORE</span>
          </h1>
        </Link>

        <Link to="/cart" style={{textDecoration: "none", position: "relative", color: "white"}}>
          <span style={{fontSize: "1.8rem"}}>🛍️</span>
          {cart.length > 0 && (
            <span style={{
              position: "absolute", top: "-5px", right: "-10px",
              background: "#ff4757", color: "white", borderRadius: "50%",
              width: "20px", height: "20px", display: "flex", justifyContent: "center", alignItems: "center",
              fontSize: "0.8rem", fontWeight: "bold"
            }}>
              {cart.length}
            </span>
          )}
        </Link>
      </nav>

      {/* PAGE CONTENT */}
      <div style={{padding: "40px 20px"}}>
        <Routes>
          <Route path="/" element={<Home onAdd={addToCart} onProductClick={(p) => navigate(`/product/${p.id}`)} />} />
          
          <Route path="/product/:id" element={<ProductDetailsWrapper onAdd={addToCart} />} />

          <Route path="/cart" element={
            <div style={{maxWidth: "800px", margin: "0 auto", color: "white"}}>
              <h2 style={{borderBottom: "1px solid #333", paddingBottom: "10px", marginBottom: "20px"}}>Your Shopping Bag</h2>
              {cart.length === 0 ? (
                <div style={{textAlign: "center", padding: "50px", color: "#888"}}>
                  <h3>Your cart is empty</h3>
                  <Link to="/" style={{color: "#03dac6"}}>Start Shopping</Link>
                </div>
              ) : (
                <>
                  <Cart cartItems={cart} onRemove={removeFromCart} />
                  <div style={{textAlign: "right", marginTop: "30px"}}>
                    <h3>Total: <span style={{color: "#03dac6"}}>${cart.reduce((sum, item) => sum + item.price, 0)}</span></h3>
                    <button 
                      onClick={() => navigate("/checkout")}
                      style={{
                        marginTop: "10px", padding: "15px 40px", background: "#03dac6",
                        color: "black", border: "none", fontSize: "1.1rem", cursor: "pointer", fontWeight: "bold"
                      }}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          } />

          <Route path="/checkout" element={<Checkout cart={cart} onClearCart={() => setCart([])} />} />
        </Routes>
      </div>

      {notification && <Toast message={notification} onClose={() => setNotification(null)} />}
    </div>
  );
}

// Helper for Product Details
function ProductDetailsWrapper({ onAdd }) {
  const { id } = useParams();
  const navigate = useNavigate();
  // Ensure ProductDetails handles the 'id' correctly
  return <ProductDetails productId={id} onAdd={onAdd} onBack={() => navigate("/")} />;
}

// --- 2. Main App Component ---
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;