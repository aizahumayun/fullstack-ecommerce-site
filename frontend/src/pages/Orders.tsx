import { useEffect, useState } from "react";

import { getOrdersApi } from "../services/order.services";
import { GUEST_CUSTOMER_ID } from "../utils/constants";

import type { Order } from "../types/order.types";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    const fetchOrders = async () => {
    try {
      const response = await getOrdersApi(GUEST_CUSTOMER_ID);

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };
    fetchOrders();
  }, []);

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-xl border p-4 shadow-sm"
            >
              <div className="flex justify-between">
                <h2 className="font-bold">
                  Order ID: {order._id}
                </h2>

                <span className="rounded bg-gray-200 px-3 py-1 text-sm">
                  {order.status}
                </span>
              </div>

              <p>Total: Rs. {order.totalAmount}</p>

              <p className="text-sm text-gray-500">
                Date:{" "}
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </p>

              <div className="mt-4 space-y-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.product.name} (
                      {item.size})
                    </span>

                    <span>
                      Qty: {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
