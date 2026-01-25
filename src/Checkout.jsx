import { useState } from "react";
import { db } from "./firebase";// Import your database
import { collection, addDoc } from "firebase/firestore"; // Tools to add data
import { useNavigate } from "react-router-dom"; // Tool to change pages

function Checkout({ cart, onClearCart }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false); // To show "Processing..." spinner
  const navigate = useNavigate();

  // 1. Calculate Total Price
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // 2. The "Place Order" Function
  async function handleOrder(e) {
    e.preventDefault(); // Stop page from refreshing
    
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsProcessing(true);

    try {
      // A. Create the Order Receipt
      const orderReceipt = {
        customerName: name,
        customerAddress: address,
        items: cart, // Save exactly what they bought
        totalAmount: total,
        date: new Date().toLocaleString() // Timestamp
      };

      // B. Save to Firebase (This creates a new "orders" collection automatically!)
      const docRef = await addDoc(collection(db, "orders"), orderReceipt);
      
      console.log("Order written with ID: ", docRef.id);

      // C. Success!
      alert("Order Placed Successfully! ✅");
      onClearCart(); // Empty the cart
      // navigate("/"); 
console.log("I AM STOPPING HERE TO SHOW LOGS");

    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Something went wrong. Please try again.");
    }

    setIsProcessing(false);
  }

  return (
    <div style={{maxWidth: "600px", margin: "0 auto", padding: "20px", color: "white"}}>
      <h1 style={{textAlign: "center", marginBottom: "30px"}}>Checkout</h1>

      {/* Order Summary */}
      <div style={{background: "#1e1e1e", padding: "20px", borderRadius: "10px", marginBottom: "30px"}}>
        <h3>Order Summary</h3>
        {cart.map((item, index) => (
          <div key={index} style={{display: "flex", justifyContent: "space-between", margin: "10px 0", color: "#ccc"}}>
            <span>{item.name}</span>
            <span>${item.price}</span>
          </div>
        ))}
        <hr style={{borderColor: "#333", margin: "15px 0"}} />
        <div style={{display: "flex", justifyContent: "space-between", fontSize: "1.2rem", fontWeight: "bold"}}>
          <span>Total:</span>
          <span style={{color: "#03dac6"}}>${total}</span>
        </div>
      </div>

      {/* The Form */}
      <form onSubmit={handleOrder} style={{display: "flex", flexDirection: "column", gap: "15px"}}>
        
        <label>Full Name</label>
        <input 
          type="text" 
          required 
          placeholder="e.g. John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{padding: "15px", borderRadius: "8px", border: "none", fontSize: "1rem"}}
        />

        <label>Shipping Address</label>
        <textarea 
          required 
          placeholder="e.g. 123 Street, City"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{padding: "15px", borderRadius: "8px", border: "none", fontSize: "1rem", height: "100px"}}
        />

        <button 
          type="submit" 
          disabled={isProcessing}
          style={{
            padding: "20px",
            marginTop: "20px",
            backgroundColor: isProcessing ? "#555" : "#bb86fc", // Grey if processing, Purple if ready
            color: "black",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: isProcessing ? "not-allowed" : "pointer"
          }}
        >
          {isProcessing ? "Processing..." : "Place Order ($" + total + ")"}
        </button>

      </form>
    </div>
  );
}

export default Checkout;