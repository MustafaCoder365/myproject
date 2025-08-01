import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaStoreAlt, FaMoneyCheckAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function StoreRequests() {
  const navigate = useNavigate();
  const [stores, setStores] = useState([
    {
      id: 1,
      storeName: "Tech Galaxy",
      owner: "Ahmad Khalil",
      document: "tech_galaxy_license.pdf",
      date: "2024-07-01",
      status: "pending",
      payment: false,
      paymentDetails: null
    },
    {
      id: 2,
      storeName: "Fashion World",
      owner: "Sara Mahmoud",
      document: "fashion_world_license.pdf",
      date: "2024-07-03",
      status: "paid",
      payment: true,
      paymentDetails: { amount: 150, transactionId: "TXN98432", date: "2024-07-04" }
    },
    {
      id: 3,
      storeName: "Furniture Hub",
      owner: "Omar Hasan",
      document: "furniture_hub_license.pdf",
      date: "2024-07-05",
      status: "pending",
      payment: false,
      paymentDetails: null
    }
  ]);

  const handleApprove = (id) => {
    setStores(stores.map(s =>
      s.id === id
        ? {
            ...s,
            status: "paid",
            payment: true,
            paymentDetails: {
              amount: 200,
              transactionId: `TXN${Math.floor(Math.random() * 99999)}`,
              date: new Date().toISOString().split("T")[0]
            }
          }
        : s
    ));
  };

  const handleReject = (id) => {
    setStores(stores.map(s => (s.id === id ? { ...s, status: "rejected" } : s)));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-teal-600">Store Registration Requests</h1>

      <table className="min-w-full bg-white border rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Store Name</th>
            <th className="px-4 py-3 text-left">Owner</th>
            <th className="px-4 py-3 text-left">Commercial Record</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 flex items-center gap-2"><FaStoreAlt /> {s.storeName}</td>
              <td className="px-4 py-3">{s.owner}</td>
              <td className="px-4 py-3">
                <a href="#" className="text-blue-500 hover:underline">{s.document}</a>
              </td>
              <td className="px-4 py-3">{s.date}</td>
              <td className="px-4 py-3">
                {s.status === "pending" && <span className="text-yellow-500">Pending</span>}
                {s.status === "paid" && <span className="text-green-600">Paid</span>}
                {s.status === "rejected" && <span className="text-red-500">Rejected</span>}
              </td>
              <td className="px-4 py-3 flex justify-center gap-4">
                {s.status === "pending" ? (
                  <>
                    <button onClick={() => handleApprove(s.id)} className="text-green-600 hover:text-green-800"><FaCheckCircle /></button>
                    <button onClick={() => handleReject(s.id)} className="text-red-600 hover:text-red-800"><FaTimesCircle /></button>
                  </>
                ) : s.payment ? (
                  <button
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    onClick={() => navigate(`/store/${s.id}`)}
                  >
                    <FaMoneyCheckAlt /> Details
                  </button>
                ) : (
                  <span className="text-gray-400">No actions</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
