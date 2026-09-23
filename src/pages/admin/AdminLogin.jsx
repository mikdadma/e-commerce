import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminLogin } from "../../redux/slices/adminSlice";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.admin);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check empty fields
    if (email.trim() === "" || password.trim() === "") {
      toast.warning("Please fill all fields");
      return;
    }

    // Check email
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      await dispatch(
        adminLogin({
          email: email,
          password: password
        })
      ).unwrap();

      toast.success("Admin login successful");

      navigate("/admin");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

        <h1 className="text-2xl font-bold text-center mb-6">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none"
            />
          </div>

          {/* Redux error */}
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AdminLogin;