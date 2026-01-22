import { products } from "../data";

function ProductDetails({ productId, onAdd, onBack }) {
  const product = products.find((p) => p.id === productId);

  if (!product) return <h2>Product not found!</h2>;

  return (
    <div className="product-details" style={{textAlign: "center", color: "white"}}>
      <button 
        onClick={onBack} 
        style={{background: "transparent", color: "#bb86fc", marginBottom: "20px", border: "none", fontSize: "1rem", cursor: "pointer"}}
      >
        ← Back to Home
      </button>
      
      <div className="card" style={{maxWidth: "600px", margin: "0 auto", padding: "40px", background: "#1e1e1e", borderRadius: "20px"}}>
        <img src={product.image} alt={product.name} style={{width: "100%", borderRadius: "10px"}} />
        <h1 style={{marginTop: "20px"}}>{product.name}</h1>
        <p className="price" style={{fontSize: "2rem", color: "#03dac6"}}>${product.price}</p>
        <p style={{color: "#b3b3b3", lineHeight: "1.6"}}>
          This is the premium {product.name}. Designed for ultimate comfort and street style. 
          Includes breathable mesh, reactive cushioning, and durable rubber soles.
        </p>
        <button onClick={() => onAdd(product)} style={{marginTop: "20px", fontSize: "1.2rem", padding: "15px 30px"}}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;