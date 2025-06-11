// src/components/StoreSection.jsx
import React from "react";

export default function StoreSection({ stores }) {
  // Ensure “stores” is an array before mapping
  const list = Array.isArray(stores) ? stores : [];

  return (
    <section id="stores" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Our Stores
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {list.map((store, idx) => (
            <a
              key={idx}
              href={store.link || "#"}
              className="
                flex items-center justify-center
                bg-gray-50 rounded-lg
                p-6
                hover:bg-gray-100
                transform hover:scale-105
                transition ease-in-out duration-300
              "
            >
              <span className="text-lg font-medium text-gray-800">
                {store.name}
              </span>
            </a>
          ))}

          {list.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No stores available at the moment.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
