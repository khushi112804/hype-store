import { useState, useEffect } from "react";
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore";

function Home({ onAdd, onProductClick }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsRef = collection(db, "products");
        const snapshot = await getDocs(productsRef);
        const productsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shoes:", error);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div style={{maxWidth: "1200px", margin: "0 auto", paddingBottom: "50px"}}>
      
      {/* 1. SEARCH BAR */}
      <div style={{textAlign: "center", margin: "30px 0 40px 0"}}>
        <input 
          type="text" 
          placeholder="Search your next cop..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "15px 30px",
            width: "100%", maxWidth: "500px",
            borderRadius: "50px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            fontSize: "1rem",
            background: "rgba(255, 255, 255, 0.05)",
            color: "white", outline: "none",
            backdropFilter: "blur(10px)",
            fontFamily: "'Montserrat', sans-serif",
            transition: "all 0.3s ease"
          }}
          onFocus={(e) => e.target.style.borderColor = "#03dac6"}
          onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.2)"}
        />
      </div>

      {/* 2. CATEGORY BUTTONS (FIXED LAYOUT) */}
      <div style={{
        display: "flex", 
        flexDirection: "row", // FORCE ROW
        flexWrap: "wrap",     // Allow wrapping if screen is tiny
        gap: "15px", 
        justifyContent: "center", 
        marginBottom: "40px"
      }}>
        {["All", "Nike", "Adidas", "Puma"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              // FORCE WIDTH TO BE AUTOMATIC (Fixes the stretching issue)
              width: "auto", 
              minWidth: "80px",
              padding: "10px 25px",
              borderRadius: "30px",
              border: selectedCategory === category ? "none" : "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "0.9rem",
              fontFamily: "'Montserrat', sans-serif",
              background: selectedCategory === category 
                ? "linear-gradient(135deg, #03dac6 0%, #02a394 100%)" 
                : "rgba(255,255,255,0.05)",
              color: selectedCategory === category ? "black" : "white",
              transition: "transform 0.2s ease"
            }}
            onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
            onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 3. PRODUCT GRID */}
      <div style={{
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
        gap: "30px",
        padding: "10px"
      }}>
        {loading ? (
          <p style={{color: "white", textAlign: "center", width: "100%"}}>Loading Collection...</p>
        ) : (
          filteredProducts.map((product) => (
            
            // --- FIXED CARD DESIGN ---
            <div 
              key={product.id} 
              onClick={() => onProductClick(product)}
              style={{
                background: "#1e1e1e",
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: "1px solid rgba(255,255,255,0.08)",
                position: "relative",
                display: "flex",
                flexDirection: "column"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.border = "1px solid rgba(3, 218, 198, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
              }}
            >
              {/* Image */}
              <div style={{
                height: "220px", 
                background: "#2a2a2a",
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative"
              }}>
                 <img src={product.image} alt={product.name} style={{width: "100%", height: "100%", objectFit: "cover"}} />
                 <span style={{
                   position: "absolute", top: "10px", left: "10px",
                   background: "rgba(0,0,0,0.6)", color: "white",
                   padding: "4px 8px", borderRadius: "6px", fontSize: "0.6rem",
                   fontWeight: "bold", fontFamily: "'Montserrat', sans-serif"
                 }}>
                   {product.category.toUpperCase()}
                 </span>
              </div>

              {/* Details (FIXED OVERLAP HERE) */}
              <div style={{padding: "15px"}}>
                <h3 style={{
                  margin: "0 0 5px 0", fontSize: "1rem", fontWeight: 700, 
                  color: "white", fontFamily: "'Montserrat', sans-serif",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                }}>
                  {product.name}
                </h3>
                <p style={{margin: "0 0 15px 0", color: "#888", fontSize: "0.8rem"}}>Premium Kicks</p>
                
                {/* ROW: PRICE LEFT, BUTTON RIGHT */}
                <div style={{
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    gap: "10px" // Forces space between Price and Button
                }}>
                   <span style={{
                     color: "#03dac6", fontSize: "1.1rem", fontWeight: "800", fontFamily: "'Montserrat', sans-serif"
                   }}>
                     ${product.price}
                   </span>
                   
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       onAdd(product);
                     }}
                     style={{
                       // COMPACT BUTTON STYLE
                       padding: "6px 14px", 
                       borderRadius: "20px", 
                       border: "none",
                       background: "white", 
                       color: "black", 
                       fontWeight: "800",
                       fontSize: "0.7rem", // Smaller Font
                       cursor: "pointer", 
                       fontFamily: "'Montserrat', sans-serif",
                       whiteSpace: "nowrap" // Prevents button text breaking
                     }}
                   >
                     ADD +
                   </button>
                </div>
              </div>
            </div>

          ))
        )}
      </div>
    </div>
  );
}

export default Home;