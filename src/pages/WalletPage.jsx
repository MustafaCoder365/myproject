import React, { useMemo } from "react";
import PublicNavbar from "../components/PublicNavbar";
import { FaWallet, FaBoxOpen, FaChartLine } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

export default function StoreWalletPage() {
  // بيانات المبيعات السنوية (عدد القطع المباعة)
  const yearlySalesData = [
    { month: "Jan", sales: 50 },
    { month: "Feb", sales: 600 },
    { month: "Mar", sales: 700 },
    { month: "Apr", sales: 68 },
    { month: "May", sales: 100 },
    { month: "Jun", sales: 180 },
  ];

  // سعر متوسط للقطعة (افتراضياً)
  const averageUnitPrice = 50; // $
  const profitMargin = 0.25;   // 25% ربح صافٍ لكل عملية بيع

  // حساب القيم المنطقية
  const stats = useMemo(() => {
    const totalSales = yearlySalesData.reduce((sum, item) => sum + item.sales, 0);
    const monthlySales = yearlySalesData[yearlySalesData.length - 1].sales; // آخر شهر
    const weeklyOrders = Math.round(monthlySales / 4); // تقدير أسبوعي
    const netProfit = totalSales * averageUnitPrice * profitMargin;
    return {
      netProfit,
      weeklyOrders,
      monthlySales,
    };
  }, [yearlySalesData]);

  return (
    <div>
      <PublicNavbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-8 text-[#00b894] animate-pulse">
          Profit Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Net Profit"
            value={`$${stats.netProfit.toLocaleString()}`}
            icon={<FaWallet />}
          />
          <StatCard
            title="Orders This Week"
            value={stats.weeklyOrders}
            icon={<FaBoxOpen />}
          />
          <StatCard
            title="Last Month Sales"
            value={stats.monthlySales}
            icon={<FaChartLine />}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlySalesData}>
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

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 hover:shadow-lg transition">
    <div className="text-3xl text-teal-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);
