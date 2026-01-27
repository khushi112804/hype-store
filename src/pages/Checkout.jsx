import { useState } from "react";

function Checkout({ total, onPlaceOrder, onBack }) {
  const [details, setDetails] = useState({ name: "", address: "", card: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!details.name || !details.address || !details.card) {
      alert("Please fill in all fields! 📝");
      return;
    }
    onPlaceOrder();
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "40px 20px", color: "white" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "40px" }}>
        <button onClick={onBack} style={{ background: "transparent", border: "1px solid #555", color: "white", padding: "8px 20px", borderRadius: "30px", cursor: "pointer" }}>← Back</button>
        <h1 style={{ margin: 0 }}>Checkout 💳</h1>
      </div>

      <div style={{ background: "#1e1e1e", padding: "30px", borderRadius: "12px", border: "1px solid #333" }}>
        <h2 style={{ borderBottom: "1px solid #333", paddingBottom: "15px", marginBottom: "20px" }}>Order Summary: <span style={{ color: "#03dac6" }}>${total}</span></h2>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#ccc" }}>Full Name</label>
            <input 
              type="text" placeholder="John Doe" 
              value={details.name} onChange={(e) => setDetails({...details, name: e.target.value})}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #444", background: "#2a2a2a", color: "white", outline: "none" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#ccc" }}>Shipping Address</label>
            <textarea 
              rows="3" placeholder="123 Street, City..." 
              value={details.address} onChange={(e) => setDetails({...details, address: e.target.value})}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #444", background: "#2a2a2a", color: "white", outline: "none", resize: "none" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#ccc" }}>Card Number</label>
            <input 
              type="text" placeholder="XXXX-XXXX-XXXX-XXXX" 
              value={details.card} onChange={(e) => setDetails({...details, card: e.target.value})}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #444", background: "#2a2a2a", color: "white", outline: "none" }}
            />
          </div>

          <button 
            type="submit"
            style={{ 
              marginTop: "20px", padding: "15px", background: "white", color: "black", 
              border: "none", borderRadius: "50px", fontWeight: "900", cursor: "pointer", fontSize: "1.1rem" 
            }}
          >
            PAY ${total} & PLACE ORDER
          </button>

        </form>
      </div>
    </div>
  );
}

export default Checkout;