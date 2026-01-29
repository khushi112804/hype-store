import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Login Successful! 🎉");
      navigate("/"); // Go back to Home after login
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Check console for details.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px", minHeight: "60vh", color: "white" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "30px" }}>Join the Hype</h2>
      
      <button 
        onClick={handleGoogleLogin}
        style={{
          padding: "15px 30px", background: "#4285F4", color: "white",
          border: "none", borderRadius: "5px", fontSize: "1.2rem", 
          cursor: "pointer", display: "flex", alignItems: "center", gap: "10px",
          margin: "0 auto", fontFamily: "'Montserrat', sans-serif"
        }}
      >
        <span style={{ background: "white", color: "#4285F4", borderRadius: "2px", padding: "5px 10px", fontWeight: "bold" }}>G</span>
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;