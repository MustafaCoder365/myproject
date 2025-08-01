import React, { useState } from "react";
import { FaBell, FaUsers, FaStore, FaTruck, FaInbox } from "react-icons/fa";

export default function SendNotifications() {
  const [sentNotifications, setSentNotifications] = useState([]);
  const [form, setForm] = useState({
    target: "users",
    title: "",
    message: ""
  });

  const receivedNotifications = [
    { id: 1, type: "store_registration", text: "New Store Registration Request: Tech Galaxy", date: "2024-07-10 10:00 AM" },
    { id: 2, type: "document_resend", text: "Store 'Fashion World' re-submitted commercial record.", date: "2024-07-10 11:30 AM" },
    { id: 3, type: "delivery_issue", text: "User complaint: Late delivery for order #12345", date: "2024-07-10 12:45 PM" }
  ];

  const handleSend = () => {
    if (!form.title || !form.message) return alert("Please fill all fields.");

    const newNotif = {
      id: Date.now(),
      ...form,
      date: new Date().toLocaleString()
    };

    setSentNotifications([newNotif, ...sentNotifications]);
    setForm({ target: "users", title: "", message: "" });
  };

  const targetIcon = {
    users: <FaUsers className="text-blue-500" />,
    stores: <FaStore className="text-green-500" />,
    delivery: <FaTruck className="text-yellow-500" />
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-teal-600">Notifications Center</h1>

      {/* Send New Notification */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4">
        <h2 className="text-lg font-semibold mb-2">Send New Notification</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={form.target}
            onChange={(e) => setForm({ ...form, target: e.target.value })}
            className="border px-4 py-2 rounded w-full md:w-1/3"
          >
            <option value="users">All Users</option>
            <option value="stores">All Stores</option>
            <option value="delivery">All Delivery Agents</option>
          </select>

          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border px-4 py-2 rounded w-full"
          />
        </div>

        <textarea
          rows={4}
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        />

        <button
          onClick={handleSend}
          className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-500 transition flex items-center gap-2"
        >
          <FaBell /> Send Notification
        </button>
      </div>

      {/* Received Notifications */}
      <h2 className="text-lg font-semibold mb-4">Incoming Platform Notifications</h2>
      <ul className="space-y-4 mb-8">
        {receivedNotifications.map((n) => (
          <li key={n.id} className="bg-white p-4 rounded shadow flex items-start gap-3">
            <FaInbox className="text-purple-500 mt-1" />
            <div>
              <p className="font-medium">{n.text}</p>
              <p className="text-sm text-gray-400">{n.date}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Sent Notifications */}
      <h2 className="text-lg font-semibold mb-4">Sent Notifications</h2>

      {sentNotifications.length === 0 ? (
        <p className="text-gray-500">No notifications sent yet.</p>
      ) : (
        <ul className="space-y-4">
          {sentNotifications.map((n) => (
            <li key={n.id} className="bg-white p-4 rounded shadow flex items-start gap-3">
              {targetIcon[n.target]}
              <div>
                <h3 className="font-bold">{n.title}</h3>
                <p className="text-gray-600">{n.message}</p>
                <p className="text-sm text-gray-400 mt-1">{n.date} - {n.target}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
