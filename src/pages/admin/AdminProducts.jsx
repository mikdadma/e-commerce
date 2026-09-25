import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import {
  createProduct,
  deleteProduct,
  updateProduct
} from "../../services/productService";
import { toast } from "react-toastify";

function AdminProducts() {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);

  const [editProductId, setEditProductId] = useState(null);
  const formRef = useRef(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

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

  const filteredProducts = products
  .filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  })
  .sort((a, b) => {
    if (sort === "priceLow") {
      return a.price - b.price;
    }

    if (sort === "priceHigh") {
      return b.price - a.price;
    }

    if (sort === "nameAZ") {
      return a.name.localeCompare(b.name);
    }

    return 0;
  });

  
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

    await dispatch(fetchProducts());

    toast.success("Product deleted successfully");
  } catch (error) {
    toast.error("Failed to delete product");
  }
};

// UPDATE PRODUCT
const handleUpdateProduct = async () => {
  try {
    const updatedProduct = {
      ...productData,
      price: Number(productData.price),
      stock: Number(productData.stock)
    };

    await updateProduct(editProductId, updatedProduct);

    toast.success("Product updated successfully");

    setProductData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      image: ""
    });

    setEditProductId(null);
    setShowForm(false);

    await dispatch(fetchProducts());
  } catch (error) {
    toast.error("Failed to update product");
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

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="mt-4 border px-4 py-2 rounded-lg w-80"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-3 border px-4 py-2 rounded-lg"
          >
            <option value="all">All Categories</option>
            <option value="Brake">Brake</option>
            <option value="Engine">Engine</option>
            <option value="Electrical">Electrical</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="mt-3 border px-4 py-2 rounded-lg"
          >
            <option value="default">Default</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
            <option value="nameAZ">Name: A → Z</option>
          </select>
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
              <div
            ref={formRef}
            className="mt-6 bg-white p-6 rounded-xl shadow-sm"
          >
          <h2 className="text-xl font-bold mb-4">
            {editProductId ? "Edit Product" : "Add Product"}
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
              onClick={editProductId ? handleUpdateProduct : handleAddProduct}
              className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
            >
              {editProductId ? "Update Product" : "Add Product"}
            </button>

            <button
              type="button"
              onClick={() => {
                  setShowForm(false);
                  setEditProductId(null);
                  setProductData({
                    name: "",
                    category: "",
                    price: "",
                    stock: "",
                    description: "",
                    image: ""
                  });
                }}
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
            {filteredProducts.map((product) => (
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

                {/* Action Buttons */}
                <td className="px-6 py-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                        setEditProductId(product.id);
                        setProductData(product);
                        setShowForm(true);

                        setTimeout(() => {
                          formRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                          });
                        }, 100);
                      }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      handleDeleteProduct(product.id);
                    }}
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