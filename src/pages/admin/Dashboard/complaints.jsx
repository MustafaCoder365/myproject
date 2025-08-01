import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaEye } from "react-icons/fa";

export default function Complaints() {
  const [complaints, setComplaints] = useState([
    { id: 1, sender: "Ali Ahmad", role: "user", title: "Late Delivery", message: "My order is delayed due to logistics issues.", date: "2024-07-05", status: "pending" },
    { id: 2, sender: "Tech Galaxy", role: "store", title: "Payment Issue", message: "We haven't received the payment for order #12345.", date: "2024-07-06", status: "pending" },
    { id: 3, sender: "Sara Khaled", role: "user", title: "Damaged Product", message: "The TV arrived with a cracked screen.", date: "2024-07-04", status: "resolved" }
  ]);

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const handleResolve = (id) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, status: "resolved" } : c));
  };

  const handleReject = (id) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, status: "rejected" } : c));
  };

  const handleView = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeModal = () => {
    setSelectedComplaint(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-teal-600">Complaints Management</h1>

      <table className="min-w-full bg-white border rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Sender</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 flex items-center gap-2"><FaExclamationCircle /> {c.sender}</td>
              <td className="px-4 py-3 capitalize">{c.role}</td>
              <td className="px-4 py-3">{c.title}</td>
              <td className="px-4 py-3">{c.date}</td>
              <td className="px-4 py-3">
                {c.status === "pending" && <span className="text-yellow-500">Pending</span>}
                {c.status === "resolved" && <span className="text-green-600">Resolved</span>}
                {c.status === "rejected" && <span className="text-red-600">Rejected</span>}
              </td>
              <td className="px-4 py-3 flex justify-center gap-3">
                <button onClick={() => handleView(c)} className="text-blue-600 hover:text-blue-800" title="View Complaint"><FaEye /></button>
                {c.status === "pending" ? (
                  <>
                    <button onClick={() => handleResolve(c.id)} className="text-green-600 hover:text-green-800"><FaCheckCircle /></button>
                    <button onClick={() => handleReject(c.id)} className="text-red-600 hover:text-red-800"><FaTimesCircle /></button>
                  </>
                ) : (
                  <span className="text-gray-400 text-sm">No actions</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for viewing complaint details */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-gradient-to-br from-white/80 to-teal-100/70 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-700">{selectedComplaint.title}</h2>
            <p className="text-gray-600 mb-6">{selectedComplaint.message}</p>
            <div className="flex justify-end">
              <button onClick={closeModal} className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-500 transition">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
