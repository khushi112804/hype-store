// 1. Accept "onAdd" as a prop
function ProductCard({ product, onAdd }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      
      {/* 2. When clicked, run the onAdd function with this specific product */}
      <button onClick={() => onAdd(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;