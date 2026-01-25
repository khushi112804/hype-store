import { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Home({ onAdd, onProductClick }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Two separate "Memories" for our filters
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // New: Tracks what you type

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

  // The "Super Filter": Checks BOTH Category AND Search Text
  const filteredProducts = products.filter((product) => {
    // 1. Check Category
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    
    // 2. Check Search Text (Convert both to lowercase so "Nike" matches "nike")
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Only keep the shoe if BOTH are true
    return categoryMatch && searchMatch;
  });

  return (
    <div style={{maxWidth: "1200px", margin: "0 auto"}}>
      
      {/* SEARCH BAR SECTION */}
      <div style={{textAlign: "center", margin: "20px 0"}}>
        <input 
          type="text" 
          placeholder="Search for shoes..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "12px 20px",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "25px",
            border: "none",
            fontSize: "1rem",
            backgroundColor: "#333",
            color: "white",
            outline: "none"
          }}
        />
      </div>

      {/* CATEGORY BUTTONS */}
      <div style={{
        display: "flex", 
        gap: "15px", 
        justifyContent: "center", 
        marginBottom: "30px"
      }}>
        {["All", "Nike", "Adidas", "Puma"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: "10px 25px",
              borderRadius: "25px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
              backgroundColor: selectedCategory === category ? "#03dac6" : "#333",
              color: selectedCategory === category ? "black" : "white",
              transition: "all 0.3s ease"
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="product-grid">
        {loading ? (
          <p style={{color: "white", textAlign: "center", width: "100%"}}>Loading shoes...</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAdd={onAdd}
              onClick={() => onProductClick(product)}
            />
          ))
        )}
      </div>

      {!loading && filteredProducts.length === 0 && (
        <p style={{color: "#888", textAlign: "center", marginTop: "50px"}}>
          No shoes found matching your search.
        </p>
      )}
    </div>
  );
}

export default Home;