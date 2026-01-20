function Cart({ cartItems, onRemove }) {
  // MATH TIME: Calculate total price
  // "reduce" loops through the cart and adds up the prices starting from 0.
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      
      {/* 1. Logic: If cart is empty, show a message */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Go buy some kicks!</p>
      ) : (
        // 2. If not empty, show the list
        <div className="cart-list">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <span>{item.name}</span>
              <strong>${item.price}</strong>
              <button onClick={() => onRemove(index)} className="remove-btn">
                X
              </button>
            </div>
          ))}
        </div>
      )}

      <h3>Total: ${totalPrice}</h3>
    </div>
  );
}

export default Cart;