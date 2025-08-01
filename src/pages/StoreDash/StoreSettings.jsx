import React, { useState } from "react";
import { FaStore, FaPaypal, FaUniversity } from "react-icons/fa";
import PublicNavbar from "../../components/PublicNavbar";
export default function StoreSettings() {
  const [form, setForm] = useState({
    storeName: "My Awesome Store",
    description: "We sell the best products.",
    paymentMethod: "bank",
    bankAccount: "1234567890",
    paypalEmail: "mystore@example.com",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert("Store information updated successfully!");
    // هنا تقدر تربطها مع API لاحقًا
  };

  return (
    <div>
      <PublicNavbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6 text-teal-600">Store Settings</h1>

        <div className="space-y-4 max-w-lg">
          <div>
            <label className="text-sm font-semibold flex items-center gap-2">
              <FaStore /> Store Name
            </label>
            <input
              name="storeName"
              value={form.storeName}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded mt-1"
              rows="3"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Payment Method</label>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded mt-1"
            >
              <option value="bank">Bank Transfer</option>
              <option value="paypal">Paypal</option>
            </select>
          </div>

          {form.paymentMethod === "bank" && (
            <div>
              <label className="text-sm font-semibold flex items-center gap-2">
                <FaUniversity /> Bank Account
              </label>
              <input
                name="bankAccount"
                value={form.bankAccount}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded mt-1"
              />
            </div>
          )}

          {form.paymentMethod === "paypal" && (
            <div>
              <label className="text-sm font-semibold flex items-center gap-2">
                <FaPaypal /> Paypal Email
              </label>
              <input
                name="paypalEmail"
                value={form.paypalEmail}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded mt-1"
                type="email"
              />
            </div>
          )}
 </div>
          <button
            onClick={handleSave}
            className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-500 transition mt-4"
          >
            Save Settings
          </button>
        </div>
      </div>
   
  );
}
