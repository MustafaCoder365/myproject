import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaShoppingCart } from "react-icons/fa";
import ProfileDropdown from "./ProfileDropdown";
import SearchBar from "./SearchBar";
import Logo from "./Logo";

export default function PublicNavbar({ onLoginClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email") || "No Email";

  // === العدد الحقيقي لعناصر السلة ===
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    // أول تحميل → قراءة السلة من localStorage
    const storedCart = JSON.parse(localStorage.getItem("current_cart") || "[]");
    setCartItems(storedCart.reduce((total, item) => total + (item.quantity || 1), 0));

    // تحديث العدد لما يتغير localStorage (من صفحات ثانية)
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("current_cart") || "[]");
      setCartItems(updatedCart.reduce((total, item) => total + (item.quantity || 1), 0));
    };
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > lastScrollY.current) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = window.pageYOffset;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full bg-white shadow-sm z-50 transform transition-transform duration-200 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="w-28 flex items-center">
            <Logo size={25} />
          </div>

          <div className="hidden md:flex items-center space-x-8 flex-grow ml-4">
            {role === "store" ? (
              <>
                <Link to="/store-dashboard" className="text-gray800 hover:text-teal-600 font-semibold text-lg transition duration-200">
                  Dashboard
                </Link>
                <Link to="/wallet" className="text-gray800 hover:text-teal-600 font-semibold text-lg transition duration-200">
                  Profit
                </Link>
                <Link to="/store-dashboard/orders" className="text-gray800 hover:text-teal-600 font-semibold text-lg transition duration-200">
                  Orders
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray800 hover:text-teal-600 font-semibold text-lg transition duration-200">
                  Home
                </Link>
                <Link to="/stores" className="text-gray800 hover:text-teal-600 font-semibold text-lg transition duration-200">
                  Store
                </Link>
                <Link to="/products" className="text-gray800 hover:text-teal-600 font-semibold text-lg transition duration-200">
                  Products
                </Link>
                <div className="relative group">
                  <button className="flex items-center text-gray800 hover:text-teal-600 font-semibold text-lg transition duration-200">
                    Categories
                    <FaChevronDown className="ml-1" />
                  </button>
                  <div className="absolute left-0 mt-2 w-40 bg-card border border-gray200 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                    <Link to="/products?category=clothing" className="block px-4 py-2 cursor-pointer text-gray800 hover:bg-teal-100 transition">
                      Clothing
                    </Link>
                    <Link to="/products?category=furniture" className="block px-4 py-2 cursor-pointer text-gray800 hover:bg-teal-100 transition">
                      Furniture
                    </Link>
                    <Link to="/products?category=electronics" className="block px-4 py-2 cursor-pointer text-gray800 hover:bg-teal-100 transition">
                      Electronics
                    </Link>
                  </div>
                </div>
                <Link to="/about" className="text-gray800 hover:text-teal-600 font-semibold text-lg transition duration-200">
                  About
                </Link>
              </>
            )}
          </div>

          {/* Search + Cart for user */}
          {role === "user" && isLoggedIn && (
            <div className="hidden md:flex items-center gap-6 mr-4">
              <SearchBar
                data={[
                  { id: 1, name: "iPhone 14", category: "Electronics", region: "Baghdad" },
                  { id: 2, name: "Leather Sofa", category: "Furniture", region: "Berlin" },
                  { id: 3, name: "Nike Shoes", category: "Shoes", region: "Mosul" },
                ]}
                onResultClick={(item) => navigate(`/products?search=${item.name}`)}
              />

              {/* Cart Icon */}
              <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
                <FaShoppingCart size={24} className="text-gray-700 hover:text-teal-600 transition" />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">
                    {cartItems}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="hidden md:block relative">
            {!isLoggedIn ? (
              <button
                onClick={() => onLoginClick?.()}
                className="px-6 py-2 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-500 transition duration-200 shadow"
              >
                Login
              </button>
            ) : (
              <ProfileDropdown role={role} email={email} onLogout={handleLogout} />
            )}
          </div>

          <button
            className="md:hidden text-gray800 focus:outline-none ml-2"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      <div className="h-16 md:h-20 bg-white" />
    </>
  );
}
