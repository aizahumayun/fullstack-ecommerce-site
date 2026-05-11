import type { Product } from "../types/product.types";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div
      onClick={() => onClick(product)}
      className="cursor-pointer rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <img
        src={product.image || "/placeholder.png"}
        alt={product.name}
        className="h-64 w-full rounded-lg object-cover"
      />
      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.fabricType}</p>
        <p className="text-xl text-gray-800 font-bold">Rs. {product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
