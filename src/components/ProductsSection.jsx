// src/components/ProductsSection.jsx
import React from "react";

export default function ProductsSection({ products }) {
  // تأكد أن “products” مصفوفة قبل استدعاء .map()
  const list = Array.isArray(products) ? products : [];

  return (
    <section id="products" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* عنوان القسم */}
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Latest Products
        </h2>

        {/* شبكة عرض المنتجات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {list.map((product, idx) => (
            <div
              key={idx}
              className="
                group 
                flex flex-col bg-white rounded-lg 
                shadow-md hover:shadow-xl 
                transform hover:-translate-y-1 
                transition ease-in-out duration-300 
                overflow-hidden
              "
            >
              {/* صورة المنتج مع تأثير ميل 3D */}
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="
                    w-full h-full object-cover 
                    transform transition-transform duration-300 ease-in-out
                    [transform-style:preserve-3d]
                    hover:[transform:perspective(600px)_rotateX(15deg)_scale(1.05)]
                  "
                />
              </div>

              {/* تفاصيل المنتج */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 flex-grow">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <a
                    href={product.link || "#"}
                    className="
                      bg-primary text-white px-4 py-2 
                      rounded-md text-sm font-medium 
                      hover:bg-primary/90 
                      transition-colors duration-200
                    "
                  >
                    View
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* رسالة إذا لم توجد منتجات */}
          {list.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No products available at the moment.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
