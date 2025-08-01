import React, { useState } from "react";
import { FaEnvelopeOpenText, FaPaperPlane, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import PublicNavbar from "../../components/PublicNavbar";
export default function StoreSupport() {
  const [complaints, setComplaints] = useState([
    { id: 1, message: "Delivery delay issue", status: "open" },
    { id: 2, message: "Incorrect payment processing", status: "closed" },
  ]);

  const [newComplaint, setNewComplaint] = useState("");

  const handleSend = () => {
    if (newComplaint.trim() === "") return alert("Please write your complaint");
    setComplaints([
      ...complaints,
      { id: Date.now(), message: newComplaint, status: "open" },
    ]);
    setNewComplaint("");
  };

  return (
    <div>
      <PublicNavbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6 text-teal-600">Support / Complaints</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><FaEnvelopeOpenText /> Send a New Complaint</h2>

          <textarea
            value={newComplaint}
            onChange={(e) => setNewComplaint(e.target.value)}
            rows="4"
            className="w-full border rounded px-4 py-2 mb-4"
            placeholder="Describe your issue here..."
          />

          <button
            onClick={handleSend}
            className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-500 transition flex items-center gap-2"
          >
            <FaPaperPlane /> Submit
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Your Complaints</h2>

          {complaints.length === 0 ? (
            <p className="text-gray-500">No complaints yet.</p>
          ) : (
            <ul className="space-y-4">
              {complaints.map((c) => (
                <li key={c.id} className="flex items-start justify-between bg-gray-50 p-4 rounded shadow-sm hover:bg-gray-100">
                  <div>
                    <p className="text-gray-700">{c.message}</p>
                    <p className={`text-sm mt-1 ${c.status === "open" ? "text-yellow-600" : "text-green-600"}`}>
                      {c.status === "open" ? "Open" : "Closed"}
                    </p>
                  </div>
                  <div className="text-xl">
                    {c.status === "open" ? <FaTimesCircle className="text-yellow-500" /> : <FaCheckCircle className="text-green-500" />}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
