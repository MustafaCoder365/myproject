import React from "react";
import PublicNavbar from "../components/PublicNavbar";
import { FaBoxOpen, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function StoreProfilePage() {
  const products = [
    { id: 1, name: "Samsung TV", retail: 500, wholesale: 450, quantity: 2 },
    { id: 2, name: "iPhone 14", retail: 999, wholesale: 900, quantity: 15 },
    { id: 3, name: "Nike Shoes", retail: 120, wholesale: 100, quantity: 3 },
  ];

  const orders = [
    { id: 101, product: "Samsung TV", status: "delivered" },
    { id: 102, product: "iPhone 14", status: "pending" },
    { id: 103, product: "Nike Shoes", status: "delivered" },
  ];

  const chartData = products.map((p) => ({
    name: p.name,
    sales: p.retail * p.quantity,
    profit: (p.retail - p.wholesale) * p.quantity,
  }));

  const lowStockProducts = products.filter((p) => p.quantity <= 5);
  const deliveredOrders = orders.filter((o) => o.status === "delivered");

  return (
    <div>
      <PublicNavbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold text-[#00b894] animate-pulse mb-8">Important!</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-700">
              <FaBoxOpen /> Important Orders
            </h2>
            {orders.map((order) => (
              <p key={order.id} className="text-sm text-gray-600 mb-2">
                Order #{order.id} - {order.product} ({order.status})
              </p>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-yellow-600">
              <FaExclamationTriangle /> Low Stock Products
            </h2>
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map((p) => (
                <p key={p.id} className="text-sm text-gray-600 mb-2">
                  {p.name} - Only {p.quantity} left!
                </p>
              ))
            ) : (
              <p className="text-sm text-gray-500">All products are in stock.</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-green-600">
              <FaCheckCircle /> Delivered Orders
            </h2>
            {deliveredOrders.map((o) => (
              <p key={o.id} className="text-sm text-gray-600 mb-2">
                Order #{o.id} - {o.product}
              </p>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#00b894" />
              <Bar dataKey="profit" fill="#ca96d7ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
