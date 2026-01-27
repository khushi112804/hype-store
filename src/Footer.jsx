import React from "react";

function Footer() {
  return (
    <footer style={{ background: "#181818", padding: "60px 20px 20px", borderTop: "1px solid #333", color: "#999", fontSize: "0.9rem", marginTop: "auto" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px" }}>
        
        {/* Column 1 */}
        <div>
          <h4 style={{ color: "white", textTransform: "uppercase", marginBottom: "20px", fontSize: "0.85rem", fontWeight: "bold" }}>Online Shopping</h4>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
            <li style={{ cursor: "pointer" }}>Men</li>
            <li style={{ cursor: "pointer" }}>Women</li>
            <li style={{ cursor: "pointer" }}>Kids</li>
            <li style={{ cursor: "pointer" }}>Home & Living</li>
            <li style={{ cursor: "pointer" }}>Beauty</li>
            <li style={{ cursor: "pointer" }}>Gift Cards</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h4 style={{ color: "white", textTransform: "uppercase", marginBottom: "20px", fontSize: "0.85rem", fontWeight: "bold" }}>Customer Policies</h4>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
            <li style={{ cursor: "pointer" }}>Contact Us</li>
            <li style={{ cursor: "pointer" }}>FAQ</li>
            <li style={{ cursor: "pointer" }}>T&C</li>
            <li style={{ cursor: "pointer" }}>Terms Of Use</li>
            <li style={{ cursor: "pointer" }}>Track Orders</li>
            <li style={{ cursor: "pointer" }}>Shipping</li>
            <li style={{ cursor: "pointer" }}>Cancellation</li>
          </ul>
        </div>

        {/* Column 3 - App & Socials */}
        <div>
          <h4 style={{ color: "white", textTransform: "uppercase", marginBottom: "20px", fontSize: "0.85rem", fontWeight: "bold" }}>Experience App</h4>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <button style={{ background: "#333", border: "1px solid #555", color: "white", padding: "8px 12px", borderRadius: "5px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                <span>🤖</span> Google Play
            </button>
            <button style={{ background: "#333", border: "1px solid #555", color: "white", padding: "8px 12px", borderRadius: "5px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                <span>🍎</span> App Store
            </button>
          </div>
          
          <h4 style={{ color: "white", textTransform: "uppercase", marginBottom: "15px", fontSize: "0.85rem", fontWeight: "bold" }}>Keep in touch</h4>
          <div style={{ display: "flex", gap: "15px", fontSize: "1.5rem" }}>
            <span style={{ cursor: "pointer" }}>📸</span>
            <span style={{ cursor: "pointer" }}>🐦</span>
            <span style={{ cursor: "pointer" }}>📘</span>
            <span style={{ cursor: "pointer" }}>▶️</span>
          </div>
        </div>

        {/* Column 4 - Guarantee */}
        <div>
           <div style={{ display: "flex", alignItems: "start", gap: "15px", marginBottom: "20px" }}>
               <span style={{ fontSize: "2rem" }}>✅</span>
               <div>
                   <strong style={{ color: "white" }}>100% ORIGINAL</strong>
                   <p style={{ margin: 0, fontSize: "0.8rem" }}>guarantee for all products at khushistore.com</p>
               </div>
           </div>
           <div style={{ display: "flex", alignItems: "start", gap: "15px" }}>
               <span style={{ fontSize: "2rem" }}>↺</span>
               <div>
                   <strong style={{ color: "white" }}>Return within 14days</strong>
                   <p style={{ margin: 0, fontSize: "0.8rem" }}>of receiving your order</p>
               </div>
           </div>
        </div>
      </div>
      
      {/* Bottom Copyright */}
      <div style={{ borderTop: "1px solid #333", marginTop: "40px", paddingTop: "20px", textAlign: "center" }}>
        <p>© 2026 Hype Store. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;