import { useState } from "react";
import { products } from "../data"; 
import ProductCard from "../ProductCard";

function Home({ onAdd, onProductClick }) {
  const [searchTerm, setSearchTerm] = useState("");

  const visibleProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search for shoes..."
        className="search-bar"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid">
        {visibleProducts.map((item) => (
          <ProductCard 
            key={item.id} 
            product={item} 
            onAdd={onAdd}
            onClick={() => onProductClick(item)} // <-- Connects the wire
          />
        ))}
      </div>
    </>
  );
}

export default Home;