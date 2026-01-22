// NOTICE: No imports needed!

function ProductCard({ product, onAdd, onClick }) {
  return (
    <div className="product-card">
      {/* When clicked, tell App.jsx to switch views */}
      <div onClick={onClick} style={{cursor: "pointer"}}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
      </div>
      
      <p className="price">${product.price}</p>
      <button onClick={() => onAdd(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;