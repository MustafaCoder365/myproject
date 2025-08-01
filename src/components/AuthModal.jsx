import React, { useState } from "react";
import { FaUser, FaStore, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AuthModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    file: null,
    governorate: "",
    region: ""
  });
  const [errors, setErrors] = useState({});
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  // بيانات المحافظات والمناطق
  const governoratesData = {
    Damascus: ["Mazzeh", "Kafr Souseh", "Baramkeh", "Muhajirin"],
    "Rif Dimashq": ["Douma", "Jaramana", "Qudsaya", "Yabroud"],
    Aleppo: ["Downtown", "Saif al-Dawla", "Al-Sukkari", "Al-Ansari"],
    Homs: ["Baba Amr", "Al-Waer", "Inshaat"],
    Latakia: ["Salibah", "Southern Raml", "Ziraa Project"],
    Hama: ["Qusour", "Hader", "Barnawi"],
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm((f) => ({ ...f, file: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
    // تصفير المنطقة عند تغيير المحافظة
    if (name === "governorate") {
      setForm((f) => ({ ...f, region: "" }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = "Email is required";
    if (!form.password) errs.password = "Password is required";

    if (mode === "signup") {
      if (!form.name) errs.name = "Name is required";
      if (form.password.length < 8) errs.password = "Minimum 8 characters";
      if (form.password !== form.confirm) errs.confirm = "Passwords must match";
      if (!form.governorate) errs.governorate = "Governorate is required";
      if (!form.region) errs.region = "Region is required";
      if (role === "store" && !form.file) errs.file = "Commercial record required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // تسجيل الدخول
    if (mode === "login") {
      localStorage.setItem("token", "dummy_token_123");
      localStorage.setItem("role", role);
      navigate(role === "user" ? "/user" : "/store1");
      onClose();
      return;
    }

    // إذا المتجر → تحقق بالبريد
    if (role === "store") {
      setShowVerification(true);
      return;
    }

    // مستخدم عادي
    localStorage.setItem("token", "dummy_token_123");
    localStorage.setItem("role", role);
    navigate("/user");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white/80 to-teal-100/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl p-6 space-y-5 overflow-y-auto max-h-[90vh]">
        {/* اختيار الدور */}
        <div className="flex space-x-2">
          <button
            onClick={() => setRole("user")}
            className={`flex-1 py-2 rounded ${role === "user" ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            <FaUser className="inline mr-2" /> User
          </button>
          <button
            onClick={() => setRole("store")}
            className={`flex-1 py-2 rounded ${role === "store" ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            <FaStore className="inline mr-2" /> Store
          </button>
        </div>

        {/* اختيار نوع العملية */}
        <div className="flex space-x-2">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 border-b-2 ${mode === "login" ? "border-teal-500 text-teal-500" : "border-transparent text-gray-600"}`}
          >
            <FaSignInAlt className="inline mr-1" /> Login
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 border-b-2 ${mode === "signup" ? "border-teal-500 text-teal-500" : "border-transparent text-gray-600"}`}
          >
            <FaUserPlus className="inline mr-1" /> Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {mode === "signup" && (
            <div>
              <label className="text-sm font-semibold">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {mode === "signup" && (
            <>
              <div>
                <label className="text-sm font-semibold">Confirm Password</label>
                <input
                  name="confirm"
                  type="password"
                  value={form.confirm}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded mt-1"
                />
                {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
              </div>

              {/* ملف السجل التجاري للمتاجر */}
              {role === "store" && (
                <div>
                  <label className="text-sm font-semibold">Commercial Record</label>
                  <input
                    name="file"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleChange}
                    className="w-full mt-1"
                  />
                  {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
                </div>
              )}

              {/* المحافظة */}
              <div>
                <label className="text-sm font-semibold">Governorate</label>
                <select
                  name="governorate"
                  value={form.governorate}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded mt-1"
                >
                  <option value="">Select Governorate</option>
                  {Object.keys(governoratesData).map((gov) => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
                {errors.governorate && <p className="text-red-500 text-xs mt-1">{errors.governorate}</p>}
              </div>

              {/* المنطقة */}
              <div>
                <label className="text-sm font-semibold">Region</label>
                <select
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                  disabled={!form.governorate}
                  className="w-full border px-3 py-2 rounded mt-1"
                >
                  <option value="">Select Region</option>
                  {form.governorate &&
                    governoratesData[form.governorate].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                </select>
                {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region}</p>}
              </div>
            </>
          )}

          <button type="submit" className="bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition">
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <button onClick={onClose} className="text-center text-sm text-gray-500 hover:underline w-full">
          Cancel
        </button>
      </div>

      {/* مودال التحقق */}
      {showVerification && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Email Verification</h2>
            <p className="mb-2">Enter the code sent to your email</p>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
              placeholder="Verification code"
            />
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowVerification(false)} className="px-4 py-2 border rounded hover:bg-gray-100">
                Cancel
              </button>
              <button
                onClick={() => {
                  if (verificationCode === "8769") {
                    localStorage.setItem("token", "dummy_token_123");
                    localStorage.setItem("role", role);
                    navigate("/store1");
                    onClose();
                  } else {
                    alert("Wrong code");
                  }
                }}
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-500"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
