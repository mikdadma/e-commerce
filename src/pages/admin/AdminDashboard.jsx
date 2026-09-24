import React from "react";
import { useSelector } from "react-redux";

function AdminDashboard() {
  const admin = useSelector((state) => state.admin.admin);

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">
            Products
          </p>

          <h2 className="text-3xl font-bold mt-2">
            0
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">
            Users
          </p>

          <h2 className="text-3xl font-bold mt-2">
            0
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">
            Orders
          </p>

          <h2 className="text-3xl font-bold mt-2">
            0
          </h2>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;