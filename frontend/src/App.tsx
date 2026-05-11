import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartProvider";
import CheckOut from "./pages/Checkout";
import { Toaster } from "react-hot-toast";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <>
      {/* Wrap the app with CartProvider to provide cart context to all components */}
      <CartProvider>
        {/* Toaster for notifications */}
        <Toaster position="top-right" reverseOrder={false} />
        {/* Wrap the app with BrowserRouter to enable routing */}
        <BrowserRouter>

          {/* Your routes and components go here */}
          <Routes>
            {/* Example route */}
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
            <Route path="/checkout" element={<MainLayout><CheckOut /></MainLayout>} />
            <Route path="/orders" element={<MainLayout><Orders /></MainLayout>} />
            <Route path="/admin" element={<MainLayout><Admin /></MainLayout>} />
            <Route path="/admin/orders" element={<MainLayout><Orders /></MainLayout>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
