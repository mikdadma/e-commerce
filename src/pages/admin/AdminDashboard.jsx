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

  // =========================
  // FETCH PRODUCTS
  // =========================

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // =========================
  // FETCH USERS
  // =========================

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

  // =========================
  // FETCH ORDERS
  // =========================

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

  // =========================
  // TOTAL REVENUE
  // =========================

  const totalRevenue = orders.reduce(
    (total, order) =>
      total + Number(order.total || 0),
    0
  );

  // =========================
  // LOW STOCK PRODUCTS
  // =========================

  const lowStockProducts = products.filter(
    (product) =>
      Number(product.stock) <= 5
  );

  const lowStockCount =
    lowStockProducts.length;

  return (
    <div className="w-full min-w-0">

      {/* =========================
          DASHBOARD HEADER
      ========================== */}

      <div className="mb-6">

        <h1 className="
          text-2xl
          sm:text-3xl
          font-bold
          text-gray-800
        ">
          Dashboard
        </h1>

        <p className="
          text-gray-500
          mt-1
        ">
          Welcome back, {admin?.name}
        </p>

      </div>


      {/* =========================
          STATISTICS CARDS
      ========================== */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-5
        gap-4
        lg:gap-6
      ">

        {/* PRODUCTS */}

        <div className="
          bg-white
          p-5
          sm:p-6
          rounded-xl
          shadow-sm
        ">

          <p className="
            text-gray-500
            text-sm
          ">
            Products
          </p>

          <h2 className="
            text-2xl
            sm:text-3xl
            font-bold
            mt-2
          ">
            {products.length}
          </h2>

        </div>


        {/* USERS */}

        <div className="
          bg-white
          p-5
          sm:p-6
          rounded-xl
          shadow-sm
        ">

          <p className="
            text-gray-500
            text-sm
          ">
            Users
          </p>

          <h2 className="
            text-2xl
            sm:text-3xl
            font-bold
            mt-2
          ">
            {users.length}
          </h2>

        </div>


        {/* ORDERS */}

        <div className="
          bg-white
          p-5
          sm:p-6
          rounded-xl
          shadow-sm
        ">

          <p className="
            text-gray-500
            text-sm
          ">
            Orders
          </p>

          <h2 className="
            text-2xl
            sm:text-3xl
            font-bold
            mt-2
          ">
            {orders.length}
          </h2>

        </div>


        {/* REVENUE */}

        <div className="
          bg-white
          p-5
          sm:p-6
          rounded-xl
          shadow-sm
        ">

          <p className="
            text-gray-500
            text-sm
          ">
            Revenue
          </p>

          <h2 className="
            text-2xl
            sm:text-3xl
            font-bold
            mt-2
            break-words
          ">
            ₹{totalRevenue}
          </h2>

        </div>


        {/* LOW STOCK */}

        <div className="
          bg-white
          p-5
          sm:p-6
          rounded-xl
          shadow-sm
        ">

          <p className="
            text-gray-500
            text-sm
          ">
            Low Stock
          </p>

          <h2 className="
            text-2xl
            sm:text-3xl
            font-bold
            mt-2
            text-red-500
          ">
            {lowStockCount}
          </h2>

        </div>

      </div>


      {/* =========================
          LOW STOCK PRODUCTS
      ========================== */}

      <div className="
        mt-6
        lg:mt-8
        bg-white
        p-4
        sm:p-6
        rounded-xl
        shadow-sm
      ">

        <h2 className="
          text-lg
          sm:text-xl
          font-bold
          text-gray-800
          mb-4
        ">
          Low Stock Products
        </h2>


        {lowStockProducts.length === 0 ? (

          <p className="text-gray-500">
            No low stock products
          </p>

        ) : (

          <div className="space-y-3">

            {lowStockProducts.map(
              (product) => (

                <div
                  key={product.id}
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-2
                    border-b
                    pb-3
                    last:border-b-0
                  "
                >

                  <div className="min-w-0">

                    <p className="
                      font-medium
                      break-words
                    ">
                      {product.name}
                    </p>

                    <p className="
                      text-sm
                      text-gray-500
                    ">
                      {product.category}
                    </p>

                  </div>


                  <p className="
                    font-bold
                    text-red-500
                    whitespace-nowrap
                  ">
                    {product.stock} left
                  </p>

                </div>

              )
            )}

          </div>

        )}

      </div>


      {/* =========================
          RECENT ORDERS
      ========================== */}

      <div className="
        mt-6
        lg:mt-8
        bg-white
        p-4
        sm:p-6
        rounded-xl
        shadow-sm
      ">

        <div className="
          flex
          items-center
          justify-between
          gap-3
          mb-4
        ">

          <h2 className="
            text-lg
            sm:text-xl
            font-bold
            text-gray-800
          ">
            Recent Orders
          </h2>


          <Link
            to="/admin/orders"
            className="
              text-blue-500
              hover:text-blue-700
              text-sm
              sm:text-base
              whitespace-nowrap
            "
          >
            View All
          </Link>

        </div>


        <div className="space-y-3">

          {orders.length === 0 ? (

            <p className="text-gray-500">
              No orders found
            </p>

          ) : (

            orders
              .slice(-5)
              .reverse()
              .map((order) => (

                <div
                  key={order.id}
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-3
                    border-b
                    pb-3
                    last:border-b-0
                  "
                >

                  {/* ORDER INFORMATION */}

                  <div className="min-w-0">

                    <p className="
                      font-medium
                      break-all
                    ">
                      Order #{order.id}
                    </p>

                    <p className="
                      text-sm
                      text-gray-500
                      break-all
                    ">
                      User: {order.userId}
                    </p>

                  </div>


                  {/* ORDER AMOUNT */}

                  <div className="
                    text-left
                    sm:text-right
                  ">

                    <p className="font-medium">
                      ₹{order.total}
                    </p>

                    <p className="
                      text-sm
                      text-gray-500
                    ">
                      {order.status}
                    </p>

                  </div>

                </div>

              ))

          )}

        </div>

      </div>


      {/* =========================
          QUICK ACTIONS
      ========================== */}

      <div className="
        mt-6
        lg:mt-8
      ">

        <h2 className="
          text-lg
          sm:text-xl
          font-bold
          text-gray-800
          mb-4
        ">
          Quick Actions
        </h2>


        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-4
          lg:gap-6
        ">

          {/* MANAGE PRODUCTS */}

          <Link
            to="/admin/products"
            className="
              bg-blue-500
              text-white
              p-5
              sm:p-6
              rounded-xl
              hover:bg-blue-600
              transition
            "
          >

            <h2 className="
              text-lg
              sm:text-xl
              font-bold
            ">
              Manage Products
            </h2>

            <p className="
              mt-2
              text-sm
              sm:text-base
            ">
              Add, edit and delete products
            </p>

          </Link>


          {/* MANAGE USERS */}

          <Link
            to="/admin/users"
            className="
              bg-green-500
              text-white
              p-5
              sm:p-6
              rounded-xl
              hover:bg-green-600
              transition
            "
          >

            <h2 className="
              text-lg
              sm:text-xl
              font-bold
            ">
              Manage Users
            </h2>

            <p className="
              mt-2
              text-sm
              sm:text-base
            ">
              View and manage users
            </p>

          </Link>


          {/* MANAGE ORDERS */}

          <Link
            to="/admin/orders"
            className="
              bg-purple-500
              text-white
              p-5
              sm:p-6
              rounded-xl
              hover:bg-purple-600
              transition
            "
          >

            <h2 className="
              text-lg
              sm:text-xl
              font-bold
            ">
              Manage Orders
            </h2>

            <p className="
              mt-2
              text-sm
              sm:text-base
            ">
              View and update orders
            </p>

          </Link>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;