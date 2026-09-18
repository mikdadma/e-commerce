import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/orderService";
import { updateProductStock } from "../services/productService";
import { clearCart } from "../redux/slices/cartSlice";
import { getProductById } from "../services/productService";
import { clearCheckoutItem } from "../redux/slices/checkoutSlice";
import { fetchProducts } from "../redux/slices/productSlice";
import { useState } from "react";
import { toast } from "react-toastify";

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const buyNowItem = useSelector((state) => state.checkout.item);
  const [loading, setLoading] = useState(false);

  const checkoutItems = buyNowItem
    ? [buyNowItem]
    : cartItems;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = checkoutItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (checkoutItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto flex min-h-[80vh] w-full max-w-4xl items-center justify-center px-4 py-8 sm:px-6">

          <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg sm:p-12">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <span className="text-2xl">🛒</span>
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-green-600">
              M A PARTS
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
              Checkout
            </h1>

            <h2 className="mt-6 text-2xl font-bold text-gray-800">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              Add some vehicle parts before proceeding to checkout.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-7 rounded-xl bg-green-600 px-7 py-3.5 font-semibold text-white shadow-sm transition duration-300 hover:bg-green-700 hover:shadow-md"
            >
              Go to Products
            </button>

          </div>
        </div>
      </main>
    );
  }

  const handlePlaceOrder = async () => {
    const confirmOrder = window.confirm(
      "Are you sure you want to place this order?"
    );

    if (!confirmOrder) {
      return;
    }

    try {
      setLoading(true);

      for (const item of checkoutItems) {
        const latestProduct = await getProductById(item.id);

        if (latestProduct.stock < item.quantity) {
         toast.error(`${item.name} does not have enough stock`);
          return;
        }
      }

      const order = {
        userId: user.id,
        items: checkoutItems,
        total: totalPrice,
        date: new Date().toISOString(),
        status: "Placed"
      };

      const data = await createOrder(order);

      for (const item of checkoutItems) {
        const latestProduct = await getProductById(item.id);

        const newStock =
          latestProduct.stock - item.quantity;

        await updateProductStock(item.id, newStock);
      }

      dispatch(fetchProducts());

      if (buyNowItem) {
        dispatch(clearCheckoutItem());
      } else {
        dispatch(clearCart());
      }

      console.log("Order created:", data);

      toast.success("Order placed successfully");
      navigate("/orders");
    } catch (error) {
      console.log(error);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600">
            M A PARTS
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Review your order before placing it.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Left Side */}
          <div className="space-y-6 lg:col-span-2">

            {/* Customer Information */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="flex items-center gap-4 border-b border-gray-100 pb-5">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50">
                  <span className="font-bold text-green-600">
                    01
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Customer Information
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Your account details
                  </p>
                </div>

              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Name
                  </p>

                  <p className="mt-2 break-words font-semibold text-gray-800">
                    {user?.name}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Email
                  </p>

                  <p className="mt-2 break-words font-semibold text-gray-800">
                    {user?.email}
                  </p>
                </div>

              </div>
            </section>

            {/* Order Summary */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="flex items-center gap-4 border-b border-gray-100 pb-5">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50">
                  <span className="font-bold text-green-600">
                    02
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Order Summary
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Products in your order
                  </p>
                </div>

              </div>

              <div className="mt-5 space-y-3">

                {checkoutItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >

                    <div className="min-w-0">
                      <p className="break-words font-semibold text-gray-800">
                        {item.name}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>

                    <p className="font-bold text-green-600 sm:shrink-0">
                      ₹{item.price * item.quantity}
                    </p>

                  </div>
                ))}

              </div>
            </section>

          </div>

          {/* Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

              {/* Summary Header */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Payment Summary
                </p>

                <h2 className="mt-1 text-2xl font-extrabold text-gray-800">
                  Order Total
                </h2>
              </div>

              {/* Price Details */}
              <div className="mt-6 space-y-4">

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Products
                  </span>

                  <span className="font-semibold text-gray-800">
                    {checkoutItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-semibold text-gray-800">
                    ₹{totalPrice}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Delivery
                  </span>

                  <span className="font-semibold text-green-600">
                    Free
                  </span>
                </div>

              </div>

              <div className="my-6 border-t border-gray-200"></div>

              {/* Total */}
              <div className="flex items-center justify-between">

                <span className="text-lg font-bold text-gray-800">
                  Total
                </span>

                <span className="text-2xl font-extrabold text-green-600">
                  ₹{totalPrice}
                </span>

              </div>

              {/* Place Order */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-green-600 px-5 py-3.5 font-semibold text-white shadow-sm transition duration-300 hover:bg-green-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
              >
                {loading
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

              {/* Back to Cart */}
              <button
                onClick={() => {
                  dispatch(clearCheckoutItem());
                  navigate("/cart");
                }}
                className="mt-3 w-full rounded-xl border border-gray-300 bg-white px-5 py-3.5 font-semibold text-gray-700 transition duration-300 hover:bg-gray-100"
              >
                ← Back to Cart
              </button>

              {/* Secure Message */}
              <div className="mt-5 rounded-xl bg-gray-50 p-4 text-center">
                <p className="text-xs leading-5 text-gray-500">
                  Please review your order carefully before placing it.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Checkout;