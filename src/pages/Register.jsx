import { useState } from "react";
import { registerUser, getUsers } from "../services/userService";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (
      !email.trim().includes("@") ||
      !email.trim().includes(".")
    ) {
      alert("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);

      const users = await getUsers();

      const existingUser = users.find(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        alert("Email already registered");
        return;
      }

      const user = {
        name: name.trim(),
        email: email.trim(),
        password
      };

      const data = await registerUser(user);

      console.log("Registered user:", data);

      alert("Registration successful");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Unable to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 sm:px-6">

      <div className="w-full max-w-lg">

        {/* Brand Header */}
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-green-600">
            M A PARTS
          </p>

          <h1 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Create Your Account
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Register to start shopping for vehicle parts.
          </p>
        </div>

        {/* Register Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">

          {/* Card Header */}
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-gray-800">
              Register
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Fill in your details to create an account.
            </p>
          </div>

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-800 outline-none transition duration-300 placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

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
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-800 outline-none transition duration-300 placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />

              <p className="mt-2 text-xs text-gray-400">
                Password must contain at least 8 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
                placeholder="Confirm your password"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-800 outline-none transition duration-300 placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-600 px-4 py-3.5 font-semibold text-white shadow-sm transition-all duration-300 hover:bg-green-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
            >
              {loading
                ? "Registering..."
                : "Create Account"}
            </button>

            {/* Login Link */}
            <div className="border-t border-gray-100 pt-5 text-center">

              <p className="text-sm text-gray-600">
                Already have an account?{" "}

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="font-bold text-green-600 transition duration-300 hover:text-green-700 hover:underline"
                >
                  Login
                </button>
              </p>

            </div>

          </form>

        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs leading-5 text-gray-400">
          Create your M A PARTS account and start shopping.
        </p>

      </div>

    </main>
  );
}

export default Register;