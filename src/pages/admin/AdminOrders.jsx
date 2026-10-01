import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 5;

  // =========================
  // FETCH ORDERS
  // =========================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/orders");

      setOrders(response.data);
    } catch (error) {
      console.log("Failed to fetch orders");

      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
  // GET USER NAME
  // =========================

  const getUserName = (userId) => {
    const user = users.find(
      (user) =>
        String(user.id) === String(userId)
    );

    return user ? user.name : "Unknown User";
  };

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredOrders = orders.filter((order) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      String(order.id)
        .toLowerCase()
        .includes(searchValue) ||
      String(order.userId)
        .toLowerCase()
        .includes(searchValue);

    const matchesStatus =
      statusFilter === "all" ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    filteredOrders.length / ordersPerPage
  );

  const startIndex =
    (currentPage - 1) * ordersPerPage;

  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage
  );

  // =========================
  // RESET PAGE WHEN SEARCH
  // =========================

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // =========================
  // TOTAL REVENUE
  // =========================

  const totalRevenue = orders.reduce(
    (total, order) => {
      return total + Number(order.total || 0);
    },
    0
  );

  // =========================
  // VIEW ORDER
  // =========================

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  // =========================
  // CLOSE ORDER MODAL
  // =========================

  const handleCloseOrder = () => {
    setSelectedOrder(null);
  };

  // =========================
  // UPDATE STATUS
  // =========================

  const handleStatusChange = async (
    orderId,
    newStatus
  ) => {
    if (newStatus === "Cancelled") {
      const confirmed = window.confirm(
        "Are you sure you want to cancel this order?"
      );

      if (!confirmed) {
        return;
      }
    }

    try {
      await api.patch(`/orders/${orderId}`, {
        status: newStatus
      });

      await fetchOrders();

      // Update selected order if currently viewing it
      if (
        selectedOrder &&
        selectedOrder.id === orderId
      ) {
        setSelectedOrder({
          ...selectedOrder,
          status: newStatus
        });
      }

      toast.success(
        `Order status changed to ${newStatus}`
      );
    } catch (error) {
      console.log("Failed to update order");

      toast.error(
        "Failed to update order status"
      );
    }
  };

  return (
    <div className="w-full min-w-0">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <div>
        <h1
          className="
            text-2xl
            sm:text-3xl
            font-bold
            text-gray-800
          "
        >
          Orders
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Manage customer orders
        </p>
      </div>


      {/* =========================
          STATISTICS
      ========================== */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-4
          mt-6
        "
      >

        {/* Total Orders */}

        <div
          className="
            bg-white
            p-5
            rounded-xl
            shadow-sm
          "
        >
          <p
            className="
              text-gray-500
              text-sm
            "
          >
            Total Orders
          </p>

          <p
            className="
              text-2xl
              font-bold
              mt-2
            "
          >
            {orders.length}
          </p>
        </div>


        {/* Total Revenue */}

        <div
          className="
            bg-white
            p-5
            rounded-xl
            shadow-sm
          "
        >
          <p
            className="
              text-gray-500
              text-sm
            "
          >
            Total Revenue
          </p>

          <p
            className="
              text-2xl
              font-bold
              mt-2
            "
          >
            ₹{totalRevenue}
          </p>
        </div>

      </div>


      {/* =========================
          SEARCH + STATUS
      ========================== */}

      <div
        className="
          mt-6
          flex
          flex-col
          sm:flex-row
          gap-3
        "
      >

        {/* Search */}

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search by Order ID or User ID..."
          className="
            w-full
            sm:flex-1
            border
            border-gray-300
            px-4
            py-3
            rounded-lg
            outline-none
            focus:ring-2
            focus:ring-blue-400
          "
        />


        {/* Status Filter */}

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="
            w-full
            sm:w-auto
            border
            border-gray-300
            px-4
            py-3
            rounded-lg
            bg-white
            outline-none
          "
        >
          <option value="all">
            All Status
          </option>

          <option value="Placed">
            Placed
          </option>

          <option value="Shipped">
            Shipped
          </option>

          <option value="Delivered">
            Delivered
          </option>

          <option value="Cancelled">
            Cancelled
          </option>
        </select>

      </div>


      {/* =========================
          ERROR
      ========================== */}

      {error && (
        <div
          className="
            mt-6
            bg-red-100
            text-red-600
            px-4
            py-3
            rounded-lg
          "
        >
          {error}
        </div>
      )}


      {/* =========================
          MOBILE ORDER CARDS
      ========================== */}

      <div
        className="
          block
          lg:hidden
          mt-6
          space-y-4
        "
      >

        {loading ? (

          <div
            className="
              bg-white
              rounded-xl
              shadow-sm
              p-6
              text-center
              text-gray-500
            "
          >
            Loading orders...
          </div>

        ) : currentOrders.length === 0 ? (

          <div
            className="
              bg-white
              rounded-xl
              shadow-sm
              p-6
              text-center
              text-gray-500
            "
          >
            No orders found
          </div>

        ) : (

          currentOrders.map((order) => (

            <div
              key={order.id}
              className="
                bg-white
                rounded-xl
                shadow-sm
                p-4
              "
            >

              {/* Order ID + Status */}

              <div
                className="
                  flex
                  justify-between
                  items-start
                  gap-3
                "
              >

                <div className="min-w-0">

                  <p
                    className="
                      text-xs
                      text-gray-500
                    "
                  >
                    Order ID
                  </p>

                  <p
                    className="
                      font-semibold
                      mt-1
                      break-all
                    "
                  >
                    {order.id}
                  </p>

                </div>


                {/* Status */}

                <span
                  className={`
                    text-xs
                    px-3
                    py-1
                    rounded-full
                    whitespace-nowrap

                    ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {order.status}
                </span>

              </div>


              {/* USER NAME */}

              <div
                className="
                  mt-4
                  bg-gray-50
                  p-3
                  rounded-lg
                "
              >

                <p
                  className="
                    text-xs
                    text-gray-500
                  "
                >
                  User
                </p>

                <p
                  className="
                    text-sm
                    font-medium
                    mt-1
                    break-words
                  "
                >
                  {getUserName(order.userId)}
                </p>

              </div>


              {/* Total + Date */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                  mt-3
                "
              >

                <div
                  className="
                    bg-gray-50
                    p-3
                    rounded-lg
                  "
                >

                  <p
                    className="
                      text-xs
                      text-gray-500
                    "
                  >
                    Total
                  </p>

                  <p
                    className="
                      font-semibold
                      mt-1
                    "
                  >
                    ₹{order.total}
                  </p>

                </div>


                <div
                  className="
                    bg-gray-50
                    p-3
                    rounded-lg
                  "
                >

                  <p
                    className="
                      text-xs
                      text-gray-500
                    "
                  >
                    Date
                  </p>

                  <p
                    className="
                      font-semibold
                      mt-1
                      text-sm
                    "
                  >
                    {order.date
                      ? new Date(
                          order.date
                        ).toLocaleDateString()
                      : "-"}
                  </p>

                </div>

              </div>


              {/* Status Select */}

              <div className="mt-4">

                <label
                  className="
                    block
                    text-sm
                    font-medium
                    mb-1
                  "
                >
                  Update Status
                </label>

                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(
                      order.id,
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border
                    border-gray-300
                    px-3
                    py-2
                    rounded-lg
                    bg-white
                  "
                >
                  <option value="Placed">
                    Placed
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>

              </div>


              {/* View Button */}

              <button
                type="button"
                onClick={() =>
                  handleViewOrder(order)
                }
                className="
                  w-full
                  mt-3
                  bg-blue-500
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  hover:bg-blue-600
                "
              >
                View Order
              </button>

            </div>

          ))

        )}

      </div>


      {/* =========================
          DESKTOP ORDER TABLE
      ========================== */}

      <div
        className="
          hidden
          lg:block
          mt-6
          bg-white
          rounded-xl
          shadow-sm
          overflow-hidden
        "
      >

        <div className="overflow-x-auto">

          <table
            className="
              w-full
              text-left
            "
          >

            <thead className="bg-gray-100">

              <tr>

                <th className="px-6 py-4">
                  Order ID
                </th>

                <th className="px-6 py-4">
                  User
                </th>

                <th className="px-6 py-4">
                  Total
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Date
                </th>

                <th className="px-6 py-4">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="
                      text-center
                      py-8
                      text-gray-500
                    "
                  >
                    Loading orders...
                  </td>

                </tr>

              ) : currentOrders.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="
                      text-center
                      py-8
                      text-gray-500
                    "
                  >
                    No orders found
                  </td>

                </tr>

              ) : (

                currentOrders.map((order) => (

                  <tr
                    key={order.id}
                    className="
                      border-t
                      hover:bg-gray-50
                    "
                  >

                    {/* Order ID */}

                    <td
                      className="
                        px-6
                        py-4
                        break-all
                      "
                    >
                      {order.id}
                    </td>


                    {/* USER NAME */}

                    <td
                      className="
                        px-6
                        py-4
                      "
                    >
                      {getUserName(order.userId)}
                    </td>


                    {/* Total */}

                    <td
                      className="
                        px-6
                        py-4
                        whitespace-nowrap
                      "
                    >
                      ₹{order.total}
                    </td>


                    {/* Status */}

                    <td className="px-6 py-4">

                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value
                          )
                        }
                        className="
                          border
                          border-gray-300
                          px-3
                          py-2
                          rounded-lg
                          bg-white
                        "
                      >

                        <option value="Placed">
                          Placed
                        </option>

                        <option value="Shipped">
                          Shipped
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>

                      </select>

                    </td>


                    {/* Date */}

                    <td
                      className="
                        px-6
                        py-4
                        whitespace-nowrap
                      "
                    >
                      {order.date
                        ? new Date(
                            order.date
                          ).toLocaleDateString()
                        : "-"}
                    </td>


                    {/* Action */}

                    <td className="px-6 py-4">

                      <button
                        type="button"
                        onClick={() =>
                          handleViewOrder(order)
                        }
                        className="
                          bg-blue-500
                          text-white
                          px-4
                          py-2
                          rounded-lg
                          hover:bg-blue-600
                        "
                      >
                        View
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =========================
          PAGINATION
      ========================== */}

      {totalPages > 1 && (

        <div
          className="
            mt-6
            flex
            flex-wrap
            items-center
            justify-center
            gap-2
          "
        >

          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
            className="
              px-4
              py-2
              rounded-lg
              bg-white
              border
              border-gray-300
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Previous
          </button>


          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (

            <button
              key={page}
              type="button"
              onClick={() =>
                setCurrentPage(page)
              }
              className={`
                px-4
                py-2
                rounded-lg
                border

                ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "bg-white border-gray-300"
                }
              `}
            >
              {page}
            </button>

          ))}


          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
            className="
              px-4
              py-2
              rounded-lg
              bg-white
              border
              border-gray-300
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Next
          </button>

        </div>

      )}


      {/* =========================
          ORDER DETAILS MODAL
      ========================== */}

      {selectedOrder && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            p-4
          "
          onClick={handleCloseOrder}
        >

          <div
            className="
              w-full
              max-w-2xl
              max-h-[90vh]
              overflow-y-auto
              bg-white
              rounded-xl
              shadow-xl
              p-5
              sm:p-6
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Modal Header */}

            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >

              <div className="min-w-0">

                <h2
                  className="
                    text-xl
                    sm:text-2xl
                    font-bold
                    text-gray-800
                  "
                >
                  Order Details
                </h2>

                <p
                  className="
                    text-sm
                    text-gray-500
                    mt-1
                    break-all
                  "
                >
                  Order ID: {selectedOrder.id}
                </p>

              </div>


              {/* X Button */}

              <button
                type="button"
                onClick={handleCloseOrder}
                className="
                  text-gray-500
                  hover:text-gray-800
                  text-2xl
                  leading-none
                  flex-shrink-0
                "
              >
                ×
              </button>

            </div>


            {/* Customer Information */}

            <div
              className="
                mt-6
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
              "
            >

              {/* User */}

              <div
                className="
                  bg-gray-50
                  p-4
                  rounded-lg
                "
              >

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  User
                </p>

                <p
                  className="
                    font-medium
                    mt-1
                    break-words
                  "
                >
                  {getUserName(
                    selectedOrder.userId
                  )}
                </p>

              </div>


              {/* Order Date */}

              <div
                className="
                  bg-gray-50
                  p-4
                  rounded-lg
                "
              >

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  Order Date
                </p>

                <p
                  className="
                    font-medium
                    mt-1
                  "
                >
                  {selectedOrder.date
                    ? new Date(
                        selectedOrder.date
                      ).toLocaleString()
                    : "-"}
                </p>

              </div>


              {/* Status */}

              <div
                className="
                  bg-gray-50
                  p-4
                  rounded-lg
                "
              >

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  Status
                </p>

                <p
                  className="
                    font-medium
                    mt-1
                  "
                >
                  {selectedOrder.status}
                </p>

              </div>


              {/* Total */}

              <div
                className="
                  bg-gray-50
                  p-4
                  rounded-lg
                "
              >

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  Total
                </p>

                <p
                  className="
                    font-bold
                    text-lg
                    mt-1
                  "
                >
                  ₹{selectedOrder.total}
                </p>

              </div>

            </div>


            {/* Purchased Items */}

            <div className="mt-6">

              <h3
                className="
                  text-lg
                  font-bold
                  mb-4
                "
              >
                Purchased Items
              </h3>


              <div className="space-y-3">

                {selectedOrder.items &&
                selectedOrder.items.length > 0 ? (

                  selectedOrder.items.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="
                          bg-gray-50
                          p-4
                          rounded-lg
                          flex
                          flex-col
                          sm:flex-row
                          sm:items-center
                          sm:justify-between
                          gap-3
                        "
                      >

                        <div className="min-w-0">

                          <p
                            className="
                              font-medium
                              break-words
                            "
                          >
                            {item.name}
                          </p>

                          <p
                            className="
                              text-sm
                              text-gray-500
                              mt-1
                            "
                          >
                            Quantity: {item.quantity}
                          </p>

                        </div>


                        <p
                          className="
                            font-semibold
                            whitespace-nowrap
                          "
                        >
                          ₹
                          {Number(item.price) *
                            Number(item.quantity)}
                        </p>

                      </div>

                    )
                  )

                ) : (

                  <p className="text-gray-500">
                    No items found
                  </p>

                )}

              </div>

            </div>


            {/* Final Total */}

            <div
              className="
                mt-6
                border-t
                pt-4
                flex
                justify-between
                items-center
              "
            >

              <span className="font-medium">
                Total
              </span>

              <span
                className="
                  text-xl
                  font-bold
                "
              >
                ₹{selectedOrder.total}
              </span>

            </div>


            {/* Close Button */}

            <button
              type="button"
              onClick={handleCloseOrder}
              className="
                mt-6
                w-full
                bg-gray-200
                px-4
                py-3
                rounded-lg
                hover:bg-gray-300
              "
            >
              Close Order Details
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminOrders;