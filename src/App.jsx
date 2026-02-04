import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; 
import Navbar from "./Navbar";
import ProductDetails from "./ProductDetails"; 
import Footer from "./Footer"; 
import { db, auth } from "./firebase"; // <--- 1. ADDED 'auth' HERE
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth"; // <--- 2. ADDED AUTH TOOLS

// PAGES
import Login from "./pages/Login";
import Home from "./pages/Home"; 
import Cart from "./pages/Cart"; 
import Wishlist from "./pages/Wishlist"; 
import Checkout from "./pages/Checkout"; 

function App() {
  const navigate = useNavigate(); 
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  
  // --- USER STATE (This was missing!) ---
  const [user, setUser] = useState(null); 

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

  // --- 3. LISTENER: CHECKS IF YOU ARE LOGGED IN ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // <--- SAVES THE USER
      console.log("Current User:", currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out!");
    navigate("/");
  };

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
    navigate("/"); 
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate("/"); 
    window.scrollTo(0,0);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigate("/details"); 
    window.scrollTo(0,0);
  };

  return (
    <div style={{ background: "#121212", minHeight: "100vh", color: "white", fontFamily: "'Montserrat', sans-serif", display: "flex", flexDirection: "column" }}>
      
      {/* 4. PASS USER TO NAVBAR (Crucial Step!) */}
      <Navbar 
        cartCount={cartItems.length} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onCategoryClick={handleCategoryClick} 
        onCartClick={() => navigate("/cart")} 
        onWishlistClick={() => navigate("/wishlist")} 
        user={user}             // <--- PASS USER INFO
        onLogout={handleLogout} // <--- PASS LOGOUT FUNCTION
      />
      
      {notification && (
        <div style={{ position: "fixed", bottom: "30px", left: "50%", transform: "translateX(-50%)", background: "#03dac6", color: "black", padding: "12px 24px", borderRadius: "30px", fontWeight: "bold", zIndex: 2000 }}>
          {notification}
        </div>
      )}

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={
            <Home 
              products={products} loading={loading} searchQuery={searchQuery}
              selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
              wishlist={wishlist} toggleWishlist={toggleWishlist} 
              onAdd={handleAdd} 
              onProductClick={handleProductClick} 
            />
          } />

          <Route path="/login" element={<Login />} />

          <Route path="/cart" element={
            <Cart 
              cartItems={cartItems} 
              onRemove={handleRemoveFromCart} 
              onBack={() => navigate("/")}
              onCheckout={() => navigate("/checkout")} 
            />
          } />

          <Route path="/checkout" element={
            <Checkout 
              total={cartItems.reduce((sum, item) => sum + item.price, 0)} 
              onPlaceOrder={handlePlaceOrder} 
              onBack={() => navigate("/cart")}
            />
          } />

          <Route path="/wishlist" element={
            <Wishlist 
              wishlist={wishlist} allProducts={products} 
              onRemove={toggleWishlist} onBack={() => navigate("/")} onAdd={handleAdd}
            />
          } />

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