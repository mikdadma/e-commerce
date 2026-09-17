import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../redux/slices/authSlice";
import { clearCartState } from "../redux/slices/cartSlice";
import { clearWishlistState } from "../redux/slices/wishlistSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const cartCount = cartItems.length;

  const handleLogout = () => {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (confirmLogout) {
    dispatch(logout());

    dispatch(clearCartState());
    dispatch(clearWishlistState());

    navigate("/login");
  }
};

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950 text-white shadow-lg">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Top Bar */}
        <div className="flex min-h-16 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="shrink-0 text-xl font-extrabold tracking-[0.18em] text-green-400 transition duration-300 hover:text-green-300 sm:text-2xl lg:text-3xl"
          >
            M A PARTS
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">

            <Link
              to="/"
              className="whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-200 transition duration-300 hover:bg-gray-800 hover:text-green-400"
            >
              Products
            </Link>

            <Link
              to="/wishlist"
              className="whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-200 transition duration-300 hover:bg-gray-800 hover:text-green-400"
            >
              Wishlist ({wishlistItems.length})
            </Link>

            <Link
              to="/cart"
              className="whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-200 transition duration-300 hover:bg-gray-800 hover:text-green-400"
            >
              Cart ({cartCount})
            </Link>

            <Link
              to="/orders"
              className="whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-200 transition duration-300 hover:bg-gray-800 hover:text-green-400"
            >
              Orders
            </Link>

            <Link
              to="/profile"
              className="whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-200 transition duration-300 hover:bg-gray-800 hover:text-green-400"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="ml-2 whitespace-nowrap rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-red-700"
            >
              Logout
            </button>
          </div>

          {/* Mobile / Tablet Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-700 bg-gray-900 text-gray-200 transition duration-300 hover:border-green-500 hover:text-green-400 lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <span className="text-2xl leading-none">✕</span>
            ) : (
              <span className="text-2xl leading-none">☰</span>
            )}
          </button>
        </div>

        {/* Mobile / Tablet Navigation */}
        {menuOpen && (
          <div className="border-t border-gray-800 py-4 lg:hidden">

            <div className="flex flex-col gap-2">

              <Link
                to="/"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-200 transition duration-300 hover:bg-gray-800 hover:text-green-400 sm:text-base"
              >
                Products
              </Link>

              <Link
                to="/wishlist"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-200 transition duration-300 hover:bg-gray-800 hover:text-green-400 sm:text-base"
              >
                Wishlist ({wishlistItems.length})
              </Link>

              <Link
                to="/cart"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-200 transition duration-300 hover:bg-gray-800 hover:text-green-400 sm:text-base"
              >
                Cart ({cartCount})
              </Link>

              <Link
                to="/orders"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-200 transition duration-300 hover:bg-gray-800 hover:text-green-400 sm:text-base"
              >
                Orders
              </Link>

              <Link
                to="/profile"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-200 transition duration-300 hover:bg-gray-800 hover:text-green-400 sm:text-base"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="mt-2 w-full rounded-lg bg-red-600 px-4 py-3 text-left text-sm font-semibold text-white transition duration-300 hover:bg-red-700 sm:text-base"
              >
                Logout
              </button>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;