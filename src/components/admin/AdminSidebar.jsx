import React from "react";
import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white p-6">

      <h2 className="text-2xl font-bold mb-8">
        M A PARTS
      </h2>

      <nav className="flex flex-col gap-3">

        <Link
          to="/admin"
          className="px-4 py-3 rounded-lg hover:bg-gray-700"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/products"
          className="px-4 py-3 rounded-lg hover:bg-gray-700"
        >
          Products
        </Link>

        <Link
          to="/admin/users"
          className="px-4 py-3 rounded-lg hover:bg-gray-700"
        >
          Users
        </Link>

        <Link
          to="/admin/orders"
          className="px-4 py-3 rounded-lg hover:bg-gray-700"
        >
          Orders
        </Link>

      </nav>

    </aside>
  );
}

export default AdminSidebar;