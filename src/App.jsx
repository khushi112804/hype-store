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
      {/* PREMIUM GLASS NAVBAR */}
      {/* PREMIUM GLASS NAVBAR */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 40px", 
        background: "rgba(20, 20, 20, 0.85)", 
        backdropFilter: "blur(12px)",         
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)"
      }}>
        <Link to="/" style={{textDecoration: "none"}}>
          <h1 style={{
            margin: 0, fontSize: "1.6rem", color: "#ffffff", 
            letterSpacing: "-0.5px", fontFamily: "'Montserrat', sans-serif", fontWeight: 800
          }}>
            KHUSHI'S <span style={{color: "#03dac6"}}>STORE</span>
          </h1>
        </Link>

        <Link to="/cart" style={{textDecoration: "none", position: "relative", display: "flex", alignItems: "center"}}>
          
          {/* CLEAN SHOPPING BAG ICON */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: "white"}}>
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>

          {/* Cart Badge */}
          {cart.length > 0 && (
            <span style={{
              position: "absolute", top: "-8px", right: "-8px",
              background: "#03dac6", color: "black", borderRadius: "50%",
              width: "20px", height: "20px", display: "flex", justifyContent: "center", alignItems: "center",
              fontSize: "0.75rem", fontWeight: "bold", border: "2px solid #1e1e1e"
            }}>
              {cart.length}
            </span>
          )}
        </Link>
      </nav>

      {/* PAGE CONTENT */}
      <div style={{padding: "40px 20px", maxWidth: "1200px", margin: "0 auto"}}>
        <Routes>
          <Route path="/" element={<Home onAdd={addToCart} onProductClick={(p) => navigate(`/product/${p.id}`)} />} />
          <Route path="/product/:id" element={<ProductDetailsWrapper onAdd={addToCart} />} />
          <Route path="/cart" element={
            <div style={{maxWidth: "800px", margin: "0 auto", color: "white"}}>
              <h2 style={{
                fontFamily: "'Montserrat', sans-serif", fontWeight: 600, 
                borderBottom: "1px solid #333", paddingBottom: "15px", marginBottom: "30px"
              }}>
                Your Collection
              </h2>
              {cart.length === 0 ? (
                <div style={{textAlign: "center", padding: "60px", color: "#666"}}>
                  <h3 style={{fontSize: "1.5rem", marginBottom: "20px"}}>Your rotation is empty.</h3>
                  <Link to="/" style={{
                    color: "#1e1e1e", background: "#03dac6", padding: "12px 30px", 
                    borderRadius: "30px", textDecoration: "none", fontWeight: "bold"
                  }}>
                    Cop some kicks
                  </Link>
                </div>
              ) : (
                <>
                  <Cart cartItems={cart} onRemove={removeFromCart} />
                  <div style={{textAlign: "right", marginTop: "40px"}}>
                    <h3 style={{fontSize: "1.5rem", fontFamily: "'Montserrat', sans-serif"}}>
                      Total: <span style={{color: "#03dac6"}}>${cart.reduce((sum, item) => sum + item.price, 0)}</span>
                    </h3>
                    <button 
                      onClick={() => navigate("/checkout")}
                      style={{
                        marginTop: "20px", padding: "18px 50px", 
                        background: "linear-gradient(135deg, #03dac6 0%, #02a394 100%)",
                        color: "black", border: "none", fontSize: "1rem", 
                        cursor: "pointer", fontWeight: "800", borderRadius: "50px",
                        boxShadow: "0 10px 20px rgba(3, 218, 198, 0.3)",
                        transition: "transform 0.2s"
                      }}
                      onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                      onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                    >
                      SECURE CHECKOUT
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