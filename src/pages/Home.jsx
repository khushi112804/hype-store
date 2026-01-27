import { useState } from "react";

function Home({ products, loading, searchQuery, selectedCategory, setSelectedCategory, wishlist, toggleWishlist, onAdd, onProductClick }) {
  
  const [priceFilter, setPriceFilter] = useState("All"); 

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory || product.brand === selectedCategory;
    let priceMatch = true;
    if (priceFilter === "Under $100") priceMatch = product.price < 100;
    if (priceFilter === "$100 - $150") priceMatch = product.price >= 100 && product.price <= 150;
    if (priceFilter === "Over $150") priceMatch = product.price > 150;
    return searchMatch && categoryMatch && priceMatch;
  });

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "20px" }}>
      
      {/* --- PROMOTIONAL BANNER (NEW) --- */}
      <div style={{ 
          width: "100%", 
          background: "linear-gradient(90deg, #fff0e3 0%, #fbc2eb 100%)", // Myntra-like gradient
          borderRadius: "8px", 
          marginBottom: "40px", 
          padding: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#333",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
      }}>
          <div>
              <h2 style={{ fontSize: "2.5rem", margin: "0 0 10px 0", fontWeight: "900", color: "#ff3f6c" }}>
                  Get 25% Off
              </h2>
              <p style={{ fontSize: "1.2rem", margin: 0, fontWeight: "600" }}>
                  Up To <span style={{ textDecoration: "underline" }}>$200 Off*</span> | On Your First Order
              </p>
              <div style={{ marginTop: "15px", background: "white", padding: "8px 15px", display: "inline-block", borderRadius: "5px", border: "1px dashed #333", fontWeight: "bold" }}>
                  CODE: <span style={{ color: "#ff3f6c" }}>MYNTRASAVE</span>
              </div>
          </div>
          {/* Decorative graphic (Text based) */}
          <div style={{ fontSize: "5rem", fontWeight: "bold", opacity: 0.1, userSelect: "none" }}>
              SALE
          </div>
      </div>

      <div style={{ display: "flex", gap: "30px", flexDirection: "row" }}>
        
        {/* SIDEBAR */}
        <div style={{ flex: "0 0 250px", display: "block" }}>
          <div style={{ position: "sticky", top: "100px" }}>
            <h3 style={{ fontSize: "1.1rem", borderBottom: "1px solid #333", paddingBottom: "10px", marginBottom: "20px" }}>FILTERS</h3>
            
            {/* CATEGORIES */}
            <div style={{ marginBottom: "30px" }}>
              <h4 style={{ fontSize: "0.9rem", color: "#888", marginBottom: "15px" }}>CATEGORIES</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {["All", "Men", "Women", "Kids"].map((cat) => (
                  <label key={cat} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem" }}>
                    <input type="radio" name="category" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} style={{ accentColor: "#03dac6" }} />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* BRAND */}
            <div style={{ marginBottom: "30px" }}>
              <h4 style={{ fontSize: "0.9rem", color: "#888", marginBottom: "15px" }}>BRAND</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Nike", "Adidas", "Puma"].map((brand) => (
                  <label key={brand} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem" }}>
                    <input type="radio" name="category" checked={selectedCategory === brand} onChange={() => setSelectedCategory(brand)} style={{ accentColor: "#03dac6" }} />
                    {brand}
                  </label>
                ))}
              </div>
            </div>

            {/* PRICE */}
            <div style={{ marginBottom: "30px" }}>
              <h4 style={{ fontSize: "0.9rem", color: "#888", marginBottom: "15px" }}>PRICE</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {["All", "Under $100", "$100 - $150", "Over $150"].map((price) => (
                  <label key={price} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem" }}>
                    <input type="radio" name="price" checked={priceFilter === price} onChange={() => setPriceFilter(price)} style={{ accentColor: "#03dac6" }} />
                    {price}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
            {selectedCategory.toUpperCase()} SHOES <span style={{color: "#777", fontSize: "1rem"}}>({filteredProducts.length} items)</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
            {loading ? ( <p>Loading...</p> ) : (
              filteredProducts.map((product) => (
                 <div key={product.id} onClick={() => onProductClick(product)} style={{ background: "#1e1e1e", cursor: "pointer", borderRadius: "4px", overflow: "hidden", border: "1px solid #333", position: "relative" }}>
                    <div style={{ width: "100%", aspectRatio: "4/5", background: "#2a2a2a", overflow: "hidden", position: "relative" }}>
                       <img src={product.image} onError={(e) => { e.target.src = "https://placehold.co/400x500?text=No+Image"; }} style={{width: "100%", height: "100%", objectFit: "cover"}} />
                       <button
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                          style={{ position: "absolute", top: "10px", right: "10px", background: "white", border: "none", borderRadius: "50%", width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                       >
                          <span style={{ fontSize: "1.2rem", color: wishlist[product.id] ? "#ff3f6c" : "#333", paddingTop: "2px" }}>
                            {wishlist[product.id] ? "♥" : "♡"}
                          </span>
                       </button>
                    </div>
                    <div style={{ padding: "12px" }}>
                      <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: "bold", textTransform: "uppercase" }}>{product.brand}</h3>
                      <p style={{ margin: 0, color: "#a9a9a9", fontSize: "0.85rem" }}>{product.name}</p>
                      <p style={{ margin: "5px 0", fontSize: "0.95rem", fontWeight: "bold", color: "#03dac6" }}>Rs. {product.price}</p>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onAdd(product); }}
                        style={{ width: "100%", padding: "10px", background: "transparent", border: "1px solid #555", color: "white", borderRadius: "2px", fontWeight: "600", cursor: "pointer" }}
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;