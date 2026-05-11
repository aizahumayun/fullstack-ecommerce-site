import { Link } from "react-router-dom";
import { useCart } from "../hooks/UseCart";

const Cart = () => {
  const {cartItems, removeFromCart, cartTotal} = useCart();
  if(cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
      </div>
    )
  }
  return (

    <div className="p-6">
      <h1 className="mb-8 text-2xl font-bold">Your Cart</h1>
      {/* List cart items with remove button and total price with checkout link */}
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div key={item.productId._id} className="flex items-center justify-between gap-4 rounded-xl border-b p-4">
            <img src={item.productId.image} alt={item.productId.name} className="h-32 w-32 rounded-lg object-cover" />
            <div className="flex-1 space-y-2 ">
              <h2 className="text-lg font-semibold">{item.productId.name}</h2>
              <p className="text-gray-500">Price: Rs. {item.productId.price}</p>
              <p className="text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.productId._id)}
              className="rounded-md bg-red-500 text-white px-4 py-2 hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold">Total: Rs. {cartTotal.toFixed(2)}</h2>
        <Link to="/checkout" className="inline-block rounded-lg bg-black text-white px-6 py-3 hover:bg-white hover:text-black">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}

export default Cart
