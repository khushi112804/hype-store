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
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#03dac6",
      color: "black",
      padding: "12px 24px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      fontWeight: "bold",
      zIndex: 1000,
      animation: "fadeIn 0.3s ease-in-out"
    }}>
      {message}
    </div>
  );
}

export default Toast;