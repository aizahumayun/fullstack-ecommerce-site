import { api } from "./api";
// Define the payload type for adding to cart
interface addToCartPayloadType {
    productId: string;
    quantity: number;
    size: string;
    customer: string;
}
// API call to add an item to the cart
export const addToCartApi = async (payload: addToCartPayloadType) => {
    try {
        const response = await api.post("/cart/add", payload);
        return response.data;
    } catch (error) {
        console.error("Error adding to cart:", error);
        throw error;
    }
}
// API call to get the cart for a specific customer
export const getCartApi = async (customer: string) => {
    try {
        const response = await api.get(`/cart/${customer}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cart:", error);
        throw error;
    }
}
// API call to remove an item from the cart
export const removeFromCartApi = async (productId: string, size: string, customer: string) => {
    try {
        const response = await api.delete("/cart/remove", { data: { productId, size, customer, }, });
        return response.data;
    } catch (error) {
        console.error("Error removing from cart:", error);
        throw error;
    }
}