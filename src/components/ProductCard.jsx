import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-xl">

      {/* Product Image */}
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gray-50 p-5 sm:h-56">
        
        <div className="absolute left-4 top-4 z-10">
          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-gray-600 shadow-sm">
            {product.category}
          </span>
        </div>

        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
        />
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">

        {/* Product Name */}
        <h2 className="min-h-14 text-xl font-bold leading-7 text-gray-800 transition duration-300 group-hover:text-green-700">
          {product.name}
        </h2>

        {/* Price */}
        <div className="mt-5 border-t border-gray-100 pt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Price
          </p>

          <p className="mt-1 text-2xl font-extrabold text-green-600">
            ₹{product.price}
          </p>
        </div>

        {/* Stock */}
        <div className="mt-4">
          {product.stock > 0 ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              In Stock: {product.stock}
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700">
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
              Out of Stock
            </span>
          )}
        </div>

        {/* Button */}
        <div className="mt-auto border-t border-gray-100 pt-5">
          <button
            onClick={() => navigate(`/products/${product.id}`)}
            disabled={product.stock === 0}
            className="w-full rounded-xl bg-green-600 px-4 py-3.5 font-semibold text-white shadow-sm transition-all duration-300 hover:bg-green-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
          >
            {product.stock === 0 ? "Out of Stock" : "View Details"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductCard;