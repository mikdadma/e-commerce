import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity
} from "../redux/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  
  const totalPrice = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);
  return (
    <div>
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        cartItems.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>

            <p>Price: ₹{item.price}</p>

            <p>Stock: {item.stock}</p>

            <p>Quantity: {item.quantity}</p>

            <button
              onClick={() => dispatch(decreaseQuantity(item.id))}
            >
              -
            </button>

            <span> {item.quantity} </span>

            <button
              onClick={() => dispatch(increaseQuantity(item.id))}
            >
              +
            </button>

            <br />

            <button
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>
          </div>
        ))
      )}
      <h2>Total: ₹{totalPrice}</h2>
    </div>
  );
}

export default Cart;