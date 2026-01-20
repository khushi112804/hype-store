import { useState, useEffect } from "react";
import { products } from "./data";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import Checkout from "./Checkout";

function App() {
  // 1. CART STATE
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("hypeCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. SEARCH STATE (Moved to the correct place!)
  const [searchTerm, setSearchTerm] = useState("");

  // 3. CHECKOUT STATE
  const [isCheckout, setIsCheckout] = useState(false);

  // SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("hypeCart", JSON.stringify(cart));
  }, [cart]);

  // HELPER FUNCTIONS
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
    setIsCheckout(false);
  }

  // FILTER LOGIC
  const visibleProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Khushi's Store (Cart: {cart.length})</h1>

      {/* SEARCH BAR (Now inside the main container) */}
      {!isCheckout && (
        <input
          type="text"
          placeholder="Search for shoes..."
          className="search-bar"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}

      {/* PRODUCT GRID (Uses visibleProducts now!) */}
      {!isCheckout && (
        <div className="grid">
          {visibleProducts.map((item) => (
            <ProductCard key={item.id} product={item} onAdd={addToCart} />
          ))}
        </div>
      )}

      {/* CART SECTION */}
      {!isCheckout && cart.length > 0 && (
        <Cart 
          cartItems={cart} 
          onRemove={removeFromCart} 
        />
      )}

      {/* CHECKOUT BUTTON */}
      {!isCheckout && cart.length > 0 && (
        <button 
          onClick={() => setIsCheckout(true)} 
          style={{width: "100%", marginTop: "20px", background: "#03dac6", color: "black"}}
        >
          Proceed to Checkout
        </button>
      )}

      {/* CHECKOUT FORM */}
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