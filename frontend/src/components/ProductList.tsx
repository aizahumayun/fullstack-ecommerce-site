import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteProductApi, getProductsApi } from "../services/product.services";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
  category?: {
    name: string;
  };
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProductsApi();
        const products =
          response?.data?.data?.products ||
          response?.data?.products ||
          response ||
          [];
        setProducts(products);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    try {
      await deleteProductApi(productId);
      toast.success("Product deleted successfully");
      setProducts((prev) =>
        prev.filter((product) => product._id !== productId),
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="mb-6 text-3xl font-bold text-gray-900">Products</h2>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m0 0l8 4m-8-4v10l8 4m0-10l8 4m0-10v10l8-4" />
          </svg>
          <p className="text-gray-600">No products found</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-md">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase">Image</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase">Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase">Price</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase">Category</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 rounded-lg object-cover shadow-sm"
                    />
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{product.name}</p>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">Rs. {product.price}</p>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        product.stock > 10
                          ? "bg-green-100 text-green-800"
                          : product.stock > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-gray-600">{product.category?.name || "N/A"}</p>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-red-100 text-red-600 hover:text-red-700 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
