import { useState } from "react";

function Checkout({ onCheckout }) {
  // 1. Form State (What the user types)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: ""
  });

  // 2. The Handler (Updates state when you type)
  function handleChange(e) {
    const { name, value } = e.target; // Get which box was typed in
    setFormData({
      ...formData, // Keep other inputs same
      [name]: value // Update ONLY the one that changed
    });
  }

  // 3. The Submit (When you click Pay)
  function handleSubmit(e) {
    e.preventDefault(); // Stop page from refreshing (Standard React Rule)
    onCheckout(formData); // Tell the App we are done
  }

  return (
    <div className="checkout-form">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            required 
            value={formData.name}
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            required 
            value={formData.email}
            onChange={handleChange} 
          />
        </div>

        <button type="submit" className="pay-btn">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;