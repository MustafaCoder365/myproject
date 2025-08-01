import React, { useState, useEffect } from "react";
import { FaTrash, FaCheckCircle, FaTruck, FaClock, FaPlus, FaMinus, FaMapMarkerAlt } from "react-icons/fa";
import PublicNavbar from "../components/PublicNavbar";

export default function CartPage() {
    const DELIVERY_FEE = 3;

    const [cartItems, setCartItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // عنوان التوصيل
    const [address, setAddress] = useState({
        street: "Main Street",
        floor: "2",
        governorate: "Damascus"
    });
    const [showAddressModal, setShowAddressModal] = useState(false);

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        if (savedOrders.length > 0) setOrders(savedOrders);

        const savedCart = JSON.parse(localStorage.getItem("current_cart") || "[]");
        setCartItems(savedCart);

        const savedAddress = JSON.parse(localStorage.getItem("delivery_address") || "{}");
        if (savedAddress.street) setAddress(savedAddress);
    }, []);

    const saveAddress = () => {
        localStorage.setItem("delivery_address", JSON.stringify(address));
        setShowAddressModal(false);
    };

    // ✅ إصلاح حساب السعر لمنع NaN
    const totalProductsPrice = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price.toString().replace(/[^0-9.]/g, "")) || 0;
        return sum + price * (item.quantity || 1);
    }, 0);

    const finalTotal = totalProductsPrice + DELIVERY_FEE;

    const handleRemove = (id) => {
        const updated = cartItems.filter((item) => item.id !== id);
        setCartItems(updated);
        localStorage.setItem("current_cart", JSON.stringify(updated));
    };

    const handleQuantityChange = (id, delta) => {
        const updated = cartItems.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) } : item
        );
        setCartItems(updated);
        localStorage.setItem("current_cart", JSON.stringify(updated));
    };

    const handleCheckout = () => {
        const newOrderId = 1113 + Math.floor(Math.random() * 100);
        const newOrderItems = cartItems.map((item) => ({
            name: item.name,
            qty: item.quantity || 1
        }));
        const newOrders = [{ id: newOrderId, status: "Pending", items: newOrderItems, total: finalTotal }, ...orders];
        setOrders(newOrders);
        localStorage.setItem("orders", JSON.stringify(newOrders));
        setCartItems([]);
        localStorage.removeItem("current_cart");
        alert("Your order has been placed!");
    };

    const statusIcon = {
        Delivered: <FaCheckCircle className="text-green-500" />,
        "In Transit": <FaTruck className="text-blue-500" />,
        Pending: <FaClock className="text-yellow-500" />,
    };

    return (
        <div>
            <PublicNavbar />
            <div className="container mx-auto px-4 py-8 mt-20">
                <h1 className="text-3xl font-bold text-teal-600 mb-6">My Cart</h1>

                {/* Current Cart */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-10">
                    <h2 className="text-xl font-semibold mb-4">Current Cart</h2>
                    {cartItems.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty.</p>
                    ) : (
                        <>
                            <table className="min-w-full border rounded mb-4">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Product</th>
                                        <th className="px-4 py-3 text-left">Price</th>
                                        <th className="px-4 py-3 text-left">Quantity</th>
                                        <th className="px-4 py-3 text-left">Total</th>
                                        <th className="px-4 py-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => {
                                        const price = parseFloat(item.price.toString().replace(/[^0-9.]/g, "")) || 0;
                                        return (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3">{item.name}</td>
                                                <td className="px-4 py-3">${price}</td>
                                                <td className="px-4 py-3 flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, -1)}
                                                        className="text-gray-700 hover:text-teal-600"
                                                    >
                                                        <FaMinus />
                                                    </button>
                                                    {item.quantity || 1}
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, 1)}
                                                        className="text-gray-700 hover:text-teal-600"
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                </td>
                                                <td className="px-4 py-3">${price * (item.quantity || 1)}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <button
                                                        onClick={() => handleRemove(item.id)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            {/* Delivery Address */}
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <FaMapMarkerAlt className="text-red-500" />
                                    <span>{address.street}, Floor {address.floor}, {address.governorate}</span>
                                </div>
                                <button
                                    onClick={() => setShowAddressModal(true)}
                                    className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
                                >
                                    Edit Address
                                </button>
                            </div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-600">Products Total: ${totalProductsPrice}</p>
                                    <p className="text-gray-600">Delivery: ${DELIVERY_FEE}</p>
                                    <h3 className="text-xl font-semibold">Final Total: ${finalTotal}</h3>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-500 transition"
                                >
                                    Checkout
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Orders Tracking */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Orders Tracking</h2>
                    {orders.length === 0 ? (
                        <p className="text-gray-500">No previous orders.</p>
                    ) : (
                        <table className="min-w-full border rounded">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3 text-left">Order ID</th>
                                    <th className="px-4 py-3 text-left">Items</th>
                                    <th className="px-4 py-3 text-left">Total</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-gray-50 cursor-pointer"
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        <td className="px-4 py-3">#{order.id}</td>
                                        <td className="px-4 py-3">{order.items.length}</td>
                                        <td className="px-4 py-3">${order.total}</td>
                                        <td className="px-4 py-3 flex items-center gap-2">
                                            {statusIcon[order.status]} {order.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Modal for Address Editing */}
                {showAddressModal && (
                    <div className="fixed inset-0 bg-gradient-to-br from-white/80 to-teal-100/70 bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                            <h3 className="text-xl font-semibold mb-4">Edit Delivery Address</h3>
                            <input
                                type="text"
                                value={address.street}
                                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                className="w-full border rounded px-3 py-2 mb-2"
                                placeholder="Street"
                            />
                            <input
                                type="text"
                                value={address.floor}
                                onChange={(e) => setAddress({ ...address, floor: e.target.value })}
                                className="w-full border rounded px-3 py-2 mb-2"
                                placeholder="Floor"
                            />
                            <input
                                type="text"
                                value={address.governorate}
                                onChange={(e) => setAddress({ ...address, governorate: e.target.value })}
                                className="w-full border rounded px-3 py-2 mb-4"
                                placeholder="Governorate"
                            />
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowAddressModal(false)}
                                    className="px-4 py-2 border rounded hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={saveAddress}
                                    className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-500"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
