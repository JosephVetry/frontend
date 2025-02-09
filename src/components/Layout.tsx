import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar (Fixed at the Top) */}
      <Navbar />

      <div className="flex flex-1 mt-16">
        {/* Sidebar (Fixed on the Left) */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 ml-48 p-4">{children}</main>
      </div>

      {/* Footer (Fixed at the Bottom) */}
      <Footer />
    </div>
  );
};

export default Layout;
