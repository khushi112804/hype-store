import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // IMPORT ROUTER TOOLS
import Navbar from "./Navbar";
import ProductDetails from "./ProductDetails"; 
import Footer from "./Footer"; 
import { db } from "./firebase"; 
import { collection, getDocs } from "firebase/firestore";

// PAGES
import Login from "./pages/Login";
import Home from "./pages/Home"; 
import Cart from "./pages/Cart"; 
import Wishlist from "./pages/Wishlist"; 
import Checkout from "./pages/Checkout"; 

function App() {
  const navigate = useNavigate(); // HOOK TO MOVE PAGES
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  
  // --- GLOBAL STATE ---
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const [cartItems, setCartItems] = useState([]); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState(null); 
  
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("myWishlist");
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      return {};
    }
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsRef = collection(db, "products");
        const snapshot = await getDocs(productsRef);
        const productsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
        setLoading(false);
      } catch (error) { console.error("Error:", error); setLoading(false); }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("myWishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // --- ACTIONS ---
  const handleAdd = (product) => {
    setCartItems([...cartItems, product]);
    setNotification(`Added ${product.name} to Bag! 🛍️`);
    setTimeout(() => { setNotification(null); }, 3000);
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePlaceOrder = () => {
    setCartItems([]); 
    setNotification("🎉 Order Placed Successfully!");
    setTimeout(() => { setNotification(null); }, 5000);
    navigate("/"); // Go Home
  };

  // --- NAVIGATION HANDLERS ---
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate("/"); // Go Home
    window.scrollTo(0,0);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigate("/details"); // Go to Details
    window.scrollTo(0,0);
  };

  return (
    <div style={{ background: "#121212", minHeight: "100vh", color: "white", fontFamily: "'Montserrat', sans-serif", display: "flex", flexDirection: "column" }}>
      
      <Navbar 
        cartCount={cartItems.length} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onCategoryClick={handleCategoryClick} 
        onCartClick={() => navigate("/cart")} 
        onWishlistClick={() => navigate("/wishlist")} 
      />
      
      {notification && (
        <div style={{ position: "fixed", bottom: "30px", left: "50%", transform: "translateX(-50%)", background: "#03dac6", color: "black", padding: "12px 24px", borderRadius: "30px", fontWeight: "bold", zIndex: 2000 }}>
          {notification}
        </div>
      )}

      {/* --- ROUTES: THIS REPLACES renderPage() --- */}
      <div style={{ flex: 1 }}>
        <Routes>
          
          {/* 1. HOME */}
          <Route path="/" element={
            <Home 
              products={products} loading={loading} searchQuery={searchQuery}
              selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
              wishlist={wishlist} toggleWishlist={toggleWishlist} 
              onAdd={handleAdd} 
              onProductClick={handleProductClick} 
            />
          } />

          {/* 2. LOGIN (New!) */}
          <Route path="/login" element={<Login />} />

          {/* 3. CART */}
          <Route path="/cart" element={
            <Cart 
              cartItems={cartItems} 
              onRemove={handleRemoveFromCart} 
              onBack={() => navigate("/")}
              onCheckout={() => navigate("/checkout")} 
            />
          } />

          {/* 4. CHECKOUT */}
          <Route path="/checkout" element={
            <Checkout 
              total={cartItems.reduce((sum, item) => sum + item.price, 0)} 
              onPlaceOrder={handlePlaceOrder} 
              onBack={() => navigate("/cart")}
            />
          } />

          {/* 5. WISHLIST */}
          <Route path="/wishlist" element={
            <Wishlist 
              wishlist={wishlist} allProducts={products} 
              onRemove={toggleWishlist} onBack={() => navigate("/")} onAdd={handleAdd}
            />
          } />

          {/* 6. DETAILS */}
          <Route path="/details" element={
            <ProductDetails 
              product={selectedProduct} allProducts={products}
              onBack={() => navigate("/")} onAdd={handleAdd}
              onProductClick={handleProductClick}
            />
          } />

        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;