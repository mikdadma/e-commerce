import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1>{product.name}</h1>

      <img
        src={product.image}
        alt={product.name}
        width="300"
      />

      <p>Category: {product.category}</p>

      <p>Price: ₹{product.price}</p>

      <p>Stock: {product.stock}</p>

      <p>{product.description}</p>
<button
  onClick={() => {
    dispatch(addToCart(product));
     navigate("/cart");
  }}
>
  Add to Cart
</button>

      <button onClick={() => navigate("/")}>
        Back to Products
      </button>
    </div>
  );
}

export default ProductDetails;