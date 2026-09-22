import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist } from "../redux/slices/wishlistSlice";
import { setCheckoutItem } from "../redux/slices/checkoutSlice";
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product?.id
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setQuantity(1);
      } catch {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-green-600"></div>

          <h1 className="mt-6 text-2xl font-bold text-gray-800">
            Loading Product
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Please wait while we load the product details.
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <span className="text-2xl font-bold text-red-600">
              !
            </span>
          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-800">
            {error}
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Something went wrong while loading this product.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 w-full rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-green-700"
          >
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <span className="text-xl font-bold text-gray-500">
              ?
            </span>
          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-800">
            Product not found
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            The product you are looking for does not exist.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 w-full rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-green-700"
          >
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <div className="mb-3">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition duration-300 hover:text-green-600"
          >
            ← Back to Products
          </button>
        </div>

        {/* Page Heading */}
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600">
            M A PARTS
          </p>

          <h1 className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            {product.name}
          </h1>
        </div>

        {/* Main Product Section */}
        <div className="grid items-stretch gap-5 lg:grid-cols-2">

          {/* ================= IMAGE SECTION ================= */}
          <div className="flex min-h-[520px] items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:min-h-[560px] lg:min-h-[570px]">

            <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-gray-50 p-4">

              {/* Category Badge */}
              <div className="absolute left-4 top-4 z-10">
                <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-md">
                  {product.category}
                </span>
              </div>

              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[450px] w-full object-contain transition duration-500 hover:scale-105 sm:max-h-[490px]"
              />

            </div>
          </div>

          {/* ================= PRODUCT INFORMATION ================= */}
          <div className="flex min-h-[520px] flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:min-h-[560px] sm:p-6 lg:min-h-[570px]">

            {/* Category */}
            <div>
              <span className="inline-flex rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                {product.category}
              </span>
            </div>

            {/* Price */}
            <div className="mt-4 border-b border-gray-100 pb-4">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Price
              </p>

              <p className="mt-1 text-3xl font-extrabold text-green-600 sm:text-4xl">
                ₹{product.price}
              </p>
            </div>

            {/* Stock */}
            <div className="py-4">
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                  In Stock: {product.stock}
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                  Out of Stock
                </span>
              )}
            </div>

            {/* Out of Stock Message */}
            {product.stock === 0 && (
              <p className="mb-4 rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-semibold text-red-600">
                Sorry, this product is currently out of stock.
              </p>
            )}

            {/* Description */}
            <div className="border-t border-gray-100 pt-4">
              <h2 className="text-xl font-bold text-gray-800">
                Description
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                {product.description}
              </p>
            </div>

            {/* Quantity */}
            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                Quantity
              </p>

              <div className="flex w-fit items-center rounded-xl border border-gray-200 bg-white p-1 shadow-sm">

                <button
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-lg font-bold text-gray-700 transition duration-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  −
                </button>

                <span className="min-w-12 text-center text-lg font-bold text-gray-800">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(
                      (prev) =>
                        Math.min(prev + 1, product.stock)
                    )
                  }
                  disabled={quantity === product.stock}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-lg font-bold text-white transition duration-300 hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  +
                </button>

              </div>
            </div>

            {/* Main Actions */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

              <button
                disabled={product.stock === 0}
                onClick={() => {
                  dispatch(
                    addToCart({
                      ...product,
                      quantity: quantity
                    })
                  );

                  navigate("/cart");
                }}
                className="w-full rounded-xl bg-green-600 px-5 py-3 font-semibold text-white shadow-sm transition duration-300 hover:bg-green-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
              >
                {product.stock === 0
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>

              <button
                disabled={product.stock === 0}
                onClick={() => {
                  dispatch(
                    setCheckoutItem({
                      ...product,
                      quantity: quantity
                    })
                  );

                  navigate("/checkout");
                }}
                className="w-full rounded-xl bg-gray-900 px-5 py-3 font-semibold text-white shadow-sm transition duration-300 hover:bg-gray-800 hover:shadow-md disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
              >
                {product.stock === 0
                  ? "Out of Stock"
                  : "Buy Now"}
              </button>

            </div>

            {/* Wishlist */}
            <div className="mt-3">
              <button
                disabled={isWishlisted}
                onClick={() => {
                  dispatch(addToWishlist(product));
                  toast.success("Added to wishlist");
                }}
                className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition duration-300 hover:border-green-600 hover:text-green-600 disabled:cursor-not-allowed disabled:border-green-200 disabled:bg-green-50 disabled:text-green-700"
              >
                {isWishlisted
                  ? "✓ Added to Wishlist"
                  : "♡ Add to Wishlist"}
              </button>
            </div>

            {/* Bottom Back Button */}
            <div className="mt-3 border-t border-gray-100 pt-3">
              <button
                onClick={() => navigate("/")}
                className="w-full rounded-xl bg-gray-100 px-5 py-3 font-semibold text-gray-700 transition duration-300 hover:bg-gray-200"
              >
                ← Back to Products
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;