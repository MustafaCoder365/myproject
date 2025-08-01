import React, { useState } from "react";
import { FaTrash, FaUser } from "react-icons/fa";

// بيانات المستخدمين فقط (no stores)
const initialAccounts = [
  { id: 1, name: "Ali Ahmad", role: "user", date: "2024-07-01" },
  { id: 2, name: "Sara Khaled", role: "user", date: "2024-07-02" },
  { id: 3, name: "الأحمد الأحمد", role: "user", date: "2024-07-03" },
  { id: 4, name: "سعيد الخطيب", role: "user", date: "2024-07-04" },
  { id: 5, name: "Rama awad", role: "user", date: "2024-07-05" },
  { id: 6, name: "Raneem Mostapha", role: "user", date: "2024-07-06" },
  { id: 7, name: "الأحمد", role: "user", date: "2024-07-07" }
];

export default function ManageUsers() {
  const [accounts, setAccounts] = useState(initialAccounts);

  // ==== بوب أب الحذف ====
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const confirmDelete = (account) => {
    setDeleteTarget(account);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setAccounts(accounts.filter(acc => acc.id !== deleteTarget.id));
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-teal-600">Manage Users</h1>

      <table className="min-w-full bg-white border rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Date Joined</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => (
            <tr key={acc.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 flex items-center gap-2">
                <FaUser /> {acc.name}
              </td>
              <td className="px-4 py-3 capitalize">{acc.role}</td>
              <td className="px-4 py-3">{acc.date}</td>
              <td className="px-4 py-3 flex justify-center gap-4">
                <button
                  onClick={() => confirmDelete(acc)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ==== Delete Confirm Modal ==== */}
      {showDeleteModal && deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm animate-fadeIn">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete this user?"{deleteTarget.name}"؟
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                إلغاء
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
