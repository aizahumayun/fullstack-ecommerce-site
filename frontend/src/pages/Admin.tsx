import { useState } from "react";

import AdminSidebar from "../components/AdminSidebar";

import CategoryForm from "../components/CategoryForm";
import ProductForm from "../components/ProductForm";
import CategoryList from "../components/CategoryList";
import ProductList from "../components/ProductList";
import OrdersList from "../components/OrderList";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("categories");

  return (
    <div className="flex">
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        {/* dynamic section rendering */}

        {activeSection === "categories" && (
          <>
            <CategoryForm />
            <CategoryList />
          </>
        )}

        {activeSection === "products" && (
          <>
            <ProductForm />
            <ProductList />
          </>
        )}

        {activeSection === "orders" && (
          <div className="mt-8"><OrdersList /></div>
        )}
      </div>
    </div>
  );
};

export default Admin;
