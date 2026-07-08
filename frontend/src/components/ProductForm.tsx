import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createProductApi } from "../services/product.services";
import { getCategoriesApi } from "../services/category.services";

interface Category {
  _id: string;
  name: string;
}

const ProductForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    season: "",
    fabricType: "Stitched",
    category: "",
    color: "",
    size: "",
    stock: 0,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategoriesApi();
        setCategories(response.data?.data || response.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      toast.error("Image is required");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", String(formData.price));
      data.append("season", formData.season);
      data.append("fabricType", formData.fabricType);
      data.append("category", formData.category);
      data.append("color", formData.color);
      data.append("size", formData.size);
      data.append("stock", String(formData.stock));
      data.append("image", image);

      await createProductApi(data);
      toast.success("Product created successfully");

      setFormData({
        name: "",
        description: "",
        price: 0,
        season: "",
        fabricType: "Stitched",
        category: "",
        color: "",
        size: "",
        stock: 0,
      });

      setImage(null);
      setImagePreview("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Create New Product</h2>

        {/* Image Upload */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-900 mb-3">
            Product Image
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-600 transition-colors">
            {imagePreview ? (
              <div className="space-y-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-48 w-48 object-cover rounded-xl mx-auto"
                />
                <label className="cursor-pointer">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <span className="text-blue-600 hover:text-blue-700 font-medium">
                    Change Image
                  </span>
                </label>
              </div>
            ) : (
              <label className="cursor-pointer block">
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
                <svg
                  className="w-16 h-16 mx-auto text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </label>
            )}
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Price (Rs.)
            </label>
            <input
              type="number"
              name="price"
              placeholder="0.00"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Color
            </label>
            <input
              type="text"
              name="color"
              placeholder="e.g., Red, Blue, Black"
              value={formData.color}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all"
            />
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Size
            </label>
            <input
              type="text"
              name="size"
              placeholder="e.g., S, M, L, XL"
              value={formData.size}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all"
            />
          </div>

          {/* Season */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Season
            </label>
            <input
              type="text"
              name="season"
              placeholder="e.g., Summer, Winter, Spring"
              value={formData.season}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all"
            />
          </div>

          {/* Fabric Type */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Fabric Type
            </label>
            <select
              name="fabricType"
              value={formData.fabricType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all"
            >
              <option value="Stitched">Stitched</option>
              <option value="Unstitched">Unstitched</option>
            </select>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              placeholder="0"
              value={formData.stock}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter product description..."
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating...
              </span>
            ) : (
              "Create Product"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
