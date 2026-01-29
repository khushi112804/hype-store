// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // For Login
import { getFirestore } from "firebase/firestore";           // <--- ADD THIS (For Database)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdPAiuzu-2q5Mrws5tFxgXgjnGotosrH0",
  authDomain: "hype-store-real.firebaseapp.com",
  projectId: "hype-store-real",
  storageBucket: "hype-store-real.firebasestorage.app",
  messagingSenderId: "541705204294",
  appId: "1:541705204294:web:3603c9858f9c122e4a1047"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// EXPORT EVERYTHING (Auth + Database)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);  // <--- ADD THIS BACK