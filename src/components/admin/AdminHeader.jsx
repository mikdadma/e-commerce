import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../redux/slices/adminSlice";

function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admin = useSelector((state) => state.admin.admin);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/admin/login");
  };

  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">

      <h1 className="text-xl font-bold text-gray-800">
        Admin Panel
      </h1>

      <div className="flex items-center gap-4">

        <div className="text-right">
          <p className="font-medium text-gray-800">
            {admin?.name}
          </p>

          <p className="text-sm text-gray-500">
            {admin?.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default AdminHeader;