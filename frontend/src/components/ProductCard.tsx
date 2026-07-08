import type { Product } from "../types/product.types";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div
      onClick={() => onClick(product)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
    >
      {/* Image Container */}
      <div className="relative h-80 w-full overflow-hidden bg-gray-100">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          New
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 space-y-3">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{product.fabricType}</p>
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {product.name}
        </h2>
        
        {/* Product Details */}
        <div className="flex gap-2 text-xs text-gray-600">
          {product.color && (
            <span className="inline-block bg-gray-100 px-2 py-1 rounded">
              {product.color}
            </span>
          )}
          {product.size && (
            <span className="inline-block bg-gray-100 px-2 py-1 rounded">
              {product.size}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Rs. {product.price}
          </p>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
