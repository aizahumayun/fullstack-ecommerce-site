import { api } from "./api";

//create category API call
export const createCategoryApi = async (
  formData: FormData
) => {
  const response = await api.post(
    "/categories/",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

//get categories API call
export const getCategoriesApi = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
//delete category API call
export const deleteCategoryApi = async (
  categoryId: string
) => {
  const response = await api.delete(
    `/categories/${categoryId}`
  );

  return response.data;
};