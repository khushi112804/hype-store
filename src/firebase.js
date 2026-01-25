import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // We need this for the database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdPAiuzu-2q5Mrws5tFxgXgJnGotoSrH0",
  authDomain: "hype-store-real.firebaseapp.com",
  projectId: "hype-store-real",
  storageBucket: "hype-store-real.firebasestorage.app",
  messagingSenderId: "541705204294",
  appId: "1:541705204294:web:3603c9858f9c122e4a1047"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and Export the Database
export const db = getFirestore(app);