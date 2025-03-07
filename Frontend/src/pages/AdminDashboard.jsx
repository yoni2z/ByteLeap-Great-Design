import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [newProduct, setNewProduct] = useState({
    category: "",
    image: null,
    is_available: true, // Set default availability to true
  });

  const [errorMessage, setErrorMessage] = useState(""); // To store error messages

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setErrorMessage("Failed to load categories.");
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setErrorMessage("Failed to load products.");
    }
  };

  // Add New Category
  const addCategory = async () => {
    if (!newCategory.name.trim()) {
      setErrorMessage("Category name is required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("description", newCategory.description || "");

    // If an image is selected, append it; otherwise, send an empty string
    if (newCategory.image) {
      formData.append("image", newCategory.image);
    } else {
      formData.append("image", ""); // Prevent backend errors
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/categories/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchCategories();
      setNewCategory({ name: "", description: "", image: null });
      setErrorMessage(""); // Clear errors
    } catch (error) {
      console.error("Error adding category:", error.response?.data || error);
      setErrorMessage("Failed to add category. Please check the input.");
    }
  };

  // Delete Category
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/categories/${id}/`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      setErrorMessage("Failed to delete category.");
    }
  };

  // Add New Product
  const addProduct = async () => {
    if (!newProduct.category || !newProduct.image) {
      setErrorMessage("Category and image are required.");
      return;
    }

    try {
      // Create a new FormData object
      const formData = new FormData();

      // Append product fields to the FormData object
      formData.append("category", newProduct.category); // Send only category ID
      formData.append("is_available", newProduct.is_available);
      formData.append("image", newProduct.image); // Appending the image file

      // Send the FormData to the backend using Axios
      const response = await axios.post(
        "http://127.0.0.1:8000/api/products/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Make sure the request is treated as form-data
          },
        }
      );

      console.log("Product added:", response.data);
      fetchProducts(); // Refresh product list after adding new product
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error);
      setErrorMessage("Failed to add product.");
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}/`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      setErrorMessage("Failed to delete product.");
    }
  };

  return (
    <div className="mt-10 p-6 pt-20 font-JosefinSans">
      <h1 className="text-3xl font-bold mb-4 text-center">Admin Dashboard</h1>

      {/* Display Error Messages */}
      {errorMessage && (
        <div className="bg-red-500 text-white p-3 mb-4">{errorMessage}</div>
      )}

      {/* CATEGORY MANAGEMENT */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Manage Categories</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Description"
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({ ...newCategory, description: e.target.value })
            }
            className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="file"
            onChange={(e) =>
              setNewCategory({ ...newCategory, image: e.target.files[0] })
            }
            className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addCategory}
            className="bg-blue-500 text-white p-3 rounded-lg flex items-center space-x-2"
          >
            <FaPlus /> <span>Add</span>
          </button>
        </div>

        <ul className="mt-4">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex justify-between bg-gray-100 p-3 rounded-lg my-2 shadow-sm"
            >
              <div className="flex items-center space-x-4">
                {category.image && (
                  <img
                    src={category.image} // Assuming your image is hosted or accessible directly
                    alt={category.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <span>{category.name}</span>
              </div>
              <button
                onClick={() => deleteCategory(category.id)}
                className="bg-red-500 text-white p-2 rounded-lg"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* PRODUCT MANAGEMENT */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Manage Products</h2>
        <div className="flex gap-2 mb-4">
          <select
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.files[0] })
            }
            className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {/* Optional: Checkbox to toggle availability */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={newProduct.is_available}
              onChange={(e) =>
                setNewProduct({ ...newProduct, is_available: e.target.checked })
              }
              className="border p-2 rounded-lg"
            />
            <span>Available</span>
          </label>
          <button
            onClick={addProduct}
            className="bg-blue-500 text-white p-3 rounded-lg flex items-center space-x-2"
          >
            <FaPlus /> <span>Add</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-lg"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={`Product ${product.id}`}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
              )}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
