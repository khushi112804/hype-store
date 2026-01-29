import React from "react";
import { useNavigate } from "react-router-dom"; // Need this for navigation

function Navbar({ 
  cartCount, 
  searchQuery, 
  setSearchQuery, 
  onCategoryClick, 
  onCartClick, 
  onWishlistClick,
  user,      // <--- NEW: Receiving User Data
  onLogout   // <--- NEW: Receiving Logout Function
}) {
  
  const navigate = useNavigate();

  return (
    <nav style={{ padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#121212", position: "sticky", top: 0, zIndex: 100 }}>
      
      {/* 1. LOGO */}
      <h1 
        onClick={() => navigate("/")} 
        style={{ fontSize: "1.8rem", fontWeight: "900", letterSpacing: "-1px", color: "white", cursor: "pointer", margin: 0 }}
      >
        HYPE <span style={{ color: "#03dac6" }}>STORE</span>
      </h1>

      {/* 2. MENU LINKS */}
      <div style={{ display: "flex", gap: "25px", fontWeight: "600", fontSize: "0.9rem" }}>
        {["MEN", "WOMEN", "KIDS", "HOME"].map((cat) => (
          <span 
            key={cat} 
            onClick={() => onCategoryClick(cat)}
            style={{ cursor: "pointer", opacity: 0.8, transition: "0.2s" }}
            onMouseOver={(e) => e.target.style.opacity = 1}
            onMouseOut={(e) => e.target.style.opacity = 0.8}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* 3. SEARCH & ICONS */}
      <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
        
        {/* Search Bar */}
        <input 
          type="text" 
          placeholder="Search for products..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "10px 15px", borderRadius: "5px", border: "1px solid #333", background: "#1e1e1e", color: "white", width: "250px" }}
        />

        {/* Wishlist Icon */}
        <div style={{ cursor: "pointer", textAlign: "center" }} onClick={onWishlistClick}>
          <span style={{ fontSize: "1.2rem" }}>♡</span>
          <div style={{ fontSize: "0.7rem", opacity: 0.7 }}>Wishlist</div>
        </div>

        {/* Cart Icon */}
        <div style={{ cursor: "pointer", textAlign: "center", position: "relative" }} onClick={onCartClick}>
          <span style={{ fontSize: "1.2rem" }}>🛒</span>
          <div style={{ fontSize: "0.7rem", opacity: 0.7 }}>Bag</div>
          {cartCount > 0 && (
            <span style={{ position: "absolute", top: "-5px", right: "-5px", background: "#cf6679", color: "white", fontSize: "0.7rem", fontWeight: "bold", width: "18px", height: "18px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {cartCount}
            </span>
          )}
        </div>

        {/* --- NEW: USER PROFILE SECTION --- */}
        {user ? (
          // IF LOGGED IN: Show Photo & Logout
          <div style={{ display: "flex", alignItems: "center", gap: "15px", borderLeft: "1px solid #333", paddingLeft: "25px" }}>
            <img 
              src={user.photoURL} 
              alt="Profile" 
              style={{ width: "35px", height: "35px", borderRadius: "50%", border: "2px solid #03dac6" }}
              title={user.displayName} // Hover to see name
            />
            <button 
              onClick={onLogout}
              style={{ background: "transparent", color: "#cf6679", border: "1px solid #cf6679", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem" }}
            >
              Logout
            </button>
          </div>
        ) : (
          // IF NOT LOGGED IN: Show Login Button
          <button 
            onClick={() => navigate("/login")}
            style={{ background: "#4285F4", color: "white", border: "none", padding: "8px 20px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", marginLeft: "10px" }}
          >
            Login
          </button>
        )}

      </div>
    </nav>
  );
}

export default Navbar;