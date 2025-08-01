import React, { useState } from "react";
import { FaUserCircle, FaWallet, FaBell, FaSignOutAlt, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown({ role = "user", email = "", onLogout }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const walletBalance = role === "user" ? 270 : 1800;

  const notifications =
    role === "user"
      ? [
          { id: 1, msg: "Your order #1021 has been shipped." },
          { id: 2, msg: "Your product 'Nike Shoes' has been sold!" },
        ]
      : [
          { id: 1, msg: "New store review received." },
          { id: 2, msg: "Subscription payment confirmed." },
        ];

  const handleProfileClick = () => {
    if (role === "user") {
      navigate("/user");
    } else {
      navigate("/store1");
    }
  };

  const handleWalletClick = () => {
     if (role === "user") {
    navigate("/UserWallet");
     } else {
      navigate("/wallet");
    }
  };

  const handleNotificationsClick = () => {
    navigate("/notifications"); // صفحة الإشعارات والرسائل
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1 bg-white text-gray-700 border rounded-full hover:shadow transition"
      >
        <FaUserCircle className="text-xl" />
        <div className="flex flex-col items-start leading-tight">
          <span className="font-semibold text-sm capitalize">{role}</span>
          <span className="text-xs text-gray-500">{email}</span>
        </div>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-lg z-50 overflow-hidden"
          onMouseLeave={() => setOpen(false)}
        >
          {/* Wallet */}
          <div
            onClick={handleWalletClick}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
          >
            <FaWallet className="text-blue-600" />
            <span className="flex-1 font-medium">Wallet</span>
    
          </div>

          {/* Profile */}
          <div
            onClick={handleProfileClick}
            className="flex items-center gap-2 px-4 py-2 font-medium hover:bg-gray-100 cursor-pointer"
          >
            <FaUserCircle className="text-yellow-500" /> Profile
          </div>

          {/* Notifications & Messages */}
          <div
            onClick={handleNotificationsClick}
            className="flex items-center gap-2 px-4 py-2 font-medium hover:bg-gray-100 cursor-pointer"
          >
            <FaBell className="text-teal-500" /> Notifications & Messages
          </div>

          {/* Show preview notifications */}
          <div className="border-t">
            {notifications.length === 0 ? (
              <div className="px-4 py-2 text-gray-400">No notifications</div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className="px-4 py-2 text-sm hover:bg-gray-50 transition"
                >
                  {n.msg}
                </div>
              ))
            )}
          </div>

          {/* Logout */}
          <button
            className="flex w-full items-center gap-2 px-4 py-3 text-red-600 font-semibold border-t hover:bg-red-50"
            onClick={onLogout}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
