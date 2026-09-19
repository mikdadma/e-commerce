import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrders, updateOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";
import {
  getProductById,
  updateProductStock
} from "../services/productService";
import { toast } from "react-toastify";

function Orders() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();

        const userOrders = data
          .filter((order) => order.userId === user.id)
          .sort(
            (a, b) =>
              new Date(b.date) - new Date(a.date)
          );

        setOrders(userOrders);
      } catch (error) {
        console.log(error);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.id]);

  if (loading) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-green-600"></div>

          <h1 className="mt-6 text-2xl font-bold text-gray-800">
            Loading Orders
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Please wait while we load your order history.
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
            Something went wrong while loading your orders.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 w-full rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white transition duration-300 hover:bg-green-700"
          >
            Back to Products
          </button>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* PAGE HEADER */}
        <div className="mb-8">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600">
            M A PARTS
          </p>

          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                My Orders
              </h1>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Track and manage your vehicle parts orders.
              </p>

            </div>

            {orders.length > 0 && (
              <div className="w-fit rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                {orders.length} order
                {orders.length !== 1 ? "s" : ""}
              </div>
            )}

          </div>

        </div>


        {/* EMPTY ORDERS */}
        {orders.length === 0 ? (

          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <span className="text-2xl text-green-600">
                📦
              </span>
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-800 sm:text-3xl">
              No orders found
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
              You have not placed any orders yet.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-7 rounded-xl bg-green-600 px-7 py-3.5 font-semibold text-white shadow-sm transition duration-300 hover:bg-green-700 hover:shadow-md"
            >
              Start Shopping
            </button>

          </div>

        ) : (

          /* ORDERS */
          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:shadow-lg"
              >

                {/* ORDER HEADER */}
                <div className="border-b border-gray-100 bg-gray-50 px-5 py-5 sm:px-6">

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Order ID
                      </p>

                      <h2 className="mt-1 break-all text-xl font-extrabold text-gray-800 sm:text-2xl">
                        #{order.id}
                      </h2>

                    </div>

                    <div
                      className={`w-fit rounded-full px-4 py-2 text-sm font-bold ${
                        order.status === "Placed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </div>

                  </div>

                </div>


                {/* ORDER CONTENT */}
                <div className="p-5 sm:p-6">


                  {/* DELIVERY ADDRESS */}
                  {order.address && (
                    <section className="mb-6 rounded-2xl border border-green-100 bg-green-50 p-5">

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                        <div className="flex gap-4">

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-600 text-lg text-white">
                            📍
                          </div>

                          <div className="min-w-0">

                            <p className="text-xs font-bold uppercase tracking-wider text-green-600">
                              Delivery Address
                            </p>

                            <h3 className="mt-1 text-lg font-bold text-gray-800">
                              {order.address.name}
                            </h3>

                            <p className="mt-2 break-words text-sm leading-6 text-gray-600">
                              {order.address.house},{" "}
                              {order.address.street}
                              <br />
                              {order.address.city},{" "}
                              {order.address.state} -{" "}
                              {order.address.pincode}
                            </p>

                            <p className="mt-2 text-sm font-semibold text-gray-700">
                              Phone: {order.address.phone}
                            </p>

                          </div>

                        </div>

                      </div>

                    </section>
                  )}


                  {/* OLD ORDERS WITHOUT ADDRESS */}
                  {!order.address && (
                    <div className="mb-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-4">

                      <p className="text-sm font-semibold text-yellow-700">
                        Delivery address is not available for this order.
                      </p>

                    </div>
                  )}


                  {/* ORDER ITEMS */}
                  <div className="mb-5">

                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Order Items
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {order.items.length} product
                      {order.items.length !== 1 ? "s" : ""} in this order
                    </p>

                  </div>


                  <div className="space-y-4">

                    {order.items.map((item) => (

                      <div
                        key={item.id}
                        className="rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5"
                      >

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                          {/* PRODUCT IMAGE */}
                          <div className="flex h-32 w-full shrink-0 items-center justify-center rounded-xl bg-white p-4 sm:h-28 sm:w-32">

                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-contain transition duration-300 hover:scale-105"
                            />

                          </div>


                          {/* PRODUCT DETAILS */}
                          <div className="min-w-0 flex-1">

                            <p className="break-words text-lg font-bold text-gray-800">
                              {item.name}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">

                              <span className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-600">
                                Quantity: {item.quantity}
                              </span>

                              <span className="rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
                                ₹{item.price} each
                              </span>

                            </div>

                            <p className="mt-4 text-xl font-extrabold text-green-600">
                              ₹{item.price * item.quantity}
                            </p>

                          </div>


                          {/* PRODUCT BUTTON */}
                          <div className="w-full sm:w-auto">

                            <button
                              onClick={() =>
                                navigate(
                                  `/products/${item.id}`
                                )
                              }
                              className="w-full rounded-xl bg-green-600 px-5 py-3 font-semibold text-white shadow-sm transition duration-300 hover:bg-green-700 hover:shadow-md sm:w-auto"
                            >
                              View Product
                            </button>

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>


                  {/* ORDER FOOTER */}
                  <div className="mt-6 border-t border-gray-200 pt-5">

                    <div className="grid gap-5 sm:grid-cols-2">

                      {/* TOTAL */}
                      <div>

                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                          Order Total
                        </p>

                        <h3 className="mt-1 text-2xl font-extrabold text-gray-800">
                          ₹{order.total}
                        </h3>

                      </div>


                      {/* DATE */}
                      <div className="sm:text-right">

                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                          Order Date
                        </p>

                        <p className="mt-1 text-sm font-semibold text-gray-600">
                          {new Date(
                            order.date
                          ).toLocaleString()}
                        </p>

                      </div>

                    </div>


                    {/* CANCEL ORDER */}
                    {order.status === "Placed" && (

                      <button
                        onClick={async () => {

                          const confirmCancel =
                            window.confirm(
                              "Are you sure you want to cancel this order?"
                            );

                          if (!confirmCancel) return;

                          try {

                            await updateOrder(
                              order.id,
                              {
                                status: "Cancelled"
                              }
                            );

                            for (const item of order.items) {

                              const product =
                                await getProductById(
                                  item.id
                                );

                              const newStock =
                                product.stock +
                                item.quantity;

                              await updateProductStock(
                                item.id,
                                newStock
                              );

                            }

                            setOrders((prevOrders) =>
                              prevOrders.map((item) =>
                                item.id === order.id
                                  ? {
                                      ...item,
                                      status: "Cancelled"
                                    }
                                  : item
                              )
                            );

                            toast.success(
                              "Order cancelled successfully"
                            );

                          } catch (error) {

                            console.log(error);

                            toast.error(
                              "Failed to cancel order"
                            );

                          }

                        }}
                        className="mt-5 w-full rounded-xl border border-red-200 bg-red-50 px-5 py-3.5 font-semibold text-red-600 transition duration-300 hover:bg-red-600 hover:text-white sm:w-auto"
                      >
                        Cancel Order
                      </button>

                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}


        {/* CONTINUE SHOPPING */}
        <div className="mt-8 flex justify-center">

          <button
            onClick={() => navigate("/")}
            className="w-full rounded-xl bg-gray-800 px-7 py-3.5 font-semibold text-white shadow-sm transition duration-300 hover:bg-gray-900 sm:w-auto"
          >
            ← Continue Shopping
          </button>

        </div>

      </div>

    </main>
  );
}

export default Orders;