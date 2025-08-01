
import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaTruck } from "react-icons/fa";
import PublicNavbar from "../../components/PublicNavbar";

export default function StoreOrders() {
  const [orders, setOrders] = useState([
    { id: 1, customer: "Ali Ahmad", product: "Samsung TV", quantity: 1, status: "pending" },
    { id: 2, customer: "Sara Khaled", product: "iPhone 14", quantity: 2, status: "completed" },
    { id: 3, customer: "Omar Hasan", product: "Nike Shoes", quantity: 1, status: "cancelled" },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const statusColor = {
    pending: "text-yellow-500",
    completed: "text-green-600",
    cancelled: "text-red-600",
  };

  return (

    <div>
      <PublicNavbar />

      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 text-teal-600">Orders Management</h1>

        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Quantity</th>
              <th className="px-4 py-3 text-left">Status</th>
             
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{order.id}</td>
                <td className="px-4 py-3">{order.customer}</td>
                <td className="px-4 py-3">{order.product}</td>
                <td className="px-4 py-3">{order.quantity}</td>
                <td className={`px-4 py-3 font-semibold ${statusColor[order.status]}`}>
                  {order.status}
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
}
