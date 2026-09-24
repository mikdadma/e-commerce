import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import {
  createProduct,
  deleteProduct
} from "../../services/productService";
import { toast } from "react-toastify";

function AdminProducts() {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);

  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: ""
  });

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // ADD PRODUCT
  const handleAddProduct = async () => {
    // Check required fields
    if (
      !productData.name.trim() ||
      !productData.category.trim() ||
      !productData.price ||
      !productData.stock ||
      !productData.description.trim() ||
      !productData.image.trim()
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    // Check price and stock
    if (
      Number(productData.price) <= 0 ||
      Number(productData.stock) < 0
    ) {
      toast.warning("Enter valid price and stock");
      return;
    }

    try {
      const newProduct = {
        ...productData,
        price: Number(productData.price),
        stock: Number(productData.stock)
      };

      await createProduct(newProduct);

      toast.success("Product added successfully");

      setProductData({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        image: ""
      });

      setShowForm(false);

      dispatch(fetchProducts());
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  // DELETE PRODUCT
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);

      toast.success("Product deleted successfully");

      dispatch(fetchProducts());
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Products
          </h1>

          <p className="text-gray-500 mt-2">
            Total Products: {products.length}
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
        >
          Add Product
        </button>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <div className="mt-6 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">
            Add Product
          </h2>

          <div className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block mb-1 font-medium">
                Product Name
              </label>

              <input
                type="text"
                value={productData.name}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    name: e.target.value
                  })
                }
                placeholder="Enter product name"
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 font-medium">
                Category
              </label>

              <input
                type="text"
                value={productData.category}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    category: e.target.value
                  })
                }
                placeholder="Enter category"
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block mb-1 font-medium">
                Price
              </label>

              <input
                type="number"
                value={productData.price}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    price: e.target.value
                  })
                }
                placeholder="Enter price"
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block mb-1 font-medium">
                Stock
              </label>

              <input
                type="number"
                value={productData.stock}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    stock: e.target.value
                  })
                }
                placeholder="Enter stock"
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-medium">
                Description
              </label>

              <textarea
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value
                  })
                }
                placeholder="Enter product description"
                rows="4"
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block mb-1 font-medium">
                Image URL
              </label>

              <input
                type="text"
                value={productData.image}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    image: e.target.value
                  })
                }
                placeholder="Enter image URL"
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>
          </div>

          {/* Form Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={handleAddProduct}
              className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
            >
              Add Product
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="mt-6 overflow-x-auto bg-white rounded-xl shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t"
              >
                <td className="px-6 py-4">
                  {product.id}
                </td>

                <td className="px-6 py-4 font-medium">
                  {product.name}
                </td>

                <td className="px-6 py-4">
                  {product.category}
                </td>

                <td className="px-6 py-4">
                  ₹{product.price}
                </td>

                <td className="px-6 py-4">
                  {product.stock}
                </td>

                {/* Delete Button */}
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      handleDeleteProduct(product.id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;