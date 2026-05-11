import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  getAllOrders,
  updateOrderStatusApi,
} from "../services/order.services";

interface OrderItem {
  productId: {
    name: string;
  };

  quantity: number;

  size: string;

  price: number;
}

interface Order {
  _id: string;

  customerName: string;

  email: string;

  phoneNumber: string;

  totalPrice: number;

  paymentMethod: string;

  status: string;

  orderItems: OrderItem[];
}

const OrdersList = () => {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    // fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response =
        await getAllOrders();

      setOrders(response.data);
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };
    fetchOrders();
  }, []);

  // update status
  const handleStatusUpdate = async (
    orderId: string,
    status: string
  ) => {
    try {
      await updateOrderStatusApi(
        orderId,
        status
      );

      toast.success(
        "Order updated successfully"
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status }
            : order
        )
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to update order"
      );
    }
  };

  if (loading) {
    return (
      <p className="mt-8">
        Loading orders...
      </p>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">
        Orders
      </h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="rounded-xl border p-6"
          >
            {/* top section */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  {order.customerName}
                </h3>

                <p>{order.email}</p>

                <p>{order.phoneNumber}</p>
              </div>

              <div>
                <p>
                  Total:
                  <span className="font-semibold">
                    {" "}
                    Rs.
                    {order.totalPrice}
                  </span>
                </p>

                <p>
                  Payment:
                  {" "}
                  {order.paymentMethod}
                </p>
              </div>

              <div>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusUpdate(
                      order._id,
                      e.target.value
                    )
                  }
                  className="rounded-lg border p-2"
                >
                  <option value="Processing">
                    Processing
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>
                </select>
              </div>
            </div>

            {/* items */}

            <div className="mt-6 space-y-3">
              {order.orderItems.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                  >
                    <div>
                      <p className="font-medium">
                        {
                          item.productId
                            ?.name
                        }
                      </p>

                      <p>
                        Size:
                        {" "}
                        {item.size}
                      </p>
                    </div>

                    <div>
                      <p>
                        Qty:
                        {" "}
                        {item.quantity}
                      </p>

                      <p>
                        Rs.
                        {" "}
                        {item.price}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;