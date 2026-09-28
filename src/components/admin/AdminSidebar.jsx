import React from "react";
import { Link, useLocation } from "react-router-dom";

function AdminSidebar({
  sidebarOpen,
  setSidebarOpen
}) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            lg:hidden
          "
          onClick={() => setSidebarOpen(false)}
        />
      )}


      {/* Sidebar */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-64
          bg-gray-900
          text-white
          p-6
          transform
          transition-transform
          duration-300
          ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >

        {/* Logo + Close Button */}

        <div className="
          flex
          items-center
          justify-between
          mb-8
        ">

          <h2 className="
            text-2xl
            font-bold
          ">
            M A PARTS
          </h2>

          {/* Mobile Close */}

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="
              lg:hidden
              text-gray-300
              hover:text-white
              text-2xl
            "
          >
            ×
          </button>

        </div>


        {/* Navigation */}

        <nav className="flex flex-col gap-2">

          {/* Dashboard */}

          <Link
            to="/admin"
            onClick={() => setSidebarOpen(false)}
            className={`
              px-4
              py-3
              rounded-lg
              transition
              ${
                isActive("/admin")
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }
            `}
          >
            Dashboard
          </Link>


          {/* Products */}

          <Link
            to="/admin/products"
            onClick={() => setSidebarOpen(false)}
            className={`
              px-4
              py-3
              rounded-lg
              transition
              ${
                isActive("/admin/products")
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }
            `}
          >
            Products
          </Link>


          {/* Users */}

          <Link
            to="/admin/users"
            onClick={() => setSidebarOpen(false)}
            className={`
              px-4
              py-3
              rounded-lg
              transition
              ${
                isActive("/admin/users")
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }
            `}
          >
            Users
          </Link>


          {/* Orders */}

          <Link
            to="/admin/orders"
            onClick={() => setSidebarOpen(false)}
            className={`
              px-4
              py-3
              rounded-lg
              transition
              ${
                isActive("/admin/orders")
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }
            `}
          >
            Orders
          </Link>

        </nav>

      </aside>
    </>
  );
}

export default AdminSidebar;