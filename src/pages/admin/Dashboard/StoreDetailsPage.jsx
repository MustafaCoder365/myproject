import React from "react";
import { useParams } from "react-router-dom";
import { FaStoreAlt, FaUser, FaFileAlt, FaMoneyBill } from "react-icons/fa";

const dummyStores = {
  2: {
    storeName: "Fashion World",
    owner: "Sara Mahmoud",
    location: "Damascus - City Center",
    document: "fashion_world_license.pdf",
    paymentDetails: { amount: 150, transactionId: "TXN98432", date: "2024-02-04" },
    products: [
      { id: 1, name: "Adidas T-Shirt", price: 30, quantity: 40 },
      { id: 2, name: "Adidas Shoes", price: 80, quantity: 20 },
      { id: 3, name: "Jeans Jacket", price: 60, quantity: 15 }
    ]
  },
  1: {
    storeName: "Tech Galaxy",
    owner: "Ahmad Khalil",
    location: "Aleppo - Downtown",
    document: "tech_galaxy_license.pdf",
    paymentDetails: { amount: 200, transactionId: "TXN12345", date: "2024-07-06" },
    products: [
      { id: 4, name: "Samsung TV", price: 500, quantity: 10 },
      { id: 5, name: "iPhone 12", price: 765, quantity: 5 },
      { id: 5, name: "iPhone 14", price: 999, quantity: 5 },
      { id: 5, name: "iPhone 15 pro max", price: 919, quantity: 1 },
      { id: 5, name: "iPhone 11", price: 177, quantity: 5 },
      { id: 5, name: "iPhone 14 pro", price: 899, quantity: 5 },
      { id: 5, name: "iPhone 14", price: 998, quantity: 5 },
      { id: 6, name: "Sony Headphones", price: 150, quantity: 8 }
    ]
  }
};

export default function StoreDetailsPage() {
  const { id } = useParams();
  const store = dummyStores[id];

  if (!store) return <p className="text-center mt-20 text-red-500">No Store Found</p>;

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-6 text-teal-600 flex items-center gap-2">
        <FaStoreAlt /> {store.storeName}
      </h1>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <p className="flex items-center gap-2"><FaUser /> Owner: {store.owner}</p>
        <p className="flex items-center gap-2"><FaFileAlt /> Commercial Record: {store.document}</p>
        <p className="flex items-center gap-2"><FaMoneyBill /> Paid: ${store.paymentDetails.amount}</p>
        <p>Transaction ID: {store.paymentDetails.transactionId}</p>
        <p>Date: {store.paymentDetails.date}</p>
        <p>Location: {store.location}</p>
      </div>

      <h2 className="text-xl font-bold mb-4">Products Sold</h2>
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Product</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Quantity Sold</th>
          </tr>
        </thead>
        <tbody>
          {store.products.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">${p.price}</td>
              <td className="px-4 py-2">{p.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
