import type { Dispatch, SetStateAction } from "react";

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: Dispatch<SetStateAction<string>>;
}
const AdminSidebar = ({ activeSection, setActiveSection }: AdminSidebarProps) => {
  return (
    <aside className="min-h-screen w-64 border-r bg-white p-6">
      <h2 className="mb-8 text-2xl font-bold">
        Admin Panel
      </h2>

      <nav className="space-y-4">
        <button
          className={`block ${activeSection === "products" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
          onClick={() => setActiveSection("products")}
        >
          Products
        </button>

        <button
          className={`block ${activeSection === "categories" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
          onClick={() => setActiveSection("categories")}
        >
          Categories
        </button>

        <button
          className={`block ${activeSection === "orders" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
          onClick={() => setActiveSection("orders")}
        >
          Orders
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;