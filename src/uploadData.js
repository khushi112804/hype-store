import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore"; 

const products = [
  // --- MEN ---
  {
    name: "Nike Air Max Red",
    category: "Men",
    brand: "Nike",
    price: 120,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Adidas Ultraboost White",
    category: "Men",
    brand: "Adidas",
    price: 180,
    image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aef4?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Puma Black Runner",
    category: "Men",
    brand: "Puma",
    price: 95,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80"
  },

  // --- WOMEN ---
  {
    name: "Nike Zoom Pegasus Pastel",
    category: "Women",
    brand: "Nike",
    price: 130,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Adidas Pink Trainer",
    category: "Women",
    brand: "Adidas",
    price: 110,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Puma Cali Dream",
    category: "Women",
    brand: "Puma",
    price: 90,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80"
  },

  // --- KIDS ---
  {
    name: "Nike Kids Court",
    category: "Kids",
    brand: "Nike",
    price: 65,
    image: "https://images.unsplash.com/photo-1514989940723-e8875ea6ab7d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Adidas Stan Smith Jr",
    category: "Kids",
    brand: "Adidas",
    price: 55,
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80"
  }
];

export const uploadData = async () => {
  try {
    const productsRef = collection(db, "products");
    for (const product of products) {
      await addDoc(productsRef, product);
    }
    alert("✅ Fresh Data Uploaded Successfully!");
  } catch (error) {
    console.error("Error uploading data:", error);
    alert("❌ Error uploading. Check console.");
  }
};