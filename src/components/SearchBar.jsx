import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ data = [], onResultClick, onQueryChange }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("product");
  const [results, setResults] = useState([]);
  const searchBoxRef = useRef();

  // تحديث النتائج مباشرة عند الكتابة
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      onQueryChange?.(""); // نرسل إشارة أنه ما في بحث
      return;
    }
    let filtered = [];
    if (type === "product") {
      filtered = data.filter((item) =>
        (item.title || item.name)?.toLowerCase().includes(query.toLowerCase())
      );
    } else if (type === "category") {
      filtered = data.filter((item) =>
        (item.category || "").toLowerCase().includes(query.toLowerCase())
      );
    } else if (type === "region") {
      filtered = data.filter((item) =>
        (item.location || "").toLowerCase().includes(query.toLowerCase())
      );
    }
    setResults(filtered);
    onQueryChange?.(query, type); // نرسل قيمة البحث ونوعه
  }, [query, type, data]);

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (results.length > 0 && onResultClick) {
      onResultClick(results[0]);
      setResults([]);
      setQuery("");
    }
  };

  return (
    <div className="relative flex-shrink-0" ref={searchBoxRef}>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 relative">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-gray-50 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
        >
          <option value="product">Product</option>
          <option value="category">Category</option>
          <option value="region">Region</option>
        </select>
        <div className="relative w-64">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search by ${type}...`}
            className="w-full bg-gray-50 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
          {results.length > 0 && (
            <div className="absolute left-0 top-12 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
              {results.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onResultClick?.(item);
                    setResults([]);
                    setQuery("");
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-blue-50 cursor-pointer"
                >
                  {type === "product"
                    ? item.title || item.name
                    : type === "category"
                    ? item.category
                    : item.location}
                </button>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
