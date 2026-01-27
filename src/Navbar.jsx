import { useState } from "react";

function Navbar({ cartCount, searchQuery, setSearchQuery, onCategoryClick, onCartClick, onWishlistClick }) {
  return (
    <nav style={{ 
      display: "flex", justifyContent: "space-between", alignItems: "center", 
      padding: "15px 40px", background: "#1e1e1e", color: "white", 
      boxShadow: "0 4px 10px rgba(0,0,0,0.3)", position: "sticky", top: 0, zIndex: 1000
    }}>
      
      {/* 1. LOGO & LINKS */}
      <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
        {/* UPDATED LOGO NAME HERE */}
        <div 
          style={{ fontSize: "1.5rem", fontWeight: "900", fontFamily: "'Montserrat', sans-serif", cursor: "pointer" }} 
          onClick={() => onCategoryClick("All")}
        >
          <span style={{ color: "white" }}>HYPE</span>
          <span style={{ color: "#03dac6" }}> STORE</span>
        </div>

        <div style={{ display: "flex", gap: "20px", fontSize: "0.9rem", fontWeight: "bold", color: "#ccc" }}>
          <span onClick={() => onCategoryClick("Men")} style={{ cursor: "pointer", color: "white" }}>MEN</span>
          <span onClick={() => onCategoryClick("Women")} style={{ cursor: "pointer", color: "white" }}>WOMEN</span>
          <span onClick={() => onCategoryClick("Kids")} style={{ cursor: "pointer", color: "white" }}>KIDS</span>
          <span onClick={() => onCategoryClick("All")} style={{ cursor: "pointer", color: "white" }}>HOME</span>
        </div>
      </div>

      {/* 2. SEARCH BAR */}
      <div style={{ flex: 1, maxWidth: "500px", margin: "0 20px" }}>
        <input 
          type="text" 
          placeholder="Search for products, brands and more" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%", padding: "10px 20px", borderRadius: "5px",
            border: "1px solid #444", background: "#2a2a2a", color: "white",
            outline: "none", fontFamily: "'Montserrat', sans-serif"
          }}
        />
      </div>

      {/* 3. ICONS */}
      <div style={{ display: "flex", alignItems: "center", gap: "25px", fontSize: "0.8rem", fontWeight: "bold" }}>
        
        {/* Wishlist */}
        <div 
            onClick={onWishlistClick} 
            style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
        >
          <span style={{ fontSize: "1.2rem" }}>♡</span>
          <span>Wishlist</span>
        </div>
        
        {/* Bag */}
        <div onClick={onCartClick} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", position: "relative" }}>
          <span style={{ fontSize: "1.2rem" }}>🛒</span>
          <span>Bag</span>
          {cartCount > 0 && (
            <span style={{ 
              position: "absolute", top: "-5px", right: "0px", 
              background: "#cf6679", color: "white", borderRadius: "50%", 
              width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.7rem", fontWeight: "bold" 
            }}>
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;