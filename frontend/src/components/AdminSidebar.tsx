import type { Dispatch, SetStateAction } from "react";

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: Dispatch<SetStateAction<string>>;
}

const AdminSidebar = ({ activeSection, setActiveSection }: AdminSidebarProps) => {
  const menuItems = [
    { id: "products", label: "Products", icon: "📦" },
    { id: "categories", label: "Categories", icon: "🏷️" },
    { id: "orders", label: "Orders", icon: "📋" },
  ];

  return (
    <aside className="min-h-screen w-64 border-r border-gray-200 bg-gradient-to-b from-white to-gray-50 p-6 shadow-sm">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
            ⚙️
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Admin</h2>
        </div>
        <p className="text-xs text-gray-600">Manage your store</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 transform ${
              activeSection === item.id
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                : "text-gray-700 hover:bg-gray-100 hover:scale-102"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;