import { api } from "./api";
export interface CreateOrderPayload {
  customerName: string;
  email: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  paymentMethod: string;
  customer: string;
}

// API call to create a new order
export const createOrderApi = async (orderData: CreateOrderPayload) => {
  try {
    const response = await api.post("/orders/create", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
// API call to get orders for a specific customer
export const getOrdersApi = async (customer: string) => {
  try {
    const response = await api.get(`/orders/${customer}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// API call to get all orders (for admin)
export const getAllOrders = async () => {
  const response = await api.get("/orders");

  return response.data;
};

// API call to update order status (for admin)
export const updateOrderStatusApi = async (orderId: string, status: string) => {
  const response = await api.patch("/orders/update-status", {
    orderId,
    status,
  });

  return response.data;
};
