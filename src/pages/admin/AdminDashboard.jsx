import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../redux/slices/productSlice";
import api from "../../services/api";

function AdminDashboard() {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const { products } = useSelector(
    (state) => state.products
  );

  const admin = useSelector(
    (state) => state.admin.admin
  );

  // Fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.log("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

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

  // Calculate total revenue
  const totalRevenue = orders.reduce(
    (total, order) =>
      total + Number(order.total),
    0
  );

  return (
    <div>

      {/* Dashboard Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back, {admin?.name}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Products */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">
            Products
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {products.length}
          </h2>
        </div>

        {/* Users */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">
            Users
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {users.length}
          </h2>
        </div>

        {/* Orders */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">
            Orders
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {orders.length}
          </h2>
        </div>

        {/* Revenue */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">
            Revenue
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹{totalRevenue}
          </h2>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-xl font-bold text-gray-800">
            Recent Orders
          </h2>

          <Link
            to="/admin/orders"
            className="text-blue-500 hover:text-blue-700"
          >
            View All
          </Link>

        </div>

        <div className="space-y-3">

          {orders
            .slice(-5)
            .reverse()
            .map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b pb-3"
              >

                {/* Order Information */}
                <div>
                  <p className="font-medium">
                    Order #{order.id}
                  </p>

                  <p className="text-sm text-gray-500">
                    User: {order.userId}
                  </p>
                </div>

                {/* Order Amount */}
                <div className="text-right">

                  <p className="font-medium">
                    ₹{order.total}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.status}
                  </p>

                </div>

              </div>
            ))}

        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-8">

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Manage Products */}
          <Link
            to="/admin/products"
            className="bg-blue-500 text-white p-6 rounded-xl hover:bg-blue-600"
          >
            <h2 className="text-xl font-bold">
              Manage Products
            </h2>

            <p className="mt-2">
              Add, edit and delete products
            </p>
          </Link>

          {/* Manage Users */}
          <Link
            to="/admin/users"
            className="bg-green-500 text-white p-6 rounded-xl hover:bg-green-600"
          >
            <h2 className="text-xl font-bold">
              Manage Users
            </h2>

            <p className="mt-2">
              View and manage users
            </p>
          </Link>

          {/* Manage Orders */}
          <Link
            to="/admin/orders"
            className="bg-purple-500 text-white p-6 rounded-xl hover:bg-purple-600"
          >
            <h2 className="text-xl font-bold">
              Manage Orders
            </h2>

            <p className="mt-2">
              View and update orders
            </p>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;