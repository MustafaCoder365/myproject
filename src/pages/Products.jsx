// src/pages/Products.jsx
import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaUser, FaMapMarkerAlt, FaStar, FaTimes, FaCheckCircle } from "react-icons/fa";
import Navbar from "../components/PublicNavbar";
import AboutSection from "../components/AboutSection";
import { useLocation } from "react-router-dom";
import { storeProducts } from "../data/storeProducts"; 

// ==== بيانات أولية مع التصنيف ====
const rawProducts = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    price: 75,
    location: "Damascus",
    seller: "Nina Zimmer",
    image: "https://i.pinimg.com/736x/bf/39/d4/bf39d41a46c0297570f83350c2066f70.jpg",
    rating: 5,
    category: "Electronics",
  },
  {
    id: 2,
    title: "Apple MacBook Pro 2022",
    price: 1190,
    location: "Damascus",
    seller: "Leon Weber",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    rating: 3,
    category: "Electronics",
  },
  {
    id: 3,
    title: "Retro Leather Backpack",
    price: 49,
    location: "Damascus",
    seller: "Fatima Khaled",
    image: "https://i.pinimg.com/736x/c3/74/67/c37467fc0d96c91a1a3b3a91e1e73101.jpg",
    rating: 4,
    category: "Clothing",
  },
  {
    id: 4,
    title: "Modern Minimalist Stool",
    price: 39,
    location: "Damascus",
    seller: "Ikia Store",
    image: "https://i.pinimg.com/736x/34/14/f6/3414f6eab97d37b016c09975139e648f.jpg",
    rating: 5,
    category: "Furniture",
  },
  {
    id: 5,
    name: "Tech World",
    brand: "Lenovo",
    category: "Electronics",
    products: [
      { id: 101, name: "Lenovo Laptop", price: 500, image: "https://i.pinimg.com/1200x/1c/fc/ce/1cfcce1869002a58e38bd361ea34b3e4.jpg" },
      { id: 102, name: "Lenovo Mouse", price: 30, image: "https://i.pinimg.com/736x/09/ab/1d/09ab1db3e8929dcc100a69914beeb81a.jpg" },
    ],
  },
  {
    id: 6,
    name: "Fashion Hub",
    brand: "Adidas",
    category: "Clothing",
    products: [
      { id: 201, name: "Adidas T-Shirt", price: 30, image: "https://i.pinimg.com/736x/79/21/47/79214734d94f49559aa186cf097ca11b.jpg" },
      { id: 202, name: "Adidas Shoes", price: 80, image: "https://i.pinimg.com/736x/71/67/32/7167326b9c910663a45eb0844747542c.jpg" },
    ],
  },
  {
    id: 7,
    name: "Home Comfort",
    brand: "IKEA",
    category: "Furniture",
    products: [
      { id: 301, name: "Dining Table", price: 150, image: "https://via.placeholder.com/150" },
      { id: 302, name: "Sofa", price: 250, image: "https://via.placeholder.com/150" },
    ],
  },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// ==== نجوم التقييم ====
function StarRating({ value, onRate }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          className="focus:outline-none"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onRate(i)}
        >
          <FaStar size={20} className={`${i <= (hovered || value) ? "text-yellow-400" : "text-gray-300"}`} />
        </button>
      ))}
      <span className="ml-1 text-xs font-bold text-gray-600">{value}</span>
    </div>
  );
}

// ==== كارد المنتج ====
function ProductCard({ prod, onAddToCart, onRate, justAdded }) {
  return (
    <div className={`relative bg-white border rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col overflow-hidden ${justAdded ? "ring-4 ring-green-300 animate-pulse" : ""}`}>
      {justAdded && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2">
          <FaCheckCircle /> Added!
        </div>
      )}
      <div className="relative w-full h-56 overflow-hidden">
        <img src={prod.image} alt={prod.title} className="w-full h-full object-cover transition-all duration-300 hover:scale-105" />
        <button
          className="absolute bottom-3 right-3 bg-gradient-to-br from-teal-500 to-green-400 text-white shadow-2xl p-3 rounded-full border-4 border-white hover:scale-110"
          onClick={onAddToCart}
          title="Add to cart"
        >
          <FaShoppingCart size={20} />
        </button>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-2">
        <h3 className="text-base font-bold text-gray-900">{prod.title}</h3>
        <span className="text-green-700 font-bold text-lg">${prod.price}</span>
        <div className="flex items-center gap-2 text-sm text-purple-600 font-medium">
          <FaMapMarkerAlt className="text-lg" /> {prod.location || "Store Product"}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaUser className="text-lg" /> {prod.seller || "Store"}
        </div>
        <StarRating value={prod.rating || 5} onRate={onRate} />
      </div>
    </div>
  );
}

// ==== الصفحة ====
export default function Products() {
  const query = useQuery();
  const categoryFilter = query.get("category") || "";
  const searchQuery = query.get("search") || "";

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [lastAddedId, setLastAddedId] = useState(null);

  // تجهيز المنتجات
  useEffect(() => {
    const normalizedRaw = rawProducts.flatMap((item) => {
      if (item.products) {
        return item.products.map((p) => ({
          id: p.id,
          title: p.name,
          price: Number(p.price),
          image: p.image,
          location: item.name,
          seller: item.brand,
          category: item.category,
          rating: 5,
        }));
      }
      return {
        ...item,
        title: item.title || item.name || "Unnamed",
        category: item.category || "General",
      };
    });

    const normalizedStore = storeProducts.map((p) => ({
      id: p.id + 1000, // لتجنب التعارض
      title: p.name,
      price: Number(p.price),
      image: "https://via.placeholder.com/150", // صورة افتراضية
      location: "Default Store",
      seller: "Default Seller",
      category: "Electronics",
      rating: 5,
    }));

    setProducts([...normalizedRaw, ...normalizedStore]);
  }, []);

  // فلترة المنتجات
  const displayedProducts = products.filter((p) => {
    const matchesCategory = categoryFilter ? (p.category || "").toLowerCase() === categoryFilter.toLowerCase() : true;
    const matchesSearch = searchQuery
      ? (p.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.location || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.category || "").toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (prod) => {
    const existingCart = JSON.parse(localStorage.getItem("current_cart") || "[]");
    const existingIndex = existingCart.findIndex((item) => item.id === prod.id);

    if (existingIndex > -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push({ id: prod.id, name: prod.title, price: prod.price, quantity: 1 });
    }

    localStorage.setItem("current_cart", JSON.stringify(existingCart));
    setCart(existingCart);
    setLastAddedId(prod.id);
    setTimeout(() => setLastAddedId(null), 1200);
    setShowCart(true);
  };

  const handleRate = (id, stars) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, rating: stars } : p)));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((p) => p.id !== id);
    localStorage.setItem("current_cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-10">
      <Navbar cartCount={cart.length} onCartClick={() => setShowCart(true)} />
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 my-10 text-center tracking-tight">
        Available Products
      </h2>

      <div className="container mx-auto px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {displayedProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              prod={prod}
              onAddToCart={() => handleAddToCart(prod)}
              onRate={(stars) => handleRate(prod.id, stars)}
              justAdded={lastAddedId === prod.id}
            />
          ))}
        </div>
      </div>

      {showCart && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative">
            <button className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-600 font-bold" onClick={() => setShowCart(false)}>
              <FaTimes />
            </button>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FaShoppingCart /> Cart
            </h3>
            {cart.length === 0 ? (
              <div className="text-gray-500 text-center py-10">No items in cart.</div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-2">
                    <div>{item.name}</div>
                    <div className="font-bold">${item.price} x {item.quantity}</div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-800 font-bold text-xl px-2">
                      <FaTimes />
                    </button>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 font-bold text-lg">
                  <span>Total:</span>
                  <span>${cart.reduce((sum, i) => sum + i.price * i.quantity, 0)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-16">
        <AboutSection />
      </div>
    </div>
  );
}
