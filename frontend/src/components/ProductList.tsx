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
    // fetch products
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProductsApi();
        console.log("DEBUG:", response);
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

  // delete product
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
    return <p className="mt-8">Loading products...</p>;
  }

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">Products</h2>

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Image</th>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Price</th>

              <th className="p-4 text-left">Stock</th>

              <th className="p-4 text-left">Category</th>

              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                </td>

                <td className="p-4">{product.name}</td>

                <td className="p-4">Rs. {product.price}</td>

                <td className="p-4">{product.stock}</td>

                <td className="p-4">{product.category?.name}</td>

                <td className="p-4">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="rounded-lg bg-red-500 px-4 py-2 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
