import React, { useState } from "react";
import PublicNavbar from "../../components/PublicNavbar";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { storeProducts } from "../../Data/storeProducts";

export default function StoreProfilePage() {
  const [products, setProducts] = useState(storeProducts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", quantity: "", image: "" });

  const isValid = (form) =>
    form.name.trim() !== "" &&
    !isNaN(form.price) &&
    parseFloat(form.price) > 0 &&
    !isNaN(form.quantity);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm({ ...form, image: reader.result });
    reader.readAsDataURL(file);
  };

  const confirmDelete = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setProducts(products.filter((p) => p.id !== productToDelete));
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleAdd = () => {
    if (!isValid(form)) return alert("Please fill all fields correctly.");

    const newId = products.length
      ? Math.max(...products.map((p) => p.id)) + 1
      : 1;

    setProducts([
      ...products,
      {
        id: newId,
        name: form.name,
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity),
        image: form.image,
      },
    ]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!isValid(form)) return alert("Please fill all fields correctly.");

    setProducts(
      products.map((p) =>
        p.id === currentProduct.id
          ? {
              ...p,
              name: form.name,
              price: parseFloat(form.price),
              quantity: parseInt(form.quantity),
              image: form.image || p.image,
            }
          : p
      )
    );
    setShowEditModal(false);
    resetForm();
  };

  const resetForm = () => {
    setForm({ name: "", price: "", quantity: "", image: "" });
    setCurrentProduct(null);
  };

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      image: product.image || "",
    });
    setShowEditModal(true);
  };

  return (
    <div>
      <PublicNavbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#00b894] animate-pulse">
            Products
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-500 transition"
          >
            <FaPlus /> Add Product
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto shadow-md rounded-lg mb-8">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-400">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Qty
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr
                  key={p.id}
                  className={`hover:bg-teal-50 transition-all ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3">{p.name}</td>
                  <td className="px-4 py-3">${(p.price || 0).toFixed(2)}</td>
                  <td className="px-4 py-3">{p.quantity || 0}</td>
                  <td className="px-4 py-3 flex justify-center gap-3">
                    <button
                      onClick={() => openEditModal(p)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => confirmDelete(p.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Modal */}
        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 bg-gradient-to-br from-white/80 to-teal-100/70 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md animate-fadeIn">
              <h2 className="text-xl font-bold mb-4 text-gray-700">
                {showAddModal ? "Add New Product" : "Edit Product"}
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full border rounded px-3 py-2"
                />
                {form.image && (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="h-24 w-24 object-cover rounded mt-2"
                  />
                )}
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={showAddModal ? handleAdd : handleEdit}
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-500"
                >
                  {showAddModal ? "Add" : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirm Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm animate-fadeIn">
              <h2 className="text-lg font-bold mb-4">
                Are you sure you want to delete this product?
              </h2>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
