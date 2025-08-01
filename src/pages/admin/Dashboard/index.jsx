import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- تم إضافته
import {
  FaUser, FaMotorcycle, FaChartLine, FaHome, FaBoxOpen, FaStore, FaUsers,
  FaBell, FaChartPie, FaClipboardList, FaTruck, FaSignOutAlt, FaPaperPlane
} from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

import Categories from "./categories";
import UserProducts from "./userProducts";
import StoreRequests from "./storeRequests";
import ManageUsers from "./ManageUsers";
import ManageDeliveryAgents from "./deliveryAgents";
import Complaints from "./complaints";
import SendNotifications from "./sendNotifications";
import PlatformReports from "./platformReports";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("profit");
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const navigate = useNavigate(); // <-- لإعادة التوجيه

  const stores = [
    { id: 1, name: "Tech Galaxy", profit: 1200 },
    { id: 2, name: "Fashion World", profit: 850 },
    { id: 3, name: "Furniture Hub", profit: 560 }
  ];

  const users = [
    { id: 1, name: "Ahmad Ali", total: 400 },
    { id: 2, name: "Sara Saleh", total: 250 },
    { id: 3, name: "Mohammad Yousef", total: 300 }
  ];

  const agents = [
    { id: 1, name: "Ali Ali", deliveries: 20, profit: 20 * 3 },
    { id: 2, name: "Sari Salman", deliveries: 35, profit: 35 * 3 }
  ];

  const chartData = selectedStore
    ? [
      { name: "Store Profit", value: selectedStore.profit },
      { name: "Platform Fee", value: selectedStore.profit * 0.1 },
      { name: "Net", value: selectedStore.profit * 0.9 }
    ]
    : selectedUser
      ? [
        { name: selectedUser.name, value: selectedUser.total },
        { name: "Platform Fee", value: selectedUser.total * 0.05 }
      ]
      : selectedAgent
        ? [
          { name: selectedAgent.name, value: selectedAgent.profit },
          { name: "Platform Fee", value: selectedAgent.profit * 0.1 }
        ]
        : [];

  const renderContent = () => {
    switch (activePage) {
      case "categories":
        return <Categories />;
      case "products":
        return <UserProducts />;
      case "stores":
        return <StoreRequests />;
      case "users":
        return <ManageUsers />;
      case "delivery":
        return <ManageDeliveryAgents />;
      case "complaints":
        return <Complaints />;
      case "reports":
        return <PlatformReports />;
      case "notifications":
        return <SendNotifications />;
      case "profit":
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-6 text-teal-600 flex items-center gap-2">
              <FaChartLine /> Profit Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Dropdown label="Select Store" icon={<FaStore />} items={stores} onChange={setSelectedStore} />
              <Dropdown label="Select User" icon={<FaUser />} items={users} onChange={setSelectedUser} />
              <Dropdown label="Select Agent" icon={<FaMotorcycle />} items={agents} onChange={setSelectedAgent} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {selectedStore && (
                <Card title={selectedStore.name} value={`Total Profit: $${selectedStore.profit}`} />
              )}
              {selectedUser && (
                <Card title={selectedUser.name} value={`Purchases Total: $${selectedUser.total}`} />
              )}
              {selectedAgent && (
                <Card
                  title={selectedAgent.name}
                  value={`Deliveries: ${selectedAgent.deliveries} | Profit: $${selectedAgent.profit}`}
                />
              )}
            </div>
            {chartData.length > 0 && (
              <div className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4 text-gray-700">Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#00b894" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        );
      default:
        return <div className="p-8 text-gray-500">Select a section from sidebar</div>;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // إذا موجود توكن تسجيل دخول
    navigate("/"); // يرجع للصفحة الرئيسية
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-gray-800 text-white p-6 space-y-2">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <SidebarLink icon={<FaHome />} label="Profit" onClick={() => setActivePage("profit")} />
        <SidebarLink icon={<FaClipboardList />} label="Categories" onClick={() => setActivePage("categories")} />
        <SidebarLink icon={<FaBoxOpen />} label="User Products" onClick={() => setActivePage("products")} />
        <SidebarLink icon={<FaStore />} label="Store Registrations" onClick={() => setActivePage("stores")} />
        <SidebarLink icon={<FaUsers />} label="Manage Users" onClick={() => setActivePage("users")} />
        <SidebarLink icon={<FaTruck />} label="Delivery Agents" onClick={() => setActivePage("delivery")} />
        <SidebarLink icon={<FaBell />} label="Complaints" onClick={() => setActivePage("complaints")} />
        <SidebarLink icon={<FaChartPie />} label="Platform Reports" onClick={() => setActivePage("reports")} />
        <SidebarLink icon={<FaPaperPlane />} label="Notifications" onClick={() => setActivePage("notifications")} />
        <SidebarLink icon={<FaSignOutAlt />} label="Logout" onClick={handleLogout} /> {/* تم التعديل هنا */}
      </div>
      <div className="flex-1 p-8 bg-gray-100">{renderContent()}</div>
    </div>
  );
}

const SidebarLink = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 w-full text-left hover:bg-gray-700 px-4 py-2 rounded"
  >
    {icon} <span>{label}</span>
  </button>
);

const Dropdown = ({ label, icon, items, onChange }) => (
  <div>
    <label className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
      {icon} {label}
    </label>
    <select
      className="w-full border px-4 py-2 rounded"
      onChange={(e) => onChange(items.find((i) => i.id === parseInt(e.target.value)) || null)}
      defaultValue=""
    >
      <option value="">-- Select --</option>
      {items.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  </div>
);

const Card = ({ title, value }) => (
  <div className="bg-white rounded shadow p-6">
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{value}</p>
  </div>
);
