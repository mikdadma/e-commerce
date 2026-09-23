import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../redux/slices/adminSlice";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admin = useSelector((state) => state.admin.admin);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">

        <h1 className="text-3xl font-bold mb-4">
          Admin Dashboard
        </h1>

        {admin && (
          <div className="mb-6">
            <p className="text-gray-600">
              Welcome, {admin.name}
            </p>

            <p className="text-gray-500">
              {admin.email}
            </p>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default AdminDashboard;