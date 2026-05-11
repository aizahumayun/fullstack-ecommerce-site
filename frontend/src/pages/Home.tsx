import { useEffect, useMemo, useState } from "react";
import type { Product } from "../types/product.types";
import { getProductsApi } from "../services/product.services";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import type { Category } from "../types/category.types";
import { getCategoriesApi } from "../services/category.services";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch products from the backend and update state
      try {
        const res = await getProductsApi();
        const data = res.data?.data?.products || res.data?.products || res.data;
        setProducts(data || []);
        console.log("PRODUCTS:", products);
      } catch (error) {
        console.log(error);
        setProducts([]);
      }
    };
    // Fetch categories from the backend and update state
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesApi();
        const data = res.data?.data || res.data?.categories || res.data;
        setCategories(data || []);
        console.log("CATEGORIES:", categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        product.color.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "" || product.category?.name === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);
  return (
    <div className="p-6">
      <h1 className="mb-8 text-3xl font-bold">Latest Products</h1>
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onClick={setSelectedProduct}
          />
        ))}
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Home;
