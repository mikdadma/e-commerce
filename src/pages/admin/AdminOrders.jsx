import React from "react";
import { useEffect, useState } from "react";
import api from "../../services/api";

function AdminOrders() {

    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const ordersPerPage = 5;
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

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

const filteredOrders = orders.filter(
  (order) =>
    (order.id.toString().toLowerCase().includes(search.toLowerCase()) ||
      order.userId.toString().toLowerCase().includes(search.toLowerCase())) &&
    (status === "all" || order.status === status)
);

const totalPages = Math.ceil(
  filteredOrders.length / ordersPerPage
);

const currentOrders = filteredOrders.slice(
  indexOfFirstOrder,
  indexOfLastOrder
);


const totalRevenue = orders.reduce(
  (total, order) => total + Number(order.total),
  0
);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">
        Orders
      </h1>

      <p className="text-gray-500 mt-2">
        Manage customer orders
      </p>

      <p className="mt-4 text-gray-600">
         Total Orders: <span className="font-bold">{orders.length}</span>
      </p>

      <p className="mt-2 text-gray-600">
        Total Revenue: <span className="font-bold">₹{totalRevenue}</span>
      </p>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by Order ID or User ID..."
        className="mt-4 border px-4 py-2 rounded-lg w-80"
     />

     <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="mt-4 ml-2 border px-4 py-2 rounded-lg"
        >
        <option value="all">All Status</option>
        <option value="Placed">Placed</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <div className="mt-6 overflow-x-auto bg-white rounded-xl shadow-sm">
  <table className="w-full text-left">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-6 py-4">Order ID</th>
        <th className="px-6 py-4">User ID</th>
        <th className="px-6 py-4">Total</th>
        <th className="px-6 py-4">Status</th>
        <th className="px-6 py-4">Date</th>
      </tr>
    </thead>

    <tbody>
      {currentOrders.map((order) => (
        <tr key={order.id} className="border-t">
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
            <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === "Placed"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
                {order.status}
            </span>
          </td>

          <td className="px-6 py-4">
            {new Date(order.date).toLocaleDateString()}
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <div className="flex justify-between items-center p-4">
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    className="bg-gray-200 px-4 py-2 rounded-lg disabled:opacity-50"
  >
    Previous
  </button>

  <p>
    Page {currentPage} of {totalPages}
  </p>

  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="bg-gray-200 px-4 py-2 rounded-lg disabled:opacity-50"
  >
    Next
  </button>
</div>
</div>
    </div>
  );
}

export default AdminOrders;