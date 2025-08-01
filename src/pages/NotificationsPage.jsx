import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import PublicNavbar from "../components/PublicNavbar";

export default function NotificationsPage() {
  const [notifications] = useState([
    { id: 1, text: "Your product 'Nike Shoes' has been sold!" },
    { id: 2, text: "Order #1021 has been shipped." },
    { id: 3, text: "Wallet recharged with 20€." },
  ]);

  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!message.trim()) return alert("Message cannot be empty!");
    alert(`Message sent to platform: ${message}`);
    setMessage("");
  };

  return (
      <div>
                <PublicNavbar />
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-2xl font-bold text-teal-600 mb-6">Notifications & Messages</h1>

      {/* Notifications List */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Your Notifications</h2>
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications yet.</p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((n) => (
              <li key={n.id} className="border-b pb-2">{n.text}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Send Message/Complaint */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Send a Complaint or Message</h2>
        <textarea
          className="w-full border rounded p-2 mb-4"
          rows="4"
          placeholder="Write your message or complaint..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-500 transition"
        >
          <FaPaperPlane /> Send
        </button>
      </div>
    </div>
    </div>
  );
}
