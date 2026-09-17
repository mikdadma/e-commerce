import { useState } from "react";
import { loginUser } from "../services/userService";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import { setCartItems } from "../redux/slices/cartSlice";
import { setWishlistItems } from "../redux/slices/wishlistSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);
      const users = await loginUser(email.trim(), password);

      if (users.length === 0) {
        alert("Invalid email or password");
        return;
      }

      const user = users[0];

localStorage.setItem("user", JSON.stringify(user));

dispatch(setUser(user));

const savedCart = localStorage.getItem(`cart_${user.email}`);
const savedWishlist = localStorage.getItem(`wishlist_${user.email}`);

dispatch(
  setCartItems(savedCart ? JSON.parse(savedCart) : [])
);

dispatch(
  setWishlistItems(
    savedWishlist ? JSON.parse(savedWishlist) : []
  )
);

navigate("/");
    } catch (error) {
      console.log(error);
      alert("Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 sm:px-6">

      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-green-600">
            M A PARTS
          </p>

          <h1 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to continue to your account.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">

          {/* Card Header */}
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-gray-800">
              Login
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter your account details below.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-800 outline-none transition duration-300 placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-800 outline-none transition duration-300 placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-600 px-4 py-3.5 font-semibold text-white shadow-sm transition-all duration-300 hover:bg-green-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Register */}
            <div className="border-t border-gray-100 pt-5 text-center">

              <p className="text-sm text-gray-600">
                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="font-bold text-green-600 transition duration-300 hover:text-green-700 hover:underline"
                >
                  Register
                </Link>
              </p>

            </div>

          </form>

        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs leading-5 text-gray-400">
          Secure access to your M A PARTS account
        </p>

      </div>

    </main>
  );
}

export default Login;