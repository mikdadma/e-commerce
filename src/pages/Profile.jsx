import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg sm:p-10">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <span className="text-2xl font-bold text-red-500">
              !
            </span>
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-green-600">
            M A PARTS
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-gray-800 sm:text-3xl">
            User not found
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Please login to view your profile.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-7 w-full rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white shadow-sm transition duration-300 hover:bg-green-700 hover:shadow-md"
          >
            Go to Login
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600">
            M A PARTS
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Manage your account information and account actions.
          </p>
        </div>

        {/* Profile Header Card */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-green-950 p-6 text-white sm:p-8">

            <div className="flex flex-col items-center gap-5 sm:flex-row">

              {/* Avatar */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-green-600 text-3xl font-extrabold shadow-lg">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              <div className="text-center sm:text-left">
                <p className="text-sm font-medium text-green-300">
                  Welcome back
                </p>

                <h2 className="mt-1 break-words text-2xl font-extrabold sm:text-3xl">
                  {user?.name}
                </h2>

                <p className="mt-1 break-all text-sm text-gray-300">
                  {user?.email}
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* Personal Information */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">

          <div className="flex items-center gap-4 border-b border-gray-100 pb-5">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50">
              <span className="font-bold text-green-600">
                01
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your registered account details
              </p>
            </div>

          </div>

          <div className="mt-5 space-y-3">

            {/* Name */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition duration-300 hover:border-green-200 hover:bg-green-50/40 sm:p-5">

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Full Name
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {user?.name}
                  </p>
                </div>

                <span className="w-fit rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-500 shadow-sm">
                  Account Name
                </span>

              </div>

            </div>

            {/* Email */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition duration-300 hover:border-green-200 hover:bg-green-50/40 sm:p-5">

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Email Address
                  </p>

                  <p className="mt-1 break-all font-semibold text-gray-800">
                    {user?.email}
                  </p>
                </div>

                <span className="w-fit rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-500 shadow-sm">
                  Email
                </span>

              </div>

            </div>

            {/* User ID */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition duration-300 hover:border-green-200 hover:bg-green-50/40 sm:p-5">

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    User ID
                  </p>

                  <p className="mt-1 break-all font-semibold text-gray-800">
                    {user?.id}
                  </p>
                </div>

                <span className="w-fit rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-500 shadow-sm">
                  ID
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* Navigation Actions */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">

          <div className="flex items-center gap-4 border-b border-gray-100 pb-5">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50">
              <span className="font-bold text-green-600">
                02
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Quickly access your shopping pages.
              </p>
            </div>

          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">

            <Link
              to="/"
              className="group rounded-xl border border-gray-200 bg-gray-50 p-4 transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:bg-green-50 hover:shadow-sm"
            >
              <p className="font-bold text-gray-800 group-hover:text-green-700">
                Products
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Browse vehicle parts
              </p>
            </Link>

            <Link
              to="/wishlist"
              className="group rounded-xl border border-gray-200 bg-gray-50 p-4 transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:bg-green-50 hover:shadow-sm"
            >
              <p className="font-bold text-gray-800 group-hover:text-green-700">
                Wishlist
              </p>

              <p className="mt-1 text-sm text-gray-500">
                View saved products
              </p>
            </Link>

            <Link
              to="/orders"
              className="group rounded-xl border border-gray-200 bg-gray-50 p-4 transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:bg-green-50 hover:shadow-sm"
            >
              <p className="font-bold text-gray-800 group-hover:text-green-700">
                Orders
              </p>

              <p className="mt-1 text-sm text-gray-500">
                View your order history
              </p>
            </Link>

          </div>

        </section>

        {/* Account Actions */}
        <section className="mt-6 rounded-2xl border border-red-200 bg-white p-5 shadow-sm sm:p-7">

          <div className="flex items-start gap-4 border-b border-gray-100 pb-5">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50">
              <span className="font-bold text-red-600">
                03
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
                Account Actions
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                Logout from your account on this device.
              </p>
            </div>

          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="max-w-xl text-sm leading-6 text-gray-500">
              Logging out will remove your current login session from
              this device.
            </p>

            <button
              onClick={() => {
                const confirmLogout = window.confirm(
                  "Are you sure you want to logout?"
                );

                if (confirmLogout) {
                  dispatch(logout());
                  navigate("/login");
                }
              }}
              className="w-full rounded-xl bg-red-600 px-6 py-3.5 font-semibold text-white shadow-sm transition duration-300 hover:bg-red-700 hover:shadow-md sm:w-auto"
            >
              Logout
            </button>

          </div>

        </section>

        {/* Back Button */}
        <div className="mt-8 flex justify-center">

          <Link
            to="/"
            className="w-full rounded-xl bg-gray-800 px-7 py-3.5 text-center font-semibold text-white shadow-sm transition duration-300 hover:bg-gray-900 sm:w-auto"
          >
            ← Back to Products
          </Link>

        </div>

      </div>
    </main>
  );
}

export default Profile;