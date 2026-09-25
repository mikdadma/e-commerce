import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import api from "../../services/api";

function AdminDashboard() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const { products } = useSelector(
    (state) => state.products
  );

  const admin = useSelector((state) => state.admin.admin);

  useEffect(() => {
  dispatch(fetchProducts());
}, [dispatch]);


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

const totalRevenue = orders.reduce(
  (total, order) => total + Number(order.total),
  0
);

  return (
    <div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back, {admin?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">
            Products
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {products.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">
            Users
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {users.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">
            Orders
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {orders.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Revenue</p>

            <h2 className="text-3xl font-bold mt-2">
              ₹{totalRevenue}
            </h2>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;