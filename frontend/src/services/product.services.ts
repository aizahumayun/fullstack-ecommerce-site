import { api } from "./api";


//create product API call
export const createProductApi = async (
  data: FormData
) => {
  return await api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
//get products API call
export const getProductsApi = async () => {
  try {
    const response = await api.get("/products");
  return response.data.data.products;;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
//delete product API call
export const deleteProductApi = async (
  productId: string
) => {
  const response = await api.delete(
    `/products/${productId}`
  );

  return response.data;
};