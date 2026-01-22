import { useEffect } from "react";

function Toast({ message, onClose }) {
  useEffect(() => {
    // Automatically close after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: "fixed",
      bottom: "30px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#333",
      color: "white",
      padding: "12px 24px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      zIndex: 1000,
      animation: "fadeIn 0.3s ease-in-out"
    }}>
      <span style={{color: "#03dac6", fontSize: "1.2rem"}}>✔</span>
      <span style={{fontWeight: "500"}}>{message}</span>
    </div>
  );
}

export default Toast;