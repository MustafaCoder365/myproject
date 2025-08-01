import React from "react";
import { Link } from "react-router-dom";
import { FaBoxes, FaStore, FaClipboardList, FaChartBar, FaCogs, FaHeadset } from "react-icons/fa";
import PublicNavbar from "../../components/PublicNavbar";
export default function StoreDashboard() {
  const cards = [
    {
      title: "Manage Categories",
      link: "/store-dashboard/categories",
      icon: <FaBoxes />,
      color: "bg-teal-100 text-teal-800",
    },
    {
      title: "Manage Products",
      link: "/store-dashboard/Products",
      icon: <FaStore />,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Manage Orders",
      link: "/store-dashboard/orders",
      icon: <FaClipboardList />,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Reports",
      link: "/store-dashboard/reports",
      icon: <FaChartBar />,
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Store Settings",
      link: "/store-dashboard/settings",
      icon: <FaCogs />,
      color: "bg-purple-100 text-purple-800",
    },
    {
      title: "Support / Complaints",
      link: "/store-dashboard/support",
      icon: <FaHeadset />,
      color: "bg-pink-100 text-pink-800",
    },
  ];

  return (
    <div>
      <PublicNavbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8 text-teal-600">Store Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Link
              to={card.link}
              key={index}
              className={`${card.color} rounded-xl p-6 flex items-center gap-4 shadow-md hover:shadow-lg transition transform hover:scale-105`}
            >
              <div className="text-3xl">{card.icon}</div>
              <div>
                <h2 className="text-lg font-semibold">{card.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
