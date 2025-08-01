import { products as productsData } from "../../../Data/productsData"; 
import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaBoxOpen, FaEye } from "react-icons/fa";

export default function UserProducts() {
  // إضافة الحالة الافتراضية Pending للمنتجات القادمة
  const [products, setProducts] = useState(
    productsData.map((p) => ({ ...p, status: p.status || "pending" }))
  );

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleApprove = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, status: "approved" } : p));
  };

  const handleReject = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, status: "rejected" } : p));
  };

  const handleViewDetails = (id) => {
    const productDetails = products.find(item => item.id === id);
    setSelectedProduct(productDetails);
    setShowDetailsModal(true);
  };

  const renderStatus = (status) => {
    switch(status) {
      case "approved": return <span className="text-green-600 font-semibold">Approved</span>;
      case "rejected": return <span className="text-red-600 font-semibold">Rejected</span>;
      default: return <span className="text-yellow-500 font-semibold">Pending</span>;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-teal-600">User Products Management</h1>

      <table className="min-w-full bg-white border rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">Publisher</th>
            <th className="px-4 py-3 text-left">Location</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 flex items-center gap-2"><FaBoxOpen /> {p.name}</td>
              <td className="px-4 py-3">{p.publisher}</td>
              <td className="px-4 py-3">{p.location}</td>
              <td className="px-4 py-3">{p.price}</td>
              <td className="px-4 py-3">{renderStatus(p.status)}</td>
              <td className="px-4 py-3 flex justify-center gap-4">
                <button 
                  onClick={() => handleViewDetails(p.id)} 
                  className="text-blue-600 hover:text-blue-800">
                  <FaEye />
                </button>
                <button onClick={() => handleApprove(p.id)} className="text-green-600 hover:text-green-800"><FaCheckCircle /></button>
                <button onClick={() => handleReject(p.id)} className="text-red-600 hover:text-red-800"><FaTimesCircle /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* === Product Details Modal === */}
      {showDetailsModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md animate-fadeIn">
            <h2 className="text-xl font-bold mb-4">{selectedProduct.name}</h2>
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name} 
              className="w-full h-56 object-cover rounded mb-4" 
            />
            <p className="mb-2"><strong>Price:</strong> {selectedProduct.price}</p>
            <p className="mb-2"><strong>Location:</strong> {selectedProduct.location}</p>
            <p className="mb-4"><strong>Publisher:</strong> {selectedProduct.publisher}</p>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowDetailsModal(false)} 
                className="px-4 py-2 border rounded hover:bg-gray-100">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
