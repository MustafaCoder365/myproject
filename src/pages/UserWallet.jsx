import React, { useEffect, useState } from "react";
import { FaWallet, FaArrowUp } from "react-icons/fa";
import PublicNavbar from "../components/PublicNavbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

export default function UserWallet() {
  const [transactions, setTransactions] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [chartData, setChartData] = useState([]);

  // ====== Dummy بيع المنتجات ======
  const dummySales = [
    { id: 1, amount: 50, date: "2025-01-12" },
    { id: 2, amount: 30, date: "2025-02-10" },
    { id: 3, amount: 70, date: "2025-02-22" },
    { id: 4, amount: 120, date: "2025-03-01" },
    { id: 5, amount: 10, date: "2025-07-01" },
  ];

  useEffect(() => {
    setTransactions(dummySales);
    const total = dummySales.reduce((sum, s) => sum + s.amount, 0);
    setTotalSales(total);

    // ===== تجهيز بيانات الشارت حسب الشهر =====
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthlyData = Array(12).fill(0);

    dummySales.forEach((s) => {
      const monthIndex = new Date(s.date).getMonth();
      monthlyData[monthIndex] += s.amount;
    });

    const chartFormatted = months.map((month, index) => ({
      month,
      earnings: monthlyData[index],
    }));
    setChartData(chartFormatted);
  }, []);

  return (
    <div>
      <PublicNavbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-teal-600">My Wallet</h1>

        {/* Cards - Total Sales */}
        <div className="bg-white p-6 rounded shadow flex items-center gap-4 mb-8">
          <FaWallet className="text-4xl text-teal-500" />
          <div>
            <p className="text-gray-500 text-sm">Total Sales</p>
            <p className="text-xl font-bold">${totalSales.toFixed(2)}</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="earnings" fill="#00b894" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Transactions Table */}
        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Sales Transactions</h2>
          <table className="w-full text-left border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="p-2">
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td className="p-2 text-green-600 flex items-center gap-2">
                    <FaArrowUp /> ${t.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
