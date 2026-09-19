import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../redux/slices/authSlice";
import { clearCartState } from "../redux/slices/cartSlice";
import { clearWishlistState } from "../redux/slices/wishlistSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      dispatch(logout());

      dispatch(clearCartState());
      dispatch(clearWishlistState());

      setMenuOpen(false);

      navigate("/login");
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950 text-white shadow-lg">

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* TOP BAR */}
        <div className="flex min-h-16 items-center justify-between">

          {/* LOGO */}
          <Link
            to={user ? "/" : "/login"}
            onClick={closeMenu}
            className="shrink-0 text-xl font-extrabold tracking-[0.18em] text-green-400 transition duration-300 hover:text-green-300 sm:text-2xl lg:text-3xl"
          >
            M A PARTS
          </Link>


          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-1 lg:flex">

            {user ? (

              /* LOGGED IN */
              <>
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
                  Wishlist ({wishlistCount})
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
              </>

            ) : (

              /* LOGGED OUT */
              <>
                <Link
                  to="/login"
                  className="whitespace-nowrap rounded-lg border border-green-500 px-5 py-2.5 text-sm font-semibold text-green-400 transition duration-300 hover:bg-green-500 hover:text-white"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="ml-2 whitespace-nowrap rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-green-700"
                >
                  Register
                </Link>
              </>
            )}

          </div>


          {/* MOBILE / TABLET MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-700 bg-gray-900 text-gray-200 transition duration-300 hover:border-green-500 hover:text-green-400 lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <span className="text-2xl leading-none">
                ✕
              </span>
            ) : (
              <span className="text-2xl leading-none">
                ☰
              </span>
            )}
          </button>

        </div>


        {/* MOBILE / TABLET NAVIGATION */}
        {menuOpen && (
          <div className="border-t border-gray-800 py-4 lg:hidden">

            <div className="flex flex-col gap-2">

              {user ? (

                /* LOGGED IN MOBILE */
                <>
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
                    Wishlist ({wishlistCount})
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
                </>

              ) : (

                /* LOGGED OUT MOBILE */
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="rounded-lg border border-green-500 px-4 py-3 text-sm font-semibold text-green-400 transition duration-300 hover:bg-green-500 hover:text-white sm:text-base"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-green-700 sm:text-base"
                  >
                    Register
                  </Link>
                </>
              )}

            </div>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;