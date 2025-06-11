// tailwind.config.cjs
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary Accent (أزرق عصري)
        primary: "#3B82F6",

        // Secondary Accent (برتقالي لافت)
        secondary: "#F97316",

        // Neutral / Background Palette
        background: "#F9FAFB",
        card: "#FFFFFF",

        // نُمدّد فقط قيمتين من درج الرمادي للتخصيص،
        // أما بقية تدرّج gray-50 و gray-100 ... gray-900 
        // فهي تبقى كما في إعدادات Tailwind الافتراضية.
        "gray-800": "#1F2937",
        "gray-500": "#6B7280",
        "gray-200": "#E5E7EB",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",       // shadow-sm مخصّص
        cardHover: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", // shadow-md مخصّص
      },
      borderRadius: {
        pill: "9999px",    // rounded-full مخصّص
        lg: "0.5rem",      // rounded-lg مخصّص
      },
      spacing: {
        navbarHeight: "4rem",  // 64px (يمكن استخدامه إن احتجت لارتفاع النافبار)
      },
    },
  },
  plugins: [],
};
