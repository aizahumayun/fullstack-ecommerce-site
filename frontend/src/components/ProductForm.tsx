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

  // fetch categories

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

  // handle inputs
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

  // submit product
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

      // reset form
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
    } catch (error) {
      console.log(error);

      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <input
        type="text"
        name="season"
        placeholder="Season"
        value={formData.season}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <select
        name="fabricType"
        value={formData.fabricType}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      >
        <option value="Stitched">Stitched</option>

        <option value="Unstitched">Unstitched</option>
      </select>

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      >
        <option value="">Select Category</option>

        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="color"
        placeholder="Color"
        value={formData.color}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <input
        type="text"
        name="size"
        placeholder="Size"
        value={formData.size}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-black py-3 text-white disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Product"}
      </button>
    </form>
  );
};

export default ProductForm;
