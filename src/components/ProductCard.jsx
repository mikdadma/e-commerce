import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div>
      <img
        src={product.image}
        alt={product.name}
        width="200"
      />

      <h2>{product.name}</h2>

      <p>Category: {product.category}</p>

      <p>Price: ₹{product.price}</p>

      <p>Stock: {product.stock}</p>

      <button onClick={() => navigate(`/products/${product.id}`)}>
        View Details
      </button>
    </div>
  );
}

export default ProductCard;