import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", addedBy: "Admin", date: "2024-07-01" },
    { id: 2, name: "Furniture", addedBy: "Admin", date: "2024-07-02" },
    { id: 3, name: "Shoes", addedBy: "Store A", date: "2024-07-05", status: "pending" }
  ]);

  const [newCategory, setNewCategory] = useState("");

  const handleApprove = (id) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, status: "approved", addedBy: "Store Request" } : cat
      )
    );
  };

  const handleReject = (id) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, status: "rejected" } : cat
      )
    );
  };

  const handleAddCategory = () => {
    if (newCategory.trim() === "") return alert("Category name required");
    const newCat = {
      id: Date.now(),
      name: newCategory,
      addedBy: "Admin",
      date: new Date().toISOString().split("T")[0]
    };
    setCategories([...categories, newCat]);
    setNewCategory("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-teal-600">Manage Categories</h1>

      {/* Admin Add Category */}
      <div className="flex items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="New Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border px-4 py-2 rounded w-64"
        />
        <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-500 transition"
        >
          <FaPlus /> Add Category
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Added By</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{cat.name}</td>
              <td className="px-4 py-3">{cat.addedBy}</td>
              <td className="px-4 py-3">{cat.date}</td>
              <td className="px-4 py-3">
                {cat.status === "pending" && <span className="text-yellow-500">Pending</span>}
                {cat.status === "approved" && <span className="text-green-600">Approved</span>}
                {cat.status === "rejected" && <span className="text-red-600">Rejected</span>}
                {!cat.status && <span className="text-green-600">Active</span>}
              </td>
              <td className="px-4 py-3 flex justify-center gap-4">
                {cat.status === "pending" ? (
                  <>
                    <button onClick={() => handleApprove(cat.id)} className="text-green-600 hover:text-green-800"><FaCheckCircle /></button>
                    <button onClick={() => handleReject(cat.id)} className="text-red-600 hover:text-red-800"><FaTimesCircle /></button>
                  </>
                ) : (
                  <>
                    <button className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                    <button onClick={() => setCategories(categories.filter(c => c.id !== cat.id))} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
