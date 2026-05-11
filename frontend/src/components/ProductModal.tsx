import { toast } from "react-hot-toast/headless";
import { useCart } from "../hooks/UseCart";
import { addToCartApi } from "../services/cart.services";
import type { Product } from "../types/product.types";
import { useState } from "react";
interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
//add loading state
const [loading, setLoading] = useState(false);
  //handle addToCart logic here
  const handleAddToCart = async () => {
    try {
      setLoading(true);
      addToCart(product);
      await addToCartApi({
        productId: product._id,
        quantity: 1,
        size: product.size,
        customer: "Guest_User", // Replace with actual customer identifier if available
      });
      toast.success("Added to cart successfully!");

    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart.");
    }
    finally {
      setLoading(false);
    }
  };
  // Access cart context to add product to cart
  const { addToCart } = useCart();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-white rounded-2xl p-6">
        <button
          onClick={onClose}
          className="mb-4 rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          ✕
        </button>
        <div className="grid gap-8 md:grid-cols-2">
          <img
            src={product.image}
            alt={product.name}
            className="h-125 w-full rounded-xl object-cover"
          />
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-2xl font-semibold">Rs. {product.price}</p>
            <p className="text-sm text-gray-500">{product.description}</p>

            <div>
              <span className="font-semibold">Color:</span>
              <span className="ml-2">{product.color}</span>
            </div>
            <div>
              <span className="font-semibold">Size:</span>
              <span className="ml-2">{product.size}</span>
            </div>
            <div>
              <span className="font-semibold">Season:</span>
              <span className="ml-2">{product.season}</span>
            </div>
            <div>
              <span className="font-semibold">Fabric:</span>
              <span className="ml-2">{product.fabricType}</span>
            </div>
            <button
              disabled={loading}
              onClick={handleAddToCart}
              className="rounded-lg bg-black px-6 py-3 text-white disabled:opacity-50 hover:bg-white hover:text-black transition-all duration-300"
            >
              {loading ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
