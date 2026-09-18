import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatedItems, setUpdatedItems] = useState([]);

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  useEffect(() => {
    const updateStock = async () => {
      const latestItems = await Promise.all(
        wishlistItems.map(async (item) => {
          const latestProduct = await getProductById(item.id);
          return latestProduct;
        })
      );

      setUpdatedItems(latestItems);
    };

    updateStock();
  }, [wishlistItems]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto min-h-[80vh] w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600">
            M A PARTS
          </p>

          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                My Wishlist
              </h1>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Save your favorite vehicle parts for later.
              </p>
            </div>

            {wishlistItems.length > 0 && (
              <div className="w-fit rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                {wishlistItems.length} saved
              </div>
            )}
          </div>
        </div>

        {/* Empty Wishlist */}
        {wishlistItems.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <span className="text-2xl text-green-600">
                ♡
              </span>
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-800 sm:text-3xl">
              Your wishlist is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
              Add products to your wishlist to see them here.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-7 rounded-xl bg-green-600 px-7 py-3.5 font-semibold text-white shadow-sm transition duration-300 hover:bg-green-700 hover:shadow-md"
            >
              Browse Products
            </button>

          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">

            {updatedItems.map((item) => (
              <div
                key={item.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
              >

                {/* Image */}
                <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gray-50 p-5 sm:h-56">

                  <div className="absolute left-4 top-4 z-10">
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-gray-600 shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Product Information */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">

                  <h2 className="text-xl font-bold leading-7 text-gray-800 transition duration-300 group-hover:text-green-700">
                    {item.name}
                  </h2>

                  {/* Price */}
                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Price
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-green-600">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* Stock */}
                  <div className="mt-4">
                    {item.stock > 0 ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        In Stock: {item.stock}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700">
                        <span className="h-2 w-2 rounded-full bg-red-500"></span>
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Out of Stock Message */}
                  {item.stock === 0 && (
                    <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4">
                      <p className="text-sm font-semibold text-red-700">
                        This product is currently out of stock.
                      </p>

                      <p className="mt-1 text-xs text-red-600">
                        Please check back later.
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-auto pt-6">

                    {/* Add to Cart */}
                    <button
                      disabled={item.stock === 0}
                      className="w-full rounded-xl bg-green-600 px-4 py-3.5 font-semibold text-white shadow-sm transition duration-300 hover:bg-green-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
                      onClick={async () => {
                        try {
                          const latestProduct =
                            await getProductById(item.id);

                          if (latestProduct.stock === 0) {
                            toast.error(
                              "This product is currently out of stock"
                            );
                            return;
                          }

                          dispatch(addToCart(latestProduct));
                          navigate("/cart");
                        } catch (error) {
                          console.log(error);
                          toast.error(
                            "Failed to check product stock"
                          );
                        }
                      }}
                    >
                      {item.stock === 0
                        ? "Out of Stock"
                        : "Add to Cart"}
                    </button>

                    {/* View Details */}
                    <button
                      onClick={() =>
                        navigate(`/products/${item.id}`)
                      }
                      className="mt-3 w-full rounded-xl border border-green-600 bg-white px-4 py-3.5 font-semibold text-green-600 transition duration-300 hover:bg-green-50"
                    >
                      View Details
                    </button>

                    {/* Remove */}
                    <button
                      onClick={() => {
                        const confirmRemove = window.confirm(
                          "Are you sure you want to remove this item?"
                        );

                        if (confirmRemove) {
                          dispatch(removeFromWishlist(item.id));
                        }
                      }}
                      className="mt-3 w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 font-semibold text-red-600 transition duration-300 hover:bg-red-600 hover:text-white"
                    >
                      Remove from Wishlist
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

        {/* Continue Shopping */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/")}
            className="w-full rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition duration-300 hover:bg-gray-100 sm:w-auto"
          >
            ← Continue Shopping
          </button>
        </div>

      </div>
    </main>
  );
}

export default Wishlist;