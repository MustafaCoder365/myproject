import React, { useState, useEffect } from 'react';
import AboutSection from "../../components/AboutSection"; // استيراد قسم About
import {
  FaTags,
  FaPlus,
  FaChartLine,
  FaUndo,
  FaBoxOpen,
  FaCommentDots,
  FaSignOutAlt
} from 'react-icons/fa';

export default function StoreHome() {
  const [activeSection, setActiveSection] = useState('categories');

  // تحقق من المصادقة
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'store') {
      window.location.href = '/login/store';
    }
  }, []);

  // بيانات وهمية للفئات والمنتجات
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Clothing' }
  ]);
  const [products, setProducts] = useState([
    { id: 1, title: 'Smartphone', categoryId: 1, price: 299 },
    { id: 2, title: 'Novel', categoryId: 2, price: 19 }
  ]);

  // استمارات الإدخال
  const [newCategory, setNewCategory] = useState('');
  const [editCatId, setEditCatId] = useState(null);
  const [editCatName, setEditCatName] = useState('');

  const [newProduct, setNewProduct] = useState({
    title: '',
    categoryId: categories[0]?.id || null,
    price: ''
  });

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    setCategories(c => [
      ...c,
      { id: Date.now(), name: newCategory.trim() }
    ]);
    setNewCategory('');
  };

  const handleEditCategory = () => {
    setCategories(c =>
      c.map(cat =>
        cat.id === editCatId ? { ...cat, name: editCatName } : cat
      )
    );
    setEditCatId(null);
    setEditCatName('');
  };

  const handleDeleteCategory = id => {
    setCategories(c => c.filter(cat => cat.id !== id));
  };

  const handleAddProduct = e => {
    e.preventDefault();
    const nextId = products.length + 1;
    setProducts(p => [
      ...p,
      {
        id: nextId,
        title: newProduct.title,
        categoryId: Number(newProduct.categoryId),
        price: Number(newProduct.price)
      }
    ]);
    setNewProduct({ title: '', categoryId: categories[0]?.id, price: '' });
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <><div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* شريط التنقل الجانبي */}
      <aside className="w-full md:w-1/4 bg-white shadow p-4 space-y-4">
        <button
          onClick={() => setActiveSection('categories')}
          className="flex items-center gap-2 w-full p-2 hover:bg-blue-100 rounded"
        >
          <FaTags /> الفئات
        </button>
        <button
          onClick={() => setActiveSection('addProduct')}
          className="flex items-center gap-2 w-full p-2 hover:bg-blue-100 rounded"
        >
          <FaPlus /> إضافة منتج
        </button>
        <button
          onClick={() => setActiveSection('sales')}
          className="flex items-center gap-2 w-full p-2 hover:bg-blue-100 rounded"
        >
          <FaChartLine /> تقرير المبيعات
        </button>
        <button
          onClick={() => setActiveSection('returns')}
          className="flex items-center gap-2 w-full p-2 hover:bg-blue-100 rounded"
        >
          <FaUndo /> تقرير المرتجعات
        </button>
        <button
          onClick={() => setActiveSection('products')}
          className="flex items-center gap-2 w-full p-2 hover:bg-blue-100 rounded"
        >
          <FaBoxOpen /> المنتجات
        </button>
        <button
          onClick={() => setActiveSection('complaints')}
          className="flex items-center gap-2 w-full p-2 hover:bg-blue-100 rounded"
        >
          <FaCommentDots /> الشكاوى
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full p-2 text-red-600 hover:bg-red-100 rounded mt-4"
        >
          <FaSignOutAlt /> تسجيل الخروج
        </button>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-6">
        {activeSection === 'categories' && (
          <section>
            <h2 className="text-2xl font-bold mb-4">إدارة الفئات</h2>
            <div className="space-y-4">
              {categories.map(cat => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between bg-white p-3 rounded shadow"
                >
                  {editCatId === cat.id ? (
                    <input
                      value={editCatName}
                      onChange={e => setEditCatName(e.target.value)}
                      className="border px-2 py-1 rounded flex-1" />
                  ) : (
                    <span>{cat.name}</span>
                  )}
                  <div className="space-x-2">
                    {editCatId === cat.id ? (
                      <button
                        onClick={handleEditCategory}
                        className="text-green-600 hover:underline"
                      >
                        حفظ
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditCatId(cat.id);
                          setEditCatName(cat.name);
                        } }
                        className="text-blue-600 hover:underline"
                      >
                        تعديل
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-red-600 hover:underline"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  placeholder="فئة جديدة"
                  className="flex-1 border px-3 py-2 rounded" />
                <button
                  onClick={handleAddCategory}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  إضافة
                </button>
              </div>
            </div>
          </section>
        )}
        {activeSection === 'addProduct' && (
          <section>
            <h2 className="text-2xl font-bold mb-4">إضافة منتج جديد</h2>
            <form
              onSubmit={handleAddProduct}
              className="space-y-4 bg-white p-4 rounded shadow"
            >
              <input
                type="text"
                placeholder="عنوان المنتج"
                value={newProduct.title}
                onChange={e => setNewProduct(n => ({ ...n, title: e.target.value }))}
                className="w-full border px-3 py-2 rounded"
                required />
              <input
                type="number"
                placeholder="السعر"
                value={newProduct.price}
                onChange={e => setNewProduct(n => ({ ...n, price: e.target.value }))}
                className="w-full border px-3 py-2.rounded"
                required />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                إضافة للمتجر
              </button>
            </form>
          </section>
        )}
        {/* باقي الأقسام... */}
      </main>
    </div><AboutSection /></>
  );
}
