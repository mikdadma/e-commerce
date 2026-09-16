import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import ProductCard from "../components/ProductCard";
import { useNavigate, Link } from "react-router-dom";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  const user = useSelector((state) => state.auth.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const productsPerPage = 6;

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("default");
    setCurrentPage(1);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (category === "All" || product.category === category)
  );

  let sortedProducts = [...filteredProducts];

  if (sort === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (sort === "name") {
    sortedProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  const totalPages = Math.max(
    1,
    Math.ceil(sortedProducts.length / productsPerPage)
  );

  if (currentPage > totalPages) {
    setCurrentPage(1);
  }

  const firstIndex = (currentPage - 1) * productsPerPage;
  const lastIndex = firstIndex + productsPerPage;

  const currentProducts = sortedProducts.slice(
    firstIndex,
    lastIndex
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <main className="flex min-h-[70vh] w-full min-w-0 items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-lg sm:p-8">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-green-600"></div>

          <h2 className="mt-5 text-xl font-bold text-gray-800">
            Loading Products
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Please wait while we load the available vehicle parts.
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[70vh] w-full min-w-0 items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-lg sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <span className="text-2xl font-bold text-red-600">
              !
            </span>
          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-800">
            Failed to Load Products
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Something went wrong while loading the vehicle parts.
          </p>

          <button
            onClick={() => dispatch(fetchProducts())}
            className="mt-6 w-full rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition duration-300 hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-hidden bg-gray-50">
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">

        {/* Hero */}
        <section className="w-full min-w-0 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-green-950 p-5 text-white shadow-lg sm:p-8 lg:p-10">
          <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-green-400 sm:text-sm">
                M A PARTS
              </p>

              <h1 className="mt-3 break-words text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Vehicle Parts
              </h1>

              <p className="mt-4 max-w-full break-words text-sm leading-6 text-gray-300 sm:text-base">
                Find reliable vehicle parts at the right price.
                Browse our products and choose the parts your
                vehicle needs.
              </p>
            </div>

            <div className="w-full min-w-0 rounded-2xl border border-green-800 bg-green-900/40 p-5 sm:p-6 lg:w-72 lg:shrink-0">
              <p className="text-sm font-medium text-green-300">
                Welcome back
              </p>

              <p className="mt-2 break-words text-xl font-bold text-white sm:text-2xl">
                {user?.name}
              </p>

              <div className="mt-4 h-px w-full bg-green-800"></div>

              <p className="mt-4 text-sm text-green-200">
                Ready to shop?
              </p>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mt-6 grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <Link
            to="/profile"
            className="group min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg sm:p-6"
          >
            <div className="flex min-w-0 items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="break-words text-lg font-bold text-gray-800">
                  My Profile
                </p>

                <p className="mt-2 break-words text-sm leading-5 text-gray-500">
                  View your account details
                </p>
              </div>

              <span className="shrink-0 rounded-lg bg-green-50 px-3 py-2 text-green-600">
                →
              </span>
            </div>
          </Link>

          <Link
            to="/wishlist"
            className="group min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg sm:p-6"
          >
            <div className="flex min-w-0 items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="break-words text-lg font-bold text-gray-800">
                  My Wishlist
                </p>

                <p className="mt-2 break-words text-sm leading-5 text-gray-500">
                  View your saved products
                </p>
              </div>

              <span className="shrink-0 rounded-lg bg-green-50 px-3 py-2 text-green-600">
                →
              </span>
            </div>
          </Link>

          <Link
            to="/orders"
            className="group min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg sm:p-6"
          >
            <div className="flex min-w-0 items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="break-words text-lg font-bold text-gray-800">
                  My Orders
                </p>

                <p className="mt-2 break-words text-sm leading-5 text-gray-500">
                  View your order history
                </p>
              </div>

              <span className="shrink-0 rounded-lg bg-green-50 px-3 py-2 text-green-600">
                →
              </span>
            </div>
          </Link>
        </section>

        {/* Filters */}
        <section className="mt-6 w-full min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">

          <div className="mb-6">
            <h2 className="break-words text-2xl font-bold text-gray-800">
              Find Your Parts
            </h2>

            <p className="mt-1 break-words text-sm text-gray-500">
              Search, filter, or sort the available vehicle parts.
            </p>
          </div>

          <div className="grid w-full min-w-0 grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">

            <div className="min-w-0 xl:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Search
              </label>

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="block w-full min-w-0 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition duration-300 placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div className="min-w-0">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="block w-full min-w-0 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              >
                <option value="All">All Categories</option>
                <option value="Brake">Brake</option>
                <option value="Engine">Engine</option>
                <option value="Electrical">Electrical</option>
              </select>
            </div>

            <div className="min-w-0">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Sort By
              </label>

              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setCurrentPage(1);
                }}
                className="block w-full min-w-0 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition duration-300 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              >
                <option value="default">Default</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex w-full min-w-0 flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/cart")}
              className="w-full min-w-0 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition duration-300 hover:bg-green-700"
            >
              Go to Cart ({cartCount})
            </button>

            <button
              onClick={clearFilters}
              className="w-full min-w-0 rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition duration-300 hover:bg-gray-100"
            >
              Clear Filters
            </button>
          </div>
        </section>

        {/* Products Heading */}
        <section className="mt-7 min-w-0">
          <h2 className="break-words text-2xl font-bold text-gray-800 sm:text-3xl">
            Available Parts
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {sortedProducts.length} product
            {sortedProducts.length !== 1 ? "s" : ""} found
          </p>
        </section>

        {/* Product Grid */}
        {currentProducts.length === 0 ? (
          <div className="mt-5 w-full min-w-0 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <h2 className="text-2xl font-bold text-gray-700">
              No products found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or filter options.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-green-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="mt-5 grid w-full min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {currentProducts.map((product) => (
              <div key={product.id} className="min-w-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Bottom */}
        <section className="mt-7 w-full min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Shopping Summary
              </p>

              <p className="mt-1 break-words text-lg font-bold text-gray-800">
                {cartCount} item
                {cartCount !== 1 ? "s" : ""} in your cart
              </p>
            </div>

            <div className="flex w-full min-w-0 items-center justify-between gap-2 sm:w-auto sm:gap-3">

              <button
                onClick={() =>
                  setCurrentPage((page) => page - 1)
                }
                disabled={currentPage === 1}
                className="min-w-0 flex-1 rounded-xl bg-gray-100 px-3 py-2.5 text-sm font-semibold text-gray-700 transition duration-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-5"
              >
                Previous
              </button>

              <div className="shrink-0 rounded-xl bg-gray-50 px-3 py-2 text-center">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Page
                </p>

                <p className="text-base font-bold text-gray-800 sm:text-lg">
                  {currentPage} / {totalPages}
                </p>
              </div>

              <button
                onClick={() =>
                  setCurrentPage((page) => page + 1)
                }
                disabled={currentPage === totalPages}
                className="min-w-0 flex-1 rounded-xl bg-green-600 px-3 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400 sm:flex-none sm:px-5"
              >
                Next
              </button>

            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Products;