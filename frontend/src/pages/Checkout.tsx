import type { SyntheticEvent, ChangeEvent } from "react";
import { useState } from "react";
import { createOrderApi } from "../services/order.services";
import { toast } from "react-hot-toast";
import { GUEST_CUSTOMER_ID } from "../utils/constants";

const CheckOut = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    country: "",
    paymentMethod: "",
  });

  //create handle change function to update form data state
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //create palce order function to send form data to backend
  const handlePlaceOrder = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // basic validation to check if required fields are filled
    if (!formData.email || !formData.customerName || !formData.paymentMethod) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      const payload = {
        customerName: formData.customerName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: {
          street: formData.street,
          city: formData.city,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
        customer: GUEST_CUSTOMER_ID,
      };
      await createOrderApi(payload);
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order.");
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="space-y-4">
        {/* Checkout form fields */}
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full rounded-md border px-4 py-2"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full rounded-md border px-4 py-2"
          required
        />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full rounded-md border px-4 py-2"
          required
        />
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Street"
          className="w-full rounded-md border px-4 py-2"
          required
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full rounded-md border px-4 py-2"
          required
        />
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          className="w-full rounded-md border px-4 py-2"
          required
        />
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-2"
          required
        >
            <option value="" disabled>
            Select Payment Method
          </option>
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="Card">Credit/Debit Card</option>
        </select>
        <button
          type="submit"
          className="w-full rounded-lg bg-black px-6 py-3 text-white border border-black hover:bg-white hover:text-black transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckOut;
