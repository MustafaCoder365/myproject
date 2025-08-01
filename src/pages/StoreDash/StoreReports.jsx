import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { FaBox, FaUndoAlt, FaStore } from "react-icons/fa";
import PublicNavbar from "../../components/PublicNavbar";

export default function StoreReports() {
  const soldProducts = 120;
  const returnedProducts = 5;
  const listedProducts = 10;

  const salesData = [
  
    { month: "Jan", sales: 50 },
    { month: "Feb", sales: 10 },
    { month: "Mar", sales: 1 },
    { month: "Apr", sales: 8 },
    { month: "May", sales: 10 },
    { month: "Jun", sales: 18 },
  ];

  return (
     <div>
     <PublicNavbar />

    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-teal-600">Store Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ReportCard title="Products Sold" value={soldProducts} icon={<FaBox />} color="text-green-600" />
        <ReportCard title="Products Returned" value={returnedProducts} icon={<FaUndoAlt />} color="text-red-600" />
        <ReportCard title="Products Listed" value={listedProducts} icon={<FaStore />} color="text-blue-600" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Sales Overview </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#00b894" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
        </div>
  );
}

const ReportCard = ({ title, value, icon, color }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md flex items-center gap-4 hover:shadow-lg transition`}>
      <div className={`text-3xl ${color}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};
