function Cart({ cartItems, onRemove, onBack, onCheckout }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", color: "white" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "40px" }}>
        <button onClick={onBack} style={{ background: "transparent", border: "1px solid #555", color: "white", padding: "8px 20px", borderRadius: "30px", cursor: "pointer" }}>← Back</button>
        <h1 style={{ margin: 0 }}>Shopping Bag ({cartItems.length})</h1>
      </div>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "100px", color: "#666" }}>
          <h2>Your bag is empty 😔</h2>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {cartItems.map((item, index) => (
            <div key={index} style={{ display: "flex", background: "#1e1e1e", borderRadius: "10px", padding: "15px", alignItems: "center", gap: "20px", border: "1px solid #333" }}>
              {/* FIXED BROKEN IMAGE */}
              <img 
                src={item.image} 
                onError={(e) => { e.target.src = "https://placehold.co/100x100?text=No+Img"; }}
                style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }} 
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 5px 0", fontSize: "1rem" }}>{item.name}</h3>
                <p style={{ margin: 0, color: "#888" }}>Size: 9 (US)</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontWeight: "bold", fontSize: "1.1rem", margin: "0 0 10px 0", color: "#03dac6" }}>${item.price}</p>
                <button onClick={() => onRemove(index)} style={{ background: "#cf6679", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>Remove</button>
              </div>
            </div>
          ))}

          {/* CHECKOUT SECTION - FIXED OVERLAP */}
          <div style={{ 
            marginTop: "40px", paddingTop: "30px", borderTop: "1px solid #333", 
            display: "flex", justifyContent: "space-between", alignItems: "center", 
            flexWrap: "wrap", gap: "20px" // Adds space if screen is small
          }}>
            <div>
               <p style={{ color: "#aaa", marginBottom: "5px" }}>Total Amount:</p>
               <h1 style={{ margin: 0, color: "white", fontSize: "2.5rem" }}>${total}</h1>
            </div>
            <button 
              onClick={onCheckout} // Triggers the page switch
              style={{ 
                padding: "15px 40px", background: "white", color: "black", 
                border: "none", borderRadius: "30px", fontWeight: "900", cursor: "pointer", fontSize: "1rem" 
              }}
            >
              CHECKOUT NOW
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;