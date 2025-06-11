// src/layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";

export default function MainLayout() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* استدعاء PublicNavbar مرة واحدة فقط */}
      <PublicNavbar onLoginClick={handleLogout} />

      {/* محتوى الصفحات يظهر هنا */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
