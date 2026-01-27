import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ProductDetails from "./ProductDetails"; 
import Footer from "./Footer"; // <--- IMPORT FOOTER
import { db } from "./firebase"; 
import { collection, getDocs } from "firebase/firestore";

import Home from "./pages/Home"; 
import Cart from "./pages/Cart";         
import Wishlist from "./pages/Wishlist"; 
import Checkout from "./pages/Checkout"; 

function App() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  
  // --- GLOBAL STATE ---
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const [cartItems, setCartItems] = useState([]); 
  
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("myWishlist");
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.log("Wishlist data corrupted, resetting.");
      return {};
    }
  });

  const [currentPage, setCurrentPage] = useState("home"); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState(null); 

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
    setCurrentPage("home"); 
    setNotification("🎉 Order Placed Successfully!");
    setTimeout(() => { setNotification(null); }, 5000);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage("home"); 
    window.scrollTo(0,0);
  };

  const renderPage = () => {
    if (currentPage === "details") {
      return (
        <ProductDetails 
          product={selectedProduct} allProducts={products}
          onBack={() => setCurrentPage("home")} onAdd={handleAdd}
          onProductClick={(p) => { setSelectedProduct(p); window.scrollTo(0,0); }}
        />
      );
    }
    if (currentPage === "cart") {
      return (
        <Cart 
          cartItems={cartItems} 
          onRemove={handleRemoveFromCart} 
          onBack={() => setCurrentPage("home")}
          onCheckout={() => setCurrentPage("checkout")} 
        />
      );
    }
    if (currentPage === "checkout") { 
      const total = cartItems.reduce((sum, item) => sum + item.price, 0);
      return (
        <Checkout 
          total={total} 
          onPlaceOrder={handlePlaceOrder} 
          onBack={() => setCurrentPage("cart")}
        />
      );
    }
    if (currentPage === "wishlist") { 
      return (
        <Wishlist 
          wishlist={wishlist} allProducts={products} 
          onRemove={toggleWishlist} onBack={() => setCurrentPage("home")} onAdd={handleAdd}
        />
      );
    }
    // Default: Home
    return (
      <Home 
        products={products} loading={loading} searchQuery={searchQuery}
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
        wishlist={wishlist} toggleWishlist={toggleWishlist} 
        onAdd={handleAdd} 
        onProductClick={(p) => { setSelectedProduct(p); setCurrentPage("details"); window.scrollTo(0,0); }} 
      />
    );
  };

  return (
    <div style={{ background: "#121212", minHeight: "100vh", color: "white", fontFamily: "'Montserrat', sans-serif", display: "flex", flexDirection: "column" }}>
      
      <Navbar 
        cartCount={cartItems.length} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onCategoryClick={handleCategoryClick} 
        onCartClick={() => setCurrentPage("cart")} 
        onWishlistClick={() => setCurrentPage("wishlist")} 
      />
      
      {notification && (
        <div style={{ position: "fixed", bottom: "30px", left: "50%", transform: "translateX(-50%)", background: "#03dac6", color: "black", padding: "12px 24px", borderRadius: "30px", fontWeight: "bold", zIndex: 2000 }}>
          {notification}
        </div>
      )}

      {/* Main Content */}
      <div style={{ flex: 1 }}>
         {renderPage()}
      </div>

      {/* FOOTER ADDED HERE */}
      <Footer />
    </div>
  );
}

export default App;