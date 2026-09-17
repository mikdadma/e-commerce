import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity
} from "../redux/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600">
            M A PARTS
          </p>

          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Shopping Cart
              </h1>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Review your selected vehicle parts before checkout.
              </p>
            </div>

            {cartItems.length > 0 && (
              <div className="w-fit rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                {cartItems.length} item
                {cartItems.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <span className="text-2xl text-gray-500">
                🛒
              </span>
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-800 sm:text-3xl">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
              Add some vehicle parts to your cart and come back here to checkout.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-7 rounded-xl bg-green-600 px-7 py-3.5 font-semibold text-white shadow-sm transition duration-300 hover:bg-green-700 hover:shadow-md"
            >
              Browse Products
            </button>

          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">

            {/* Cart Items */}
            <div className="space-y-5 lg:col-span-2">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-5 p-5 sm:flex-row sm:p-6">

                    {/* Product Image */}
                    <div className="flex h-48 w-full shrink-0 items-center justify-center rounded-xl bg-gray-50 p-4 sm:h-44 sm:w-48">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain transition duration-300 hover:scale-105"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex min-w-0 flex-1 flex-col">

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
                            {item.name}
                          </h2>

                          <p className="mt-1 text-sm text-gray-400">
                            Vehicle Part
                          </p>
                        </div>

                        <p className="text-xl font-extrabold text-green-600">
                          ₹{item.price}
                        </p>
                      </div>

                      {/* Stock */}
                      <div className="mt-4">
                        <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                          Available stock: {item.stock}
                        </span>
                      </div>

                      {/* Quantity */}
                      <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">

                        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                          Quantity
                        </p>

                        <div className="flex w-fit items-center rounded-xl border border-gray-200 bg-white p-1 shadow-sm">

                          <button
                            onClick={() =>
                              dispatch(decreaseQuantity(item.id))
                            }
                            disabled={item.quantity === 1}
                            className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 text-xl font-bold text-gray-700 transition duration-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            −
                          </button>

                          <span className="min-w-14 text-center text-lg font-bold text-gray-800">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              dispatch(increaseQuantity(item.id))
                            }
                            disabled={item.quantity >= item.stock}
                            className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-600 text-xl font-bold text-white transition duration-300 hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                          >
                            +
                          </button>

                        </div>
                      </div>

                      {/* Remove */}
                      <div className="mt-4">
                        <button
                          onClick={() => {
                            const confirmRemove = window.confirm(
                              "Are you sure you want to remove this item?"
                            );

                            if (confirmRemove) {
                              dispatch(removeFromCart(item.id));
                            }
                          }}
                          className="rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition duration-300 hover:bg-red-600 hover:text-white"
                        >
                          Remove Item
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Item Subtotal */}
                  <div className="border-t border-gray-100 bg-gray-50 px-5 py-3 sm:px-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Item total
                      </span>

                      <span className="font-bold text-gray-800">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>

                </div>
              ))}

            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

                <h2 className="text-xl font-bold text-gray-800">
                  Order Summary
                </h2>

                <div className="mt-5 space-y-4">

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      Items
                    </span>

                    <span className="font-semibold text-gray-800">
                      {cartItems.reduce(
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

                <div className="my-5 border-t border-gray-200"></div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-800">
                    Total
                  </span>

                  <span className="text-2xl font-extrabold text-green-600">
                    ₹{totalPrice}
                  </span>
                </div>

                {/* Checkout */}
                <button
                  onClick={() => navigate("/checkout")}
                  className="mt-6 w-full rounded-xl bg-green-600 px-5 py-3.5 font-semibold text-white shadow-sm transition duration-300 hover:bg-green-700 hover:shadow-md"
                >
                  Proceed to Checkout
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={() => navigate("/")}
                  className="mt-3 w-full rounded-xl border border-gray-300 bg-white px-5 py-3.5 font-semibold text-gray-700 transition duration-300 hover:bg-gray-100"
                >
                  Continue Shopping
                </button>

              </div>
            </div>

          </div>
        )}

        {/* Bottom Total for Empty Cart */}
        {cartItems.length === 0 && (
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Cart Total
                </p>

                <p className="mt-1 text-2xl font-extrabold text-gray-800">
                  ₹{totalPrice}
                </p>
              </div>

              <button
                onClick={() => navigate("/")}
                className="w-full rounded-xl bg-gray-800 px-6 py-3.5 font-semibold text-white transition duration-300 hover:bg-gray-900 sm:w-auto"
              >
                Continue Shopping
              </button>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}

export default Cart;