// src/components/AboutSection.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function AboutSection() {
  const categories = ["Sofa", "Armchair", "Wing Chair", "Desk Chair", "Wooden Chair", "Park Bench"];
  const support = ["Help & Support", "Terms & Conditions", "Privacy Policy", "Help"];

  return (
    <footer id="about" className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About / Logo */}
        <div className="space-y-4">
          <h3 className="flex items-center text-2xl font-bold text-gray-900">
            <span className="text-teal-600 mr-2">♻️</span>
            TrashToCash
          </h3>
          <p className="text-gray-600">
            Turning your waste into value — we recycle, refurbish and repurpose unwanted items to give them a second life.
          </p>
          <div className="flex space-x-4 text-gray-600">
            <a href="#" className="hover:text-gray-800"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-gray-800"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-gray-800"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-gray-800"><FaYoutube size={20} /></a>
          </div>
        </div>

        {/* Category List */}
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-gray-900">Category</h4>
          <ul className="space-y-2 text-gray-600">
            {categories.map((cat) => (
              <li key={cat} className="hover:text-gray-800 cursor-pointer">
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Support List */}
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-gray-900">Support</h4>
          <ul className="space-y-2 text-gray-600">
            {support.map((s) => (
              <li key={s} className="hover:text-gray-800 cursor-pointer">
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-gray-900">Newsletter</h4>
          <p className="text-gray-600">Get updates on new products and offers.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-r-md hover:bg-teal-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      {/* Divider */}
      <div className="border-t border-gray-300 mt-8"></div>
    </footer>
  );
}
