// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import StoresPage from "./pages/StoresPage";
import StoreProductsPage from "./pages/StoreProductsPage";

import AuthEntry from "./pages/AuthEntry";
import AdminAuthLayout from "./layouts/AdminAuthLayout";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminLogin from "./pages/admin/Login/index.jsx";
import Dashboard from "./pages/admin/Dashboard";
import StoreHome from "./pages/store";
import UserHome from "./pages/user";
import Products from "./pages/Products";
import StoreProfilePage  from "./pages/StoreProfilePage";
import WalletPage from "./pages/WalletPage";
import UserWallet from "./pages/UserWallet.jsx";
import StoreDashboard from "./pages/StoreDash/StoreDashboard";
import StoreCategories from "./pages/StoreDash/StoreCategories";
import StoreProducts from "./pages/StoreDash/StoreProducts";
import StoreOrders from "./pages/StoreDash/StoreOrders";
import StoreReports from "./pages/StoreDash/StoreReports";
import StoreSettings from "./pages/StoreDash/StoreSettings";
import StoreSupport from "./pages/StoreDash/StoreSupport";
import StoreDetailsPage from "./pages/admin/Dashboard/StoreDetailsPage.jsx";


import NotificationsPage from "./pages/NotificationsPage";
import CartPage from "./pages/CartPage";
export default function App() {
  return (
    <Router>
      <Routes>
        {/* 0. صفحة التسجيل/الدخول العامّة (User/Store) */}
        <Route path="/auth-entry" element={<AuthEntry />} />

        {/* 1. صفحة تسجيل دخول الأدمن */}
        <Route element={<AdminAuthLayout />}>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        {/* 2. لوحة تحكُّم الأدمن (محميّ) بدون نافبار */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>

        {/* 3. قسم المتجر (محميّ ودور store فقط) مع نافبار */}
        <Route element={<ProtectedRoute allowedRole="store" />}>
          <Route path="/store" element={<MainLayout />}>
            <Route index element={<StoreHome />} />
          </Route>
        </Route>

        {/* 4. قسم المستخدم العادي (محميّ ودور user فقط) مع نافبار */}
        <Route element={<ProtectedRoute allowedRole="user" />}>
          <Route path="/user" element={<MainLayout />}>
            <Route index element={<UserHome />} />
          </Route>
        </Route>

        {/* ✅ صفحة المنتجات المستقلة متاحة للجميع */}
        <Route path="/products" element={<Products />} />

        {/* 5. التحويل الافتراضي إلى /auth-entry */}
        <Route path="/" element={<Navigate to="/auth-entry" replace />} />
        <Route path="*" element={<Navigate to="/auth-entry" replace />} />

        <Route path="/stores" element={<StoresPage />} />
        <Route path="/stores/:id" element={<StoreProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/store1" element={<StoreProfilePage />} />
        <Route path="/wallet" element={<WalletPage />} /> 
        <Route path="/UserWallet" element={<UserWallet />} /> 

<Route path="/notifications" element={<NotificationsPage />} />
         <Route path="/store-dashboard" element={<StoreDashboard />} />
        <Route path="/store-dashboard/categories" element={<StoreCategories />} />
         <Route path="/store-dashboard/products" element={<StoreProducts />} />
        <Route path="/store-dashboard/orders" element={<StoreOrders />} />
        <Route path="/store-dashboard/reports" element={<StoreReports />} />
        <Route path="/store-dashboard/settings" element={<StoreSettings />} />
        <Route path="/store-dashboard/support" element={<StoreSupport />} />
        <Route path="/store/:id" element={<StoreDetailsPage />} />
      </Routes>

    </Router>
  );
}
