// src/components/HeroCarousel.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function HeroCarousel({ slides }) {
  // slides: مصفوفة من الكائنات { image: "URL أو مسار محلي", title: "عنوان", subtitle: "نص فرعي", ctaText: "زر فعل"، ctaLink: "/link" }
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const timeoutRef = useRef(null);

  // قمّ بإعداد تغيير تلقائي للصور كل 5 ثوانٍ (اختياري)
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrent((prevIndex) => (prevIndex === length - 1 ? 0 : prevIndex + 1)),
      5000
    );
    return () => {
      resetTimeout();
    };
  }, [current, length]);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  if (!Array.isArray(slides) || length === 0) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* الشرائط (slides) */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative w-full flex-shrink-0"
            style={{ height: "60vh" }} // يمكن تعديل الارتفاع حسب الرغبة
          >
            <img
              src={slide.image}
              alt={`slide-${index}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay للنصوص */}
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-start px-6 md:px-16 lg:px-24">
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {slide.title}
              </h2>
              <p className="text-white text-base md:text-lg lg:text-xl mb-6 max-w-xl">
                {slide.subtitle}
              </p>
              {slide.ctaText && (
                <a
                  href={slide.ctaLink}
                  className="inline-block bg-primary text-white px-6 py-3 rounded-md text-sm md:text-base font-semibold hover:bg-primary/90 transition"
                >
                  {slide.ctaText}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* سهم السابق */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        <FaChevronLeft size={20} />
      </button>
      {/* سهم التالي */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        <FaChevronRight size={20} />
      </button>

      {/* النقاط (Indicators) أسفل الكاروسيل */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === current ? "bg-primary" : "bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
