// src/components/StoreCard.jsx

import React from "react";

const StoreCard = ({ store, onClick }) => {
  return (
    <div
      onClick={() => onClick(store)}
      className="border rounded-lg p-4 shadow-sm hover:shadow-xl hover:scale-105 hover:border-teal-500 transition-all duration-300 cursor-pointer"
    >
      <h3 className="text-xl font-bold mb-2"> {store.name}</h3>
      <p> Brand : {store.brand}</p>
      <p> category : {store.category}</p>
    </div>
  );
};

export default StoreCard;
