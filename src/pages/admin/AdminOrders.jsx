import React from "react";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { updateOrder } from "../../services/orderService";
import { toast } from "react-toastify";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const ordersPerPage = 5;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder =
    indexOfLastOrder - ordersPerPage;

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders");
        setOrders(response.data);
      } catch (error) {
        console.log("Failed to fetch orders");
      }
    };

    fetchOrders();
  }, []);

  // Search and status filter
  const filteredOrders = orders.filter(
    (order) =>
      (order.id
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase()) ||
        order.userId
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())) &&
      (status === "all" || order.status === status)
  );

  // Reset page when search or status changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, status]);

  // Pagination
  const totalPages = Math.ceil(
    filteredOrders.length / ordersPerPage
  );

  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  // Total revenue
  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.total),
    0
  );

  // Update order status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrder(id, {
        status: newStatus
      });

      const response = await api.get("/orders");
      setOrders(response.data);

      if (selectedOrder) {
        setSelectedOrder((previousOrder) => ({
          ...previousOrder,
          status: newStatus
        }));
      }

      toast.success("Order status updated successfully");
    } catch (error) {
      console.log("Failed to update order status");
      toast.error("Failed to update order status");
    }
  };

  return (
    <div>
      {/* Page heading */}
      <h1 className="text-3xl font-bold text-gray-800">
        Orders
      </h1>

      <p className="text-gray-500 mt-2">
        Manage customer orders
      </p>

      {/* Statistics */}
      <p className="mt-4 text-gray-600">
        Total Orders:{" "}
        <span className="font-bold">
          {orders.length}
        </span>
      </p>

      <p className="mt-2 text-gray-600">
        Total Revenue:{" "}
        <span className="font-bold">
          ₹{totalRevenue}
        </span>
      </p>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by Order ID or User ID..."
        className="mt-4 border px-4 py-2 rounded-lg w-80"
      />

      {/* Status filter */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="mt-4 ml-2 border px-4 py-2 rounded-lg"
      >
        <option value="all">All Status</option>
        <option value="Placed">Placed</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      {/* Orders Table */}
      <div className="mt-6 overflow-x-auto bg-white rounded-xl shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">User ID</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentOrders.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500"
                >
                  No orders found
                </td>
              </tr>
            ) : (
              currentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t"
                >
                  <td className="px-6 py-4">
                    {order.id}
                  </td>

                  <td className="px-6 py-4">
                    {order.userId}
                  </td>

                  <td className="px-6 py-4">
                    ₹{order.total}
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => {
                        const newStatus = e.target.value;

                        if (newStatus === "Cancelled") {
                          const confirmed =
                            window.confirm(
                              "Are you sure you want to cancel this order?"
                            );

                          if (!confirmed) {
                            return;
                          }
                        }

                        handleStatusChange(
                          order.id,
                          newStatus
                        );
                      }}
                      className="border px-3 py-2 rounded-lg"
                    >
                      <option value="Placed">
                        Placed
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      order.date
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        setSelectedOrder(order)
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4">
          <button
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
            disabled={currentPage === 1}
            className="bg-gray-200 px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <p>
            Page {currentPage} of {totalPages}
          </p>

          <button
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
            disabled={
              currentPage === totalPages
            }
            className="bg-gray-200 px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Selected Order Details */}
      {selectedOrder && (
        <div className="mt-6 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">
            Order Details
          </h2>

          <p className="mb-2">
            <strong>Order ID:</strong>{" "}
            {selectedOrder.id}
          </p>

          <p className="mb-2">
            <strong>User ID:</strong>{" "}
            {selectedOrder.userId}
          </p>

          <p className="mb-2">
            <strong>Total:</strong>{" "}
            ₹{selectedOrder.total}
          </p>

          <p className="mb-2">
            <strong>Status:</strong>{" "}
            {selectedOrder.status}
          </p>

          <p className="mb-2">
            <strong>Date:</strong>{" "}
            {new Date(
              selectedOrder.date
            ).toLocaleDateString()}
          </p>

          {/* Purchased Items */}
          <h3 className="text-lg font-bold mt-5 mb-3">
            Items
          </h3>

          <div className="space-y-2">
            {selectedOrder.items.map((item) => (
              <div
                key={item.id}
                className="border p-3 rounded-lg"
              >
                <p className="font-medium">
                  {item.name}
                </p>

                <p className="text-gray-600">
                  Quantity: {item.quantity}
                </p>

                <p className="text-gray-600">
                  Price: ₹{item.price}
                </p>
              </div>
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={() =>
              setSelectedOrder(null)
            }
            className="mt-4 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;