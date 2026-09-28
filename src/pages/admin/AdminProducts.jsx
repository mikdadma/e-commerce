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

  const { products, error } = useSelector(
    (state) => state.products
  );

  // Fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Search + filter + sort
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "priceLow") {
        return Number(a.price) - Number(b.price);
      }

      if (sort === "priceHigh") {
        return Number(b.price) - Number(a.price);
      }

      if (sort === "nameAZ") {
        return a.name.localeCompare(b.name);
      }

      return 0;
    });

  // Error
  if (error) {
    return (
      <div className="bg-red-100 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  // Reset form
  const resetForm = () => {
    setProductData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      image: ""
    });

    setEditProductId(null);
  };

  // Add product
  const handleAddProduct = async () => {
    if (
      !productData.name.trim() ||
      !productData.category.trim() ||
      !productData.price ||
      productData.stock === "" ||
      !productData.description.trim() ||
      !productData.image.trim()
    ) {
      toast.warning("Please fill all fields");
      return;
    }

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

      resetForm();
      setShowForm(false);

      dispatch(fetchProducts());
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);

      await dispatch(fetchProducts());

      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  // Update product
  const handleUpdateProduct = async () => {
    if (
      !productData.name.trim() ||
      !productData.category.trim() ||
      !productData.price ||
      productData.stock === "" ||
      !productData.description.trim() ||
      !productData.image.trim()
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    if (
      Number(productData.price) <= 0 ||
      Number(productData.stock) < 0
    ) {
      toast.warning("Enter valid price and stock");
      return;
    }

    try {
      const updatedProduct = {
        ...productData,
        price: Number(productData.price),
        stock: Number(productData.stock)
      };

      await updateProduct(
        editProductId,
        updatedProduct
      );

      toast.success("Product updated successfully");

      resetForm();
      setShowForm(false);

      await dispatch(fetchProducts());
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditProductId(product.id);

    setProductData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description,
      image: product.image
    });

    setShowForm(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  return (
    <div className="w-full min-w-0">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="flex flex-col gap-4">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Products
          </h1>

          <p className="text-gray-500 mt-2">
            Total Products: {products.length}
          </p>
        </div>

        {/* Add Product Button */}

        <button
          type="button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="
            w-full
            sm:w-auto
            self-stretch
            sm:self-start
            bg-black
            text-white
            px-5
            py-3
            rounded-lg
            hover:bg-gray-800
            transition
          "
        >
          Add Product
        </button>

      </div>


      {/* =========================
          SEARCH + FILTERS
      ========================== */}

      <div className="mt-5 flex flex-col sm:flex-row gap-3">

        {/* Search */}

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="
            w-full
            sm:flex-1
            border
            border-gray-300
            px-4
            py-3
            rounded-lg
            outline-none
            focus:ring-2
            focus:ring-blue-400
          "
        />

        {/* Category */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="
            w-full
            sm:w-auto
            border
            border-gray-300
            px-4
            py-3
            rounded-lg
            bg-white
            outline-none
          "
        >
          <option value="all">
            All Categories
          </option>

          <option value="Brake">
            Brake
          </option>

          <option value="Engine">
            Engine
          </option>

          <option value="Electrical">
            Electrical
          </option>
        </select>

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="
            w-full
            sm:w-auto
            border
            border-gray-300
            px-4
            py-3
            rounded-lg
            bg-white
            outline-none
          "
        >
          <option value="default">
            Default
          </option>

          <option value="priceLow">
            Price: Low → High
          </option>

          <option value="priceHigh">
            Price: High → Low
          </option>

          <option value="nameAZ">
            Name: A → Z
          </option>
        </select>

      </div>


      {/* =========================
          ADD / EDIT FORM
      ========================== */}

      {showForm && (
        <div
          ref={formRef}
          className="
            mt-6
            bg-white
            p-4
            sm:p-6
            rounded-xl
            shadow-sm
          "
        >

          <h2 className="text-xl font-bold mb-5">
            {editProductId
              ? "Edit Product"
              : "Add Product"}
          </h2>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
                className="
                  w-full
                  border
                  border-gray-300
                  px-3
                  py-2
                  rounded-lg
                  outline-none
                  focus:ring-2
                  focus:ring-blue-400
                "
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
                className="
                  w-full
                  border
                  border-gray-300
                  px-3
                  py-2
                  rounded-lg
                  outline-none
                  focus:ring-2
                  focus:ring-blue-400
                "
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
                className="
                  w-full
                  border
                  border-gray-300
                  px-3
                  py-2
                  rounded-lg
                  outline-none
                  focus:ring-2
                  focus:ring-blue-400
                "
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
                className="
                  w-full
                  border
                  border-gray-300
                  px-3
                  py-2
                  rounded-lg
                  outline-none
                  focus:ring-2
                  focus:ring-blue-400
                "
              />
            </div>


            {/* Description */}

            <div className="md:col-span-2">

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
                className="
                  w-full
                  border
                  border-gray-300
                  px-3
                  py-2
                  rounded-lg
                  outline-none
                  focus:ring-2
                  focus:ring-blue-400
                  resize-none
                "
              />

            </div>


            {/* Image URL */}

            <div className="md:col-span-2">

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
                className="
                  w-full
                  border
                  border-gray-300
                  px-3
                  py-2
                  rounded-lg
                  outline-none
                  focus:ring-2
                  focus:ring-blue-400
                "
              />

            </div>

          </div>


          {/* Form Buttons */}

          <div className="flex flex-col sm:flex-row gap-3 mt-6">

            <button
              type="button"
              onClick={
                editProductId
                  ? handleUpdateProduct
                  : handleAddProduct
              }
              className="
                w-full
                sm:w-auto
                bg-black
                text-white
                px-5
                py-3
                rounded-lg
                hover:bg-gray-800
                transition
              "
            >
              {editProductId
                ? "Update Product"
                : "Add Product"}
            </button>


            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
              className="
                w-full
                sm:w-auto
                bg-gray-200
                px-5
                py-3
                rounded-lg
                hover:bg-gray-300
                transition
              "
            >
              Cancel
            </button>

          </div>

        </div>
      )}


      {/* =========================
          PRODUCT LIST
      ========================== */}

      <div className="mt-6">


        {/* =========================
            MOBILE PRODUCT CARDS
        ========================== */}

        <div className="block lg:hidden space-y-4">

          {filteredProducts.length === 0 ? (

            <div className="
              bg-white
              rounded-xl
              p-6
              text-center
              text-gray-500
              shadow-sm
            ">
              No products found
            </div>

          ) : (

            filteredProducts.map((product) => (

              <div
                key={product.id}
                className="
                  bg-white
                  rounded-xl
                  shadow-sm
                  p-4
                "
              >

                {/* Product Header */}

                <div className="
                  flex
                  justify-between
                  items-start
                  gap-3
                ">

                  <div className="min-w-0">

                    <h3 className="
                      font-bold
                      text-lg
                      text-gray-800
                      break-words
                    ">
                      {product.name}
                    </h3>

                    <p className="
                      text-sm
                      text-gray-500
                      mt-1
                    ">
                      ID: {product.id}
                    </p>

                  </div>


                  {/* Category */}

                  <span className="
                    text-sm
                    bg-gray-100
                    px-3
                    py-1
                    rounded-full
                    whitespace-nowrap
                  ">
                    {product.category}
                  </span>

                </div>


                {/* Price + Stock */}

                <div className="
                  grid
                  grid-cols-2
                  gap-3
                  mt-4
                ">

                  <div className="
                    bg-gray-50
                    p-3
                    rounded-lg
                  ">

                    <p className="
                      text-xs
                      text-gray-500
                    ">
                      Price
                    </p>

                    <p className="
                      font-semibold
                      mt-1
                    ">
                      ₹{product.price}
                    </p>

                  </div>


                  <div className="
                    bg-gray-50
                    p-3
                    rounded-lg
                  ">

                    <p className="
                      text-xs
                      text-gray-500
                    ">
                      Stock
                    </p>

                    <p className="
                      font-semibold
                      mt-1
                    ">
                      {product.stock}
                    </p>

                  </div>

                </div>


                {/* Buttons */}

                <div className="
                  flex
                  gap-2
                  mt-4
                ">

                  <button
                    type="button"
                    onClick={() => handleEdit(product)}
                    className="
                      flex-1
                      bg-blue-500
                      text-white
                      px-4
                      py-2
                      rounded-lg
                      hover:bg-blue-600
                    "
                  >
                    Edit
                  </button>


                  <button
                    type="button"
                    onClick={() => {

                      const confirmed =
                        window.confirm(
                          "Are you sure you want to delete this product?"
                        );

                      if (confirmed) {
                        handleDeleteProduct(product.id);
                      }

                    }}
                    className="
                      flex-1
                      bg-red-500
                      text-white
                      px-4
                      py-2
                      rounded-lg
                      hover:bg-red-600
                    "
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>


        {/* =========================
            DESKTOP TABLE
        ========================== */}

        <div className="
          hidden
          lg:block
          bg-white
          rounded-xl
          shadow-sm
          overflow-hidden
        ">

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-gray-100">

                <tr>

                  <th className="px-6 py-4">
                    ID
                  </th>

                  <th className="px-6 py-4">
                    Name
                  </th>

                  <th className="px-6 py-4">
                    Category
                  </th>

                  <th className="px-6 py-4">
                    Price
                  </th>

                  <th className="px-6 py-4">
                    Stock
                  </th>

                  <th className="px-6 py-4">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredProducts.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="
                        text-center
                        py-8
                        text-gray-500
                      "
                    >
                      No products found
                    </td>

                  </tr>

                ) : (

                  filteredProducts.map((product) => (

                    <tr
                      key={product.id}
                      className="
                        border-t
                        hover:bg-gray-50
                      "
                    >

                      <td className="px-6 py-4">
                        {product.id}
                      </td>


                      <td className="
                        px-6
                        py-4
                        font-medium
                      ">
                        {product.name}
                      </td>


                      <td className="px-6 py-4">
                        {product.category}
                      </td>


                      <td className="
                        px-6
                        py-4
                        whitespace-nowrap
                      ">
                        ₹{product.price}
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
                            className="
                              bg-blue-500
                              text-white
                              px-4
                              py-2
                              rounded-lg
                              hover:bg-blue-600
                            "
                          >
                            Edit
                          </button>


                          <button
                            type="button"
                            onClick={() => {

                              const confirmed =
                                window.confirm(
                                  "Are you sure you want to delete this product?"
                                );

                              if (confirmed) {
                                handleDeleteProduct(
                                  product.id
                                );
                              }

                            }}
                            className="
                              bg-red-500
                              text-white
                              px-4
                              py-2
                              rounded-lg
                              hover:bg-red-600
                            "
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

      </div>

    </div>
  );
}

export default AdminProducts;