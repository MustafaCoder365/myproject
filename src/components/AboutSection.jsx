// src/components/AboutSection.jsx
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock,
} from "react-icons/fa";
import Logo from "./Logo"; // استيراد اللوغو
import { TbH1 } from "react-icons/tb";

export default function AboutSection() {
  const categories = ["Electronics", "Furniture", "Clothing", "Food"];
  const support = [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Help & Support", href: "/help" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <footer id="about" className="bg-gray-50 text-gray-700">
      {/* Top grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand & Social */}
        <div className="space-y-4">
          {/* شعار الموقع بدل النص */}
          <Logo size={38} className="mb-2" />
          <p className="text-gray-600 leading-relaxed">
            We give your pre-loved and imperfect items a second life. All items
            are carefully refurbished and made available for purchase on our
            platform.
          </p>
          <div className="flex space-x-3">
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="w-9 h-9 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white rounded-full transition"
            >
              <FaFacebookF size={18} />
            </a>
            {/* Twitter */}
            <a
              href="#"
              aria-label="Twitter"
              className="w-9 h-9 flex items-center justify-center text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white rounded-full transition"
            >
              <FaTwitter size={18} />
            </a>
            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 flex items-center justify-center text-[#E1306C] hover:bg-gradient-to-tr from-[#FEDA75] via-[#DD2A7B] to-[#8134AF] hover:text-white rounded-full transition"
            >
              <FaInstagram size={18} />
            </a>
            {/* YouTube */}
            <a
              href="#"
              aria-label="YouTube"
              className="w-9 h-9 flex items-center justify-center text-[#FF0000] hover:bg-[#FF0000] hover:text-white rounded-full transition"
            >
              <FaYoutube size={18} />
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-xl font-semibold text-gray-900 mb-4">
            Categories
          </h4>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat}>
                <a
                  href={`/category/${cat.toLowerCase()}`}
                  className="hover:text-gray-900 transition"
                >
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-xl font-semibold text-gray-900 mb-4">Support</h4>
          <ul className="space-y-3">
            {support.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-gray-900 transition">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="text-xl font-semibold text-gray-900 mb-4">
            Contact Us
          </h4>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-teal-600" />
              Syria , Damascuse
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2 text-teal-600" />
              support@reworth.com
            </li>
            <li className="flex items-center">
              <FaPhone className="mr-2 text-teal-600" />
              +963 933- 567 -890  - 011 8844
            </li>
            <li className="flex items-center">
              <FaClock className="mr-2 text-teal-600" />
              24/7 – from: 12:00 AM – to: 12:00 PM
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mt-8" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© 2025 Reworth. All rights reserved.</p>
        <p>
          Designed &amp; Developed by{" "}
          <a
            href="https://www.facebook.com/mustafa.aldulaimi.712?mibextid=wwXIfr&mibextid=wwXIfr"
            className="text-teal-600 hover:underline"
          >
            Mustafa Shakir
          </a>
        </p>
      </div>
    </footer>
  );
}
