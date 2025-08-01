import React from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, CartesianGrid } from "recharts";
import { FaDollarSign, FaShoppingCart, FaUsers, FaStore } from "react-icons/fa";

export default function PlatformReports() {
  const salesData = [
    { month: "Apr", sales: 2, profit: 300 },
    { month: "May", sales: 2, profit: 700 },
    { month: "Jun", sales: 2, profit: 520 },
  ];

  const usersStoresData = [
    { month: "Apr", users: 1, stores: 1 },
    { month: "May", users: 2, stores: 2 },
    { month: "Jun", users: 1, stores: 1 },
  ];

  const ordersData = [
    { status: "Completed", value: 3 },
    { status: "Pending", value: 2 },
    { status: "Delayed", value: 1 }
  ];

  const COLORS = ["#00b894", "#fdcb6e", "#307dd6"];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-teal-600">Platform Reports - Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard icon={<FaDollarSign />} label="Total Revenue" value="$1520" />
        <StatCard icon={<FaShoppingCart />} label="Total Orders" value="6" />
        <StatCard icon={<FaUsers />} label="New Users" value="4" />
        <StatCard icon={<FaStore />} label="New Stores" value="4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-4">Monthly Sales and Profit</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis /> 
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#00b894" />
              <Bar dataKey="profit" fill="#fd79a8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-4">Orders Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={ordersData} dataKey="value" nameKey="status" cx="50%" cy="50%" outerRadius={80} label>
                {ordersData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow mb-10">
        <h3 className="font-semibold mb-4">New Users & Stores Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={usersStoresData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#0984e3" />
            <Line type="monotone" dataKey="stores" stroke="#fdcb6e" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center text-sm text-gray-400">Last updated: {new Date().toLocaleString()}</div>
    </div>
  );
}

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-4 rounded shadow flex items-center gap-4">
    <div className="text-3xl text-teal-500">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);
