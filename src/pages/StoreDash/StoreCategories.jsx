import React, { useState } from "react";
import { storeCategories as initialCategories } from "../../Data/storeCategories";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import PublicNavbar from "../../components/PublicNavbar";

export default function StoreCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [form, setForm] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // ==== For Delete Modal ====
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleAdd = () => {
    if (form.trim() === "") return alert("Category name required");
    setCategories([...categories, { id: Date.now(), name: form }]);
    setForm("");
  };

  const handleEdit = (category) => {
    setEditMode(true);
    setForm(category.name);
    setCurrentId(category.id);
  };

  const handleSaveEdit = () => {
    setCategories(
      categories.map((cat) =>
        cat.id === currentId ? { ...cat, name: form } : cat
      )
    );
    setEditMode(false);
    setForm("");
    setCurrentId(null);
  };

  // === Step 1: open modal ===
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // === Step 2: actually delete ===
  const handleDelete = () => {
    setCategories(categories.filter((cat) => cat.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div>
      <PublicNavbar />

      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 text-teal-600">
          Manage Categories
        </h1>

        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Category Name"
            value={form}
            onChange={(e) => setForm(e.target.value)}
            className="border rounded px-4 py-2 w-64"
          />
          {editMode ? (
            <button
              onClick={handleSaveEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <FaEdit /> Save
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="bg-teal-500 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <FaPlus /> Add
            </button>
          )}
        </div>

        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Category Name
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">{cat.name}</td>
                <td className="px-6 py-3 flex justify-center gap-4">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => confirmDelete(cat.id)}
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

      {/* Delete Confirm Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm animate-fadeIn">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete this category?
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
  );
}
