import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaShoppingCart, FaCheckCircle } from "react-icons/fa";

import PublicNavbar from "../components/PublicNavbar";

// ======== تصميم الكارد مثل الصفحة الرئيسية ========
function ProductCard({ product, onAddToCart, justAdded }) {
  return (
   
    <div
     
      className={`relative bg-white border rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 
                  transition-all flex flex-col overflow-hidden min-w-[320px] group
                  ${justAdded ? "ring-4 ring-green-300 animate-pulse" : ""}`}
    >
      
      {/* Toast عند إضافة المنتج */}
      {justAdded && (
        <div className="absolute top-2 right-2 z-50 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2 animate-fade-in">
          <FaCheckCircle className="text-white" /> Added!
        </div>
      )}

      {/* صورة المنتج وزر السلة */}
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
        />
        <button
          className="absolute bottom-3 right-3 bg-gradient-to-br from-teal-500 to-green-400 text-white shadow-2xl p-3 
                     rounded-full border-4 border-white hover:scale-110 transition-all"
          onClick={() => onAddToCart(product)}
          title="Add to cart"
        >
          <FaShoppingCart size={20} />
        </button>
      </div>

      {/* تفاصيل المنتج */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-gray-900">{product.name}</h3>
          <span className="text-green-700 font-bold text-lg">
            {parseFloat(product.price.toString().replace(/[^0-9.]/g, ""))} $
          </span>
        </div>
      </div>
    </div>
  );
}

// ======== الصفحة الرئيسية للمنتجات الخاصة بالمتجر ========
export default function StoreProductsPage() {
  const { state } = useLocation();
  const { store } = state;

  const [cart, setCart] = useState([]);
  const [lastAddedId, setLastAddedId] = useState(null);

  // ===== منطق إضافة المنتج إلى السلة =====
  const handleAddToCart = (product) => {
    let existingCart = JSON.parse(localStorage.getItem("current_cart") || "[]");

    const existingProductIndex = existingCart.findIndex((item) => item.id === product.id);
    const price = parseFloat(product.price.toString().replace(/[^0-9.]/g, "")) || 0;

    if (existingProductIndex > -1) {
      existingCart[existingProductIndex].quantity += 1;
    } else {
      existingCart.push({
        id: product.id,
        name: product.name,
        price: price,
        quantity: 1,
      });
    }

    localStorage.setItem("current_cart", JSON.stringify(existingCart));
    setCart(existingCart);

    // تأثير الـ Toast
    setLastAddedId(product.id);
    setTimeout(() => setLastAddedId(null), 1200);
  };

  return (
    <div>
      <PublicNavbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#00b894]">
          {store.name} Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {store.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              justAdded={lastAddedId === product.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
