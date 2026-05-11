import { useState } from "react";

import toast from "react-hot-toast";

import { createCategoryApi } from "../services/category.services";

const CategoryForm = () => {
  const [name, setName] = useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!image) {
      toast.error("Image is required");

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);

      formData.append("image", image);

      await createCategoryApi(formData);

      toast.success("Category created");

      setName("");

      setImage(null);
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to create category"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-md space-y-4"
    >
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="w-full rounded-lg border p-3"
      />

      <input
        type="file"
        onChange={(e) =>
          setImage(
            e.target.files?.[0] || null
          )
        }
        className="w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
      >
        {loading
          ? "Creating..."
          : "Create Category"}
      </button>
    </form>
  );
};

export default CategoryForm;