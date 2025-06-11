// src/components/CategoriesSection.jsx
import React from "react";

export default function CategoriesSection({ categories }) {
  return (
    <section id="categories" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Our Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <a
              key={idx}
              href={cat.link || "#"}
              className="group flex flex-col items-center bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition ease-in-out duration-300 p-6"
            >
              <div className="w-24 h-24 mb-4 flex items-center justify-center">
                <img
                  src={cat.logo}
                  alt={`${cat.name} logo`}
                  className="
                    w-full h-full object-contain
                    transform transition-transform duration-300 ease-in-out
                    [transform-style:preserve-3d]
                    hover:[transform:perspective(600px)_rotateX(15deg)]
                  "
                />
              </div>
              <span className="mt-2 text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-200">
                {cat.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
