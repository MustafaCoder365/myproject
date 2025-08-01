import React from "react";
import { Link } from "react-router-dom";

export default function Logo({ size = 38, className = "" }) {
  return (
    <Link to="/" className={`flex items-center gap-2 w-fit ${className}`}>
      {/* شعار نصي بسيط وناعم */}
      <span
        style={{
          fontFamily: "Montserrat, Arial, sans-serif",
          fontWeight: "bold",
          fontSize: size,
          color: "#00b894",
          letterSpacing: "0.5px",
        }}
      >
        Re
      </span>
      <span
        style={{
          fontFamily: "Montserrat, Arial, sans-serif",
          fontWeight: "bold",
          fontSize: size,
          color: "#333",
          marginLeft: "2px",
        }}
      >
        worth
      </span>
    </Link>
  );
}
