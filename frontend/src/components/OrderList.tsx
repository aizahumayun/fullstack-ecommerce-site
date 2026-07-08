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
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="mb-6 text-3xl font-bold text-gray-900">
        Orders
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-600">No orders found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300 p-6"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Order #{order._id.slice(-8)}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{order.customerName}</p>
                  <p className="text-sm text-gray-600">{order.email}</p>
                  <p className="text-sm text-gray-600">{order.phoneNumber}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Rs. {order.totalPrice}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    {order.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h4 className="text-sm font-bold text-gray-900 uppercase mb-4">Items</h4>
                <div className="space-y-2">
                  {order.orderItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <div className="text-gray-700">
                        <p className="font-medium">{item.productId.name}</p>
                        <p className="text-xs text-gray-600">Size: {item.size} × {item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900">Rs. {item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <label className="text-sm font-bold text-gray-900 block mb-2">Order Status</label>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusUpdate(order._id, e.target.value)
                    }
                    className={`px-4 py-2 rounded-lg font-medium border transition-all ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800 border-green-300"
                        : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800 border-blue-300"
                          : order.status === "Cancelled"
                            ? "bg-red-100 text-red-800 border-red-300"
                            : "bg-yellow-100 text-yellow-800 border-yellow-300"
                    }`}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersList;