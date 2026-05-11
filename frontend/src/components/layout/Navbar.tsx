import { Link } from "react-router-dom";
import { useCart } from "../../hooks/UseCart";

const Navbar = () => {
  const {cartItems} = useCart();
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">Clothing Store</h1>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartItems.length})</Link>
        <Link to = "/orders">Orders</Link>
        <Link to = "/admin">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
