import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../redux/slices/adminSlice";

function AdminHeader({
  setSidebarOpen
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admin = useSelector(
    (state) => state.admin.admin
  );

  const handleLogout = () => {
    dispatch(logoutAdmin());

    navigate("/admin/login");
  };

  return (
    <header className="
      h-16
      bg-white
      shadow-sm
      flex
      items-center
      justify-between
      px-4
      sm:px-6
      sticky
      top-0
      z-30
    ">

      {/* Left Side */}

      <div className="
        flex
        items-center
        gap-3
      ">

        {/* Hamburger */}

        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="
            lg:hidden
            text-gray-700
            text-2xl
            p-1
          "
          aria-label="Open menu"
        >
          ☰
        </button>


        {/* Title */}

        <h1 className="
          text-lg
          sm:text-xl
          font-bold
          text-gray-800
        ">
          Admin Panel
        </h1>

      </div>


      {/* Right Side */}

      <div className="
        flex
        items-center
        gap-2
        sm:gap-4
      ">

        {/* Admin Information */}

        <div className="
          text-right
          hidden
          sm:block
        ">

          <p className="
            font-medium
            text-gray-800
          ">
            {admin?.name}
          </p>

          <p className="
            text-sm
            text-gray-500
          ">
            {admin?.email}
          </p>

        </div>


        {/* Mobile Admin Name */}

        <p className="
          block
          sm:hidden
          text-sm
          font-medium
          text-gray-800
        ">
          {admin?.name}
        </p>


        {/* Logout */}

        <button
          type="button"
          onClick={handleLogout}
          className="
            bg-red-500
            hover:bg-red-600
            text-white
            px-3
            sm:px-4
            py-2
            rounded-lg
            text-sm
            sm:text-base
            whitespace-nowrap
          "
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default AdminHeader;