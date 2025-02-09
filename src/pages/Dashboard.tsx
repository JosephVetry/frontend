import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"
import Supplier from "../components/TableSupplier"
import Footer from "../components/Footer"

export default function Dashboard() {
  return (
    <div>
      <Navbar/>
      <Sidebar/> 
      <Supplier/>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2">You are logged in!</p>
        <Link to="/" className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
          Logout
        </Link>
      </div>
      <Footer/>
    </div>
  );
}