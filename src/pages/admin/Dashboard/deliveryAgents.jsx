import React, { useState } from "react";
import { FaUserTie, FaTrash, FaEdit, FaPlus, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";

export default function ManageDeliveryAgents() {
  const [agents, setAgents] = useState([
    { id: 1, name: "Mohammad Ali", username: "moh_ali", password: "pass123", area: "Damascus", phone: "0996769991", date: "2024-07-01" },
    { id: 2, name: "Lina Hasan", username: "lina_h", password: "lina321", area: "Aleppo", phone: "0988668228", date: "2024-07-03" }
  ]);

  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", username: "", password: "", area: "", phone: "" });

  // ==== حذف مع بوب أب ====
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleOpenAdd = () => {
    setEditId(null);
    setForm({ name: "", username: "", password: "", area: "", phone: "" });
    setShowModal(true);
  };

  const handleOpenEdit = (agent) => {
    setEditId(agent.id);
    setForm({ 
      name: agent.name, 
      username: agent.username, 
      password: agent.password, 
      area: agent.area, 
      phone: agent.phone 
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.username || !form.password || !form.area || !form.phone)
      return alert("Please fill all fields.");
    
    if (editId) {
      setAgents(agents.map(a => a.id === editId ? { ...a, ...form } : a));
    } else {
      setAgents([...agents, { id: Date.now(), ...form, date: new Date().toISOString().split("T")[0] }]);
    }
    setShowModal(false);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setAgents(agents.filter(a => a.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-teal-600">Manage Delivery Agents</h1>

      {/* زر Add Agent */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={handleOpenAdd}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-500 flex items-center gap-2"
        >
          <FaPlus /> Add Agent
        </button>
      </div>

      {/* Agents Table */}
      <table className="min-w-full bg-white border rounded shadow mb-8">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Area</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 flex items-center gap-2"><FaUserTie /> {agent.name}</td>
              <td className="px-4 py-3">{agent.area}</td>
              <td className="px-4 py-3">{agent.phone}</td>
              <td className="px-4 py-3">{agent.date}</td>
              <td className="px-4 py-3 flex justify-center gap-4">
                <button onClick={() => handleOpenEdit(agent)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                <button onClick={() => confirmDelete(agent.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                <button onClick={() => setSelectedAgent(agent)} className="text-teal-600 hover:text-teal-800"><FaInfoCircle /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirm Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm animate-fadeIn">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete this agent?
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

      {/* Add/Edit Agent Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gradient-to-br from-white/80 to-teal-100/70 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">{editId ? "Edit Agent" : "Add New Agent"}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Full Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Username</label>
                <input type="text" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Password</label>
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Area</label>
                <input type="text" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Phone</label>
                <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border rounded px-3 py-2" />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-500">
                {editId ? "Save Changes" : "Add Agent"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
