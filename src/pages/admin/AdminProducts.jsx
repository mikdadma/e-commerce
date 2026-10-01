import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../../services/productService";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: ""
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Categories
  const categories = [
    "All",
    ...new Set(
      products.map((product) => product.category)
    )
  ];

  // Search + Category
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sort
  if (sort === "low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) =>
        Number(a.price) - Number(b.price)
    );
  }

  if (sort === "high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) =>
        Number(b.price) - Number(a.price)
    );
  }

  // Open Add Modal
  const handleAdd = () => {
    setEditingProduct(null);

    setFormData({
      name: "",
      price: "",
      category: "",
      stock: "",
      description: "",
      image: ""
    });

    setShowForm(true);
  };

  // Open Edit Modal
  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      price: product.price || "",
      category: product.category || "",
      stock: product.stock || "",
      description: product.description || "",
      image: product.image || ""
    });

    setShowForm(true);
  };

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.warning("Product name is required");
      return;
    }

    if (!formData.price) {
      toast.warning("Price is required");
      return;
    }

    if (!formData.category.trim()) {
      toast.warning("Category is required");
      return;
    }

    if (formData.stock === "") {
      toast.warning("Stock is required");
      return;
    }

    try {
      if (editingProduct) {
        await updateProduct(
          editingProduct.id,
          {
            name: formData.name,
            price: Number(formData.price),
            category: formData.category,
            stock: Number(formData.stock),
            description: formData.description,
            image: formData.image
          }
        );

        toast.success(
          "Product updated successfully"
        );
      } else {
        await createProduct({
          name: formData.name,
          price: Number(formData.price),
          category: formData.category,
          stock: Number(formData.stock),
          description: formData.description,
          image: formData.image
        });

        toast.success(
          "Product added successfully"
        );
      }

      await fetchProducts();

      setShowForm(false);
      setEditingProduct(null);

      setFormData({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: "",
        image: ""
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(id);

      await fetchProducts();

      toast.success(
        "Product deleted successfully"
      );
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to delete product"
      );
    }
  };

  return (
    <div className="w-full">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your products
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg"
        >
          Add Product
        </button>

      </div>

      {/* Search + Filters */}
      <div className="mt-6 flex flex-col lg:flex-row gap-4">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border border-gray-300 px-4 py-3 rounded-lg w-full lg:max-w-md outline-none"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="border border-gray-300 px-4 py-3 rounded-lg"
        >
          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="border border-gray-300 px-4 py-3 rounded-lg"
        >
          <option value="">
            Default
          </option>

          <option value="low">
            Price Low to High
          </option>

          <option value="high">
            Price High to Low
          </option>
        </select>

      </div>

      {/* Product Count */}
      <p className="mt-5 text-gray-600">
        Total Products:{" "}
        <span className="font-bold">
          {products.length}
        </span>
      </p>

      {/* Mobile Cards */}
      <div className="block lg:hidden mt-6 space-y-4">

        {filteredProducts.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
            No products found
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-xl shadow"
            >

              <h3 className="text-lg font-bold">
                {product.name}
              </h3>

              <p className="text-gray-600 mt-1">
                ₹{product.price}
              </p>

              <p className="text-gray-500">
                Category: {product.category}
              </p>

              <p className="text-gray-500">
                Stock: {product.stock}
              </p>

              <div className="flex gap-2 mt-4">

                <button
                  type="button"
                  onClick={() =>
                    handleEdit(product)
                  }
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(product.id)
                  }
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        )}

      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block mt-6 bg-white rounded-xl shadow overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-6 py-4">
                  Name
                </th>

                <th className="px-6 py-4">
                  Price
                </th>

                <th className="px-6 py-4">
                  Category
                </th>

                <th className="px-6 py-4">
                  Stock
                </th>

                <th className="px-6 py-4">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredProducts.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-8 text-gray-500"
                  >
                    No products found
                  </td>

                </tr>

              ) : (

                filteredProducts.map((product) => (

                  <tr
                    key={product.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-6 py-4 font-medium">
                      {product.name}
                    </td>

                    <td className="px-6 py-4">
                      ₹{product.price}
                    </td>

                    <td className="px-6 py-4">
                      {product.category}
                    </td>

                    <td className="px-6 py-4">
                      {product.stock}
                    </td>

                    <td className="px-6 py-4">

                      <div className="flex gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(product)
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(product.id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ========================= */}
      {/* ADD / EDIT MODAL */}
      {/* ========================= */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-xl font-bold">
                {editingProduct
                  ? "Edit Product"
                  : "Add Product"}
              </h2>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                }}
                className="text-2xl text-gray-500 hover:text-black"
              >
                ×
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* Name */}

              <div>

                <label className="block mb-1 font-medium">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none"
                />

              </div>

              {/* Price */}

              <div>

                <label className="block mb-1 font-medium">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none"
                />

              </div>

              {/* Category */}

              <div>

                <label className="block mb-1 font-medium">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter category"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none"
                />

              </div>

              {/* Stock */}

              <div>

                <label className="block mb-1 font-medium">
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter stock"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none"
                />

              </div>

              {/* Description */}

              <div>

                <label className="block mb-1 font-medium">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  rows="3"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none"
                />

              </div>

              {/* Image */}

              <div>

                <label className="block mb-1 font-medium">
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none"
                />

              </div>

              {/* Buttons */}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">

                <button
                  type="submit"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg"
                >
                  {editingProduct
                    ? "Update Product"
                    : "Add Product"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 px-4 py-3 rounded-lg"
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminProducts;