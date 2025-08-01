// src/pages/AuthEntry.jsx
import React, { useState } from "react";
import PublicNavbar from "../../components/PublicNavbar";
import AuthModal from "../../components/AuthModal";
import HeroCarousel from "../../components/HeroCarousel";
import CategoriesSection from "../../components/CategoriesSection";
import StoreSection from "../../components/StoreSection";
import ProductsSection from "../../components/ProductsSection";
import AboutSection from "../../components/AboutSection"; // استيراد قسم About

export default function AuthEntry() {
  const [showModal, setShowModal] = useState(false);

  // بيانات الشرائح
  const slidesData = [
    {
      image: "/src/assets/banner_image.png",
      title: "Defective Chairs at Discounted Prices",
      subtitle:
        "Shop now for quality pre-owned, slightly damaged chairs with a guarantee.",
      ctaText: "Shop Chairs",
      ctaLink: "/shop/chairs",
    },
    {
      image: "/src/assets/categories_2.png",
      title: "Well-Maintained Second-Hand Tables",
      subtitle: "Bring new life to old tables at competitive prices.",
      ctaText: "Explore Tables",
      ctaLink: "/shop/tables",
    },
    {
      image: "/src/assets/ChatGPT Image Jun 6, 2025, 07_32_06 PM.png",
      title: "Broken Lamps in Need of Repair",
      subtitle: "Get high-quality lamps after repair, at great savings.",
      ctaText: "View Lamps",
      ctaLink: "/shop/lamps",
    },
   {
  image: "/src/assets/7cb74d4b-b414-47eb-b67c-5584e45f53b3.png",
  title: "Give Things a New Worth",
  subtitle: "Discover the value in pre-loved items. Reuse, Refresh, Reworth.",
  ctaText: "Start Exploring",
  ctaLink: "/store"
},
  ];

  // بيانات التصنيفات
  const categoriesData = [
    {
      name: "Clothing",
      logo: "/src/assets/clothing.png",
      link: "/shop/clothing",
    },
    {
      name: "Cars",
      logo: "/src/assets/car.jpg",
      link: "/shop/food",
    },
    {
      name: "Furniture",
      logo: "/src/assets/funiture.png",
      link: "/shop/furniture",
    },
    {
      name: "Electronics",
      logo: "/src/assets/electronics.png",
      link: "/shop/electronics",
    },
  ];

  // بيانات المتاجر
const storesData = [
  {
    name: "Downtown Branch",
    link: "/stores/downtown",
    logo: "https://via.placeholder.com/80?text=Downtown"
  },
  {
    name: "Mall Outlet",
    link: "/stores/mall",
    logo: "https://i.pinimg.com/1200x/00/82/e0/0082e01b0d3bbb77a3daa353a4ea5fc9.jpg"
  },
  {
    name: "Airport Kiosk",
    link: "/stores/airport",
    logo: "https://via.placeholder.com/80?text=Airport"
  },
  {
    name: "Beachside Shop",
    link: "/stores/beach",
    logo: "https://via.placeholder.com/80?text=Beach"
  }
];


  // بيانات أحدث المنتجات
  const productsData = [
    {
      name: "Wooden Armchair",
      image: "/src/assets/Wooden Armchair.png",
      description: "Comfortable wooden armchair with soft cushion.",
      price: 129.99,
      link: "/product/wooden-armchair",
    },
    {
      name: "Modern Table Lamp",
      image: "/src/assets/Modern Table Lamp.png",
      description: "Sleek LED table lamp with adjustable brightness.",
      price: 59.5,
      link: "/product/modern-table-lamp",
    },
    {
      name: "Cozy Sofa",
      image: "/src/assets/Cozy Sofa.png",
      description: "Spacious three-seater sofa upholstered in gray fabric.",
      price: 499.0,
      link: "/product/cozy-sofa",
    },
    {
      name: "Glass Coffee Table",
      image: "/src/assets/Glass Coffee Table.png",
      description: "Tempered glass coffee table with metal legs.",
      price: 199.99,
      link: "/product/glass-coffee-table",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* النافبار */}
      <PublicNavbar onLoginClick={() => setShowModal(true)} />

      {/* الهيرو سيكشن */}
      <HeroCarousel slides={slidesData} />

      {/* قسم التصنيفات الاحترافي */}
      <CategoriesSection categories={categoriesData} />

      {/* قسم المتاجر الاحترافي */}
      <StoreSection stores={storesData} />

      {/* قسم أحدث المنتجات */}
      <ProductsSection products={productsData} />

      {/* قسم نبذة عنا */}
      <AboutSection />

      {/* المودال */}
      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
