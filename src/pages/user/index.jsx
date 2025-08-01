import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaEllipsisV, FaShoppingCart, FaWallet, FaCheck } from "react-icons/fa";
import AboutSection from "../../components/AboutSection";

// ثابت الأسعار (افتراضي)
const PRODUCT_PRICES = {
  "iPhone 15 Pro": 900,
  "Leather Jacket": 120,
  "Dell XPS 13": 750,
};

const CATEGORY_LIST = [
  "Electronics",
  "Clothing",
  "Books",
  "Home",
  "Other",
];

const DUMMY_PRODUCTS = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    status: "Active",
    description: "Latest Apple iPhone.",
    category: "Electronics",
    quantity: 10,
    location: "Baghdad",
    image: null,
    price: 900,
  },
  {
    id: 2,
    title: "Leather Jacket",
    status: "Inactive",
    description: "Genuine leather, black.",
    category: "Clothing",
    quantity: 5,
    location: "Berlin",
    image: null,
    price: 120,
  },
  {
    id: 3,
    title: "Dell XPS 13",
    status: "Active",
    description: "2024 Model, 16GB RAM.",
    category: "Electronics",
    quantity: 7,
    location: "Hannover",
    image: null,
    price: 750,
  },
];

export default function UserHome() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    quantity: "",
    location: "",
    image: null,
    price: "",
    status: "Active",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [actionOpenId, setActionOpenId] = useState(null);

  // New: Cart & Wallet State
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [wallet, setWallet] = useState(120); // رصيد افتراضي أولي
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    setProducts(DUMMY_PRODUCTS);
  }, []);

  // -------------------- المنتجات (بدون تعديل على المطلوب الأصلي) --------------------
  const handleOpenForm = () => {
    setShowForm(true);
    setEditingId(null);
    setForm({
      title: "",
      description: "",
      category: "",
      quantity: "",
      location: "",
      image: null,
      price: "",
      status: "Active",
    });
    setImagePreview(null);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (editingId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId ? { ...p, ...form, image: imagePreview || p.image } : p
        )
      );
    } else {
      setProducts((prev) => [
        {
          ...form,
          id: Date.now(),
          image: imagePreview,
          price: Number(form.price) || 0,
        },
        ...prev,
      ]);
    }
    setShowForm(false);
    setEditingId(null);
    setForm({
      title: "",
      description: "",
      category: "",
      quantity: "",
      location: "",
      image: null,
      price: "",
      status: "Active",
    });
    setImagePreview(null);
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      title: product.title,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      location: product.location,
      image: product.image,
      price: product.price,
      status: product.status,
    });
    setImagePreview(product.image);
    setShowForm(true);
    setActionOpenId(null);
  };

  const handleRemove = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setActionOpenId(null);
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest(".action-dropdown")) setActionOpenId(null);
    };
    if (actionOpenId !== null) document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [actionOpenId]);

  const addToCart = (product) => {
    setCart((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev; // Prevent duplicate
      return [...prev, { ...product, qty: 1 }];
    });
    setOrderSuccess(false);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
  const updateCartQty = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: qty } : item))
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price || 0) * item.qty, 0);

  const handleConfirmOrder = () => {
    if (cartTotal > wallet) {
      alert("Your wallet balance is not enough to place the order.");
      return;
    }
    setWallet((prev) => prev - cartTotal);
    setCart([]);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3500);
  };

  // -------------------- واجهة المستخدم --------------------
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* عرض كامل الشاشة بدون max-w- أو mx-auto */}
      <div className="w-full mt-8 mb-4 px-0">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4 px-4">
         
          {/* Add Products */}
          <button
            onClick={handleOpenForm}
            className="flex items-center gap-2 bg-teal-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-teal-700 transition"
          >
            <FaPlus /> Add Products
          </button>
        </div>

        {/* سلة الشراء */}
        
        {/* فورم إضافة/تعديل المنتج */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow p-6 mb-8 space-y-4 border w-full"
          >
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 font-medium">Product Name *</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Category *</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Choose Category</option>
                  {CATEGORY_LIST.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  min={1}
                  value={form.quantity}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Price ($) *</label>
                <input
                  type="number"
                  name="price"
                  min={1}
                  value={form.price}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 rounded shadow max-h-32"
                />
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded shadow font-semibold hover:bg-green-700 transition"
              >
                {editingId ? "Update Product" : "Add Product"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setForm({
                    title: "",
                    description: "",
                    category: "",
                    quantity: "",
                    location: "",
                    image: null,
                    price: "",
                    status: "Active",
                  });
                  setImagePreview(null);
                }}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded shadow font-semibold hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* جدول المنتجات */}
        <div className="bg-white rounded-lg shadow p-4 overflow-x-auto border w-full">
          <h3 className="text-lg font-semibold mb-4">My Products</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Name</th>
                <th className="p-2">Status</th>
                <th className="p-2">Price</th>
                <th className="p-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No products yet.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="p-2 font-semibold">{product.title}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold
                        ${product.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"}
                      `}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-2">{product.price} €</td>
                    <td className="p-2 text-right">
                      <div className="relative inline-block action-dropdown">
                        <button
                          className="px-3 py-1 bg-gray-100 text-gray-700 border rounded hover:bg-gray-200 flex items-center gap-1"
                          onClick={() => setActionOpenId(actionOpenId === product.id ? null : product.id)}
                          type="button"
                        >
                          Action <FaEllipsisV />
                        </button>
                        {actionOpenId === product.id && (
                          <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-lg z-20">
                            <button
                              className="flex w-full items-center gap-2 px-4 py-2 text-teal-600 hover:bg-teal-50"
                              onClick={() => handleEdit(product)}
                              type="button"
                            >
                              <FaEdit /> Edit
                            </button>
                            <button
                              className="flex w-full items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50"
                              onClick={() => handleRemove(product.id)}
                              type="button"
                            >
                              <FaTrash /> Remove
                            </button>
                      
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* قسم about في الأسفل فقط */}
        <div className="mt-12 w-full">
          <AboutSection />
        </div>
      </div>
    </div>
  );
}
