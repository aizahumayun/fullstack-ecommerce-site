import { toast } from "react-hot-toast/headless";
import { useCart } from "../hooks/UseCart";
import { addToCartApi } from "../services/cart.services";
import type { Product } from "../types/product.types";
import { useState } from "react";
import { GUEST_CUSTOMER_ID } from "../utils/constants";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      addToCart(product);
      await addToCartApi({
        productId: product._id,
        quantity: 1,
        size: product.size,
        customer: GUEST_CUSTOMER_ID,
      });
      toast.success("Added to cart successfully!");
      setTimeout(() => onClose(), 500);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-white rounded-3xl p-6 md:p-8 shadow-2xl animate-in scale-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Image Section */}
          <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden h-96 md:h-full">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Brand */}
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              {product.fabricType}
            </p>

            {/* Name */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-500 text-sm">{product.category?.name}</p>
            </div>

            {/* Price */}
            <div className="border-l-4 border-gradient-to-b from-blue-600 to-purple-600 pl-4">
              <p className="text-gray-600 text-sm mb-1">Price</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Rs. {product.price}
              </p>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Attributes */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
              {product.color && (
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase">Color</p>
                  <p className="text-gray-900 font-medium mt-1 flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: product.color.toLowerCase() }}
                    />
                    {product.color}
                  </p>
                </div>
              )}
              {product.size && (
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase">Size</p>
                  <p className="text-gray-900 font-medium mt-1">{product.size}</p>
                </div>
              )}
              {product.season && (
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase">Season</p>
                  <p className="text-gray-900 font-medium mt-1">{product.season}</p>
                </div>
              )}
              {product.fabricType && (
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase">Fabric</p>
                  <p className="text-gray-900 font-medium mt-1">{product.fabricType}</p>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              disabled={loading}
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Adding...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </>
              )}
            </button>

            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-4 text-xs text-gray-600 pt-4">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Secure checkout
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
