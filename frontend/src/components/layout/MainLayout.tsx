import type { ReactNode } from "react";
import Navbar from "./Navbar";


interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;