function Wishlist({ wishlist, allProducts, onRemove, onBack, onAdd }) {
  
  // Filter logic
  const likedProducts = allProducts.filter(product => wishlist[product.id] === true);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px", color: "white", fontFamily: "'Montserrat', sans-serif" }}>
      
      {/* HEADER - FIXED LAYOUT */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "20px", 
        marginBottom: "40px",
        borderBottom: "1px solid #333", // Adds a nice separator line
        paddingBottom: "20px"
      }}>
        <button 
          onClick={onBack}
          style={{ 
            background: "transparent", 
            border: "1px solid #555", 
            color: "white", 
            padding: "10px 24px", 
            borderRadius: "30px", 
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: "600",
            transition: "all 0.2s",
            width: "fit-content", // PREVENTS STRETCHING
            whiteSpace: "nowrap"
          }}
          onMouseOver={(e) => { e.target.style.borderColor = "white"; e.target.style.background = "#222"; }}
          onMouseOut={(e) => { e.target.style.borderColor = "#555"; e.target.style.background = "transparent"; }}
        >
          ← Go Back
        </button>
        
        <h1 style={{ 
          margin: 0, 
          fontSize: "1.8rem", 
          fontWeight: "800",
          letterSpacing: "1px"
        }}>
          MY WISHLIST <span style={{ color: "#ff3f6c" }}>❤️</span>
        </h1>
      </div>

      {/* EMPTY STATE */}
      {likedProducts.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "80px", color: "#888" }}>
          <div style={{ fontSize: "4rem", marginBottom: "20px" }}>💔</div>
          <h2 style={{ fontSize: "1.5rem", color: "white", marginBottom: "10px" }}>Your wishlist is empty</h2>
          <p>Save items you love here to buy them later.</p>
          <button 
            onClick={onBack}
            style={{ 
                marginTop: "20px", padding: "12px 30px", background: "#03dac6", 
                color: "black", border: "none", borderRadius: "30px", fontWeight: "bold", cursor: "pointer" 
            }}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        /* PRODUCT GRID */
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "25px" }}>
          {likedProducts.map((product) => (
             <div key={product.id} style={{ background: "#1e1e1e", borderRadius: "12px", overflow: "hidden", position: "relative", border: "1px solid #333", transition: "transform 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
             >
               
               {/* Image Area */}
               <div style={{ width: "100%", aspectRatio: "4/5", background: "#2a2a2a", overflow: "hidden" }}>
                  <img src={product.image} style={{width: "100%", height: "100%", objectFit: "cover"}} />
               </div>

               {/* Remove Button (X) */}
               <button 
                 onClick={() => onRemove(product.id)}
                 style={{ 
                   position: "absolute", top: "10px", right: "10px", 
                   background: "rgba(0,0,0,0.5)", color: "white", border: "none", 
                   borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer",
                   display: "flex", alignItems: "center", justifyContent: "center",
                   backdropFilter: "blur(4px)", fontSize: "1rem"
                 }}
                 onMouseOver={(e) => e.target.style.background = "#cf6679"}
                 onMouseOut={(e) => e.target.style.background = "rgba(0,0,0,0.5)"}
               >
                 ✕
               </button>

               {/* Details */}
               <div style={{ padding: "15px" }}>
                 <h3 style={{ margin: "0 0 6px 0", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</h3>
                 <p style={{ color: "#03dac6", fontWeight: "bold", fontSize: "1.1rem", margin: "0 0 15px 0" }}>${product.price}</p>
                 
                 <button 
                   onClick={() => onAdd(product)}
                   style={{ 
                       width: "100%", padding: "12px", background: "white", color: "black", 
                       border: "none", borderRadius: "6px", fontWeight: "800", cursor: "pointer",
                       fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px"
                   }}
                   onMouseOver={(e) => e.target.style.background = "#ddd"}
                   onMouseOut={(e) => e.target.style.background = "white"}
                 >
                   MOVE TO BAG
                 </button>
               </div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;