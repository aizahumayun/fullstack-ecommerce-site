import { useEffect, useState } from "react";

import { deleteCategoryApi, getCategoriesApi } from "../services/category.services";
import { toast } from "react-hot-toast/headless";
interface Category {
  _id: string;

  name: string;

  image: string;
}

const CategoryList = () => {
  const [categories, setCategories] =
    useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
    try {
      const response =
        await getCategoriesApi();

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
    fetchCategories();
  }, []);

  const handleDelete = async (
  categoryId: string
) => {
  try {
    await deleteCategoryApi(categoryId);

    toast.success(
      "Category deleted successfully"
    );

    setCategories((prev) =>
      prev.filter(
        (category) =>
          category._id !== categoryId
      )
    );
  } catch (error) {
    console.log(error);

    toast.error(
      "Failed to delete category"
    );
  }
};
  return (
    <div className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">
        Categories
      </h2>

      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex items-center gap-4 rounded-lg border p-4"
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-20 w-20 rounded-lg object-cover"
            />

            <p className="font-medium">
              {category.name}
            </p>

            <button
              onClick={() => handleDelete(category._id)}
              className="ml-auto rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;