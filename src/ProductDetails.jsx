import { useState, useEffect } from "react";

function ProductDetails({ product, allProducts, onBack, onAdd, onProductClick }) {
  const [selectedSize, setSelectedSize] = useState(null);

  // Scroll to top when the product changes (e.g., clicking a suggestion)
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedSize(null); // Reset size
  }, [product]);

  if (!product) return null;

  // FIND SIMILAR PRODUCTS (Same category, but not the current one)
  const similarProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3); // Show max 3 suggestions

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px", color: "white" }}>
      
      <button 
        onClick={onBack}
        style={{
          background: "transparent", border: "1px solid rgba(255,255,255,0.2)", 
          color: "white", padding: "10px 20px", borderRadius: "20px", 
          cursor: "pointer", marginBottom: "30px"
        }}
      >
        ← BACK
      </button>

      {/* MAIN PRODUCT SECTION */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "50px", justifyContent: "center", marginBottom: "80px" }}>
        {/* LEFT: IMAGE */}
        <div style={{ flex: "1 1 400px", background: "#1e1e1e", borderRadius: "20px", padding: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={product.image} alt={product.name} style={{ width: "100%", maxWidth: "500px", objectFit: "contain" }} />
        </div>

        {/* RIGHT: DETAILS */}
        <div style={{ flex: "1 1 400px" }}>
          <h4 style={{ color: "#03dac6", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px" }}>{product.category}</h4>
          <h1 style={{ fontSize: "2.5rem", margin: "0 0 20px 0" }}>{product.name}</h1>
          <h2 style={{ fontSize: "2rem", color: "#eee", marginBottom: "30px" }}>${product.price}</h2>
          
          <p style={{ lineHeight: "1.6", color: "#aaa", marginBottom: "30px" }}>
            The {product.name} is designed for those who demand style and performance.
            Featuring premium {product.category} technology.
          </p>

          <div style={{ marginBottom: "40px" }}>
            <p style={{ fontWeight: "bold", marginBottom: "10px" }}>SELECT SIZE:</p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {[7, 8, 9, 10, 11, 12].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: "50px", height: "50px", borderRadius: "10px",
                    border: selectedSize === size ? "2px solid #03dac6" : "1px solid #333",
                    background: selectedSize === size ? "rgba(3, 218, 198, 0.1)" : "#1e1e1e",
                    color: selectedSize === size ? "#03dac6" : "white", cursor: "pointer"
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => onAdd(product)}
            style={{
              width: "100%", padding: "18px", background: "linear-gradient(45deg, #03dac6, #028e82)",
              border: "none", borderRadius: "50px", color: "black", fontSize: "1.1rem", fontWeight: "900", cursor: "pointer"
            }}
          >
            ADD TO BAG
          </button>
        </div>
      </div>

      {/* --- SIMILAR PRODUCTS SECTION --- */}
      {similarProducts.length > 0 && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "40px" }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>YOU MIGHT ALSO LIKE</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
            {similarProducts.map((item) => (
              <div 
                key={item.id}
                onClick={() => onProductClick(item)} // Click to switch product
                style={{ background: "#1e1e1e", borderRadius: "12px", padding: "15px", cursor: "pointer", transition: "transform 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <img src={item.image} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }} />
                <h4 style={{ margin: "0 0 5px 0", fontSize: "0.9rem" }}>{item.name}</h4>
                <p style={{ color: "#03dac6", fontWeight: "bold", margin: 0 }}>${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductDetails;