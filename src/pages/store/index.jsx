// src/pages/store/StoreHome.jsx
import React, { useState, useEffect } from "react";
import {
  FaTags,
  FaPlus,
  FaBoxOpen,
  FaClipboardList,
  FaCommentDots,
  FaSignOutAlt,
  FaArrowLeft,
  FaCheck,
  FaHourglassHalf,
} from "react-icons/fa";
import StoreSection from "../../components/StoreSection";
import AboutSection from "../../components/AboutSection";

export default function StoreHome() {
  // ─── قائمة المتاجر (يمكن لاحقاً جلبها من API) ───
  const [stores] = useState([
    { name: "Downtown Branch", link: "/store/downtown" },
    { name: "Mall Outlet", link: "/store/mall" },
    { name: "Airport Kiosk", link: "/store/airport" },
    { name: "Beachside Shop", link: "/store/beach" },
  ]);

  const [activeSection, setActiveSection] = useState("categories");
  const [storeId, setStoreId] = useState(null);

  // تأكيد صلاحية التوكن وتعيين الـ storeId
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const id = localStorage.getItem("storeId");
    if (!token || role !== "store") {
      window.location.href = "/login/store";
    } else {
      setStoreId(Number(id));
    }
  }, []);

  // ─── بيانات تجريبية ───
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", storeId: 1 },
    { id: 2, name: "Books", storeId: 1 },
    { id: 3, name: "Clothing", storeId: 1 },
    { id: 4, name: "Home", storeId: 1 },
  ]);

  const [products, setProducts] = useState([
    { id: 1, title: "Smartphone", categoryId: 1, storeId: 1, price: 299 },
    { id: 2, title: "Novel", categoryId: 2, storeId: 1, price: 19 },
    { id: 3, title: "T-Shirt", categoryId: 3, storeId: 1, price: 25 },
    { id: 4, title: "Coffee Table", categoryId: 4, storeId: 1, price: 99 },
  ]);

  const [orders] = useState([
    { id: 1, customerName: "Ali", productId: 1, status: "New", storeId: 1 },
    {
      id: 2,
      customerName: "Sara",
      productId: 2,
      status: "Completed",
      storeId: 1,
    },
  ]);

  const [complaints, setComplaints] = useState([
    {
      id: 1,
      customerName: "Ali",
      message: "Product arrived damaged",
      date: "2025-07-10",
      status: "Open",
      storeId: 1,
    },
    {
      id: 2,
      customerName: "Sara",
      message: "Late delivery",
      date: "2025-07-12",
      status: "Pending",
      storeId: 1,
    },
    {
      id: 3,
      customerName: "John",
      message: "Wrong item sent",
      date: "2025-07-15",
      status: "Resolved",
      storeId: 1,
    },
  ]);

  // حالات النموذج لإضافة فئة ومنتج
  const [newCategory, setNewCategory] = useState("");
  const [useNewCategory, setUseNewCategory] = useState(false);
  const [newProductCategoryName, setNewProductCategoryName] = useState("");
  const [newProduct, setNewProduct] = useState({
    title: "",
    categoryId: "",
    price: "",
  });

  // ─── دوال التعامل ───
  const handleAddCategory = () => {
    const name = newCategory.trim();
    if (!name) return;
    setCategories((prev) => [...prev, { id: Date.now(), name, storeId }]);
    setNewCategory("");
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    let categoryIdToUse = Number(newProduct.categoryId);
    if (useNewCategory) {
      const name = newProductCategoryName.trim();
      if (!name) return;
      const newCat = { id: Date.now(), name, storeId };
      setCategories((prev) => [...prev, newCat]);
      categoryIdToUse = newCat.id;
      setNewProductCategoryName("");
    }
    setProducts((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newProduct.title,
        categoryId: categoryIdToUse,
        price: Number(newProduct.price),
        storeId,
      },
    ]);
    setNewProduct({ title: "", categoryId: "", price: "" });
    setUseNewCategory(false);
  };

  const handleStatusChange = (id) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Resolved" ? "Open" : "Resolved" }
          : c
      )
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const backButton = (
    <button
      onClick={() => setActiveSection("categories")}
      className="flex items-center text-blue-600 mb-4"
    >
      <FaArrowLeft className="mr-2" /> Back
    </button>
  );

  // عرض شاشة التحميل حتى يحدد storeId
  if (storeId === null) {
    return (
      <div className="flex items-center justify-center h-screen">Loading…</div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ← هنا يظهر مكوّن المتاجر بين الـ Navbar والـ Dashboard */}{" "}
      <div className="mb-10">
        <StoreSection stores={stores} />
      </div>
      {/* Dashboard */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-white shadow p-4 space-y-4">
          <button
            onClick={() => setActiveSection("categories")}
            className="flex items-center gap-2 w-full p-2 rounded hover:bg-blue-100"
          >
            <FaTags /> Categories
          </button>
          <button
            onClick={() => setActiveSection("addProduct")}
            className="flex items-center gap-2 w-full p-2 rounded hover:bg-blue-100"
          >
            <FaPlus /> Add Product
          </button>
          <button
            onClick={() => setActiveSection("products")}
            className="flex items-center gap-2 w-full p-2 rounded hover:bg-blue-100"
          >
            <FaBoxOpen /> Products
          </button>
          <button
            onClick={() => setActiveSection("orders")}
            className="flex items-center gap-2 w-full p-2 rounded hover:bg-blue-100"
          >
            <FaClipboardList /> Orders
          </button>
          <button
            onClick={() => setActiveSection("complaints")}
            className="flex items-center gap-2 w-full p-2 rounded hover:bg-blue-100"
          >
            <FaCommentDots /> Complaints
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full p-2 rounded text-red-600 hover:bg-red-100 mt-4"
          >
            <FaSignOutAlt /> Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeSection === "categories" && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Store Categories</h2>
              {categories
                .filter((c) => c.storeId === storeId)
                .map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-white p-3 rounded shadow mb-2"
                  >
                    {cat.name}
                  </div>
                ))}
              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  placeholder="New Category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 border px-3 py-2 rounded"
                />
                <button
                  onClick={handleAddCategory}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
            </section>
          )}

          {activeSection === "addProduct" && (
            <section>
              {backButton}
              <h2 className="text-2xl font-bold mb-4">Add Product</h2>
              <form
                onSubmit={handleAddProduct}
                className="bg-white p-4 rounded shadow space-y-4"
              >
                <input
                  type="text"
                  placeholder="Product Title"
                  value={newProduct.title}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, title: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                  required
                />
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={!useNewCategory}
                      onChange={() => setUseNewCategory(false)}
                    />
                    Existing Category
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={useNewCategory}
                      onChange={() => setUseNewCategory(true)}
                    />
                    New Category
                  </label>
                </div>
                {!useNewCategory ? (
                  <select
                    value={newProduct.categoryId}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        categoryId: e.target.value,
                      })
                    }
                    className="w-full border px-3 py-2 rounded"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories
                      .filter((c) => c.storeId === storeId)
                      .map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder="New Category Name"
                    value={newProductCategoryName}
                    onChange={(e) => setNewProductCategoryName(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                )}
                <input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Add to Store
                </button>
              </form>
            </section>
          )}

          {activeSection === "products" && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Store Products</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {products
                  .filter((p) => p.storeId === storeId)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="bg-white p-4 rounded shadow"
                    >
                      <h3 className="font-bold">{product.title}</h3>
                      <p>Price: ${product.price}</p>
                    </div>
                  ))}
              </div>
            </section>
          )}

          {activeSection === "orders" && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Orders</h2>
              <table className="w-full bg-white rounded shadow text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">Customer</th>
                    <th className="p-2">Product</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders
                    .filter((o) => o.storeId === storeId)
                    .map((order) => {
                      const product = products.find(
                        (p) => p.id === order.productId
                      );
                      return (
                        <tr key={order.id} className="border-t">
                          <td className="p-2">{order.customerName}</td>
                          <td className="p-2">{product?.title || "Unknown"}</td>
                          <td className="p-2">{order.status}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </section>
          )}

          {activeSection === "complaints" && (
            <section>
              {backButton}
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FaCommentDots /> Complaints
              </h2>
              {complaints
                .filter((c) => c.storeId === storeId)
                .map((complaint) => (
                  <div
                    key={complaint.id}
                    className="bg-white p-4 rounded shadow mb-4"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">
                        {complaint.customerName}
                      </span>
                      <span className="text-sm text-gray-500">
                        {complaint.date}
                      </span>
                    </div>
                    <p className="mb-4">{complaint.message}</p>
                    <div className="flex justify-between items-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          complaint.status === "Open"
                            ? "bg-red-100 text-red-800"
                            : complaint.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {complaint.status}
                      </span>
                      <button
                        onClick={() => handleStatusChange(complaint.id)}
                        className="text-sm font-medium hover:underline flex items-center"
                      >
                        {complaint.status !== "Resolved" ? (
                          <>
                            <FaCheck className="mr-1" /> Mark Resolved
                          </>
                        ) : (
                          <>
                            <FaHourglassHalf className="mr-1" /> Reopen
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              {complaints.filter((c) => c.storeId === storeId).length === 0 && (
                <p className="italic text-gray-600">No complaints to show.</p>
              )}
            </section>
          )}
        </main>
      </div>
      {/* Footer */}
      <footer className="">
        <AboutSection />
      </footer>
    </div>
  );
}
