import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Barang from "../components/TableBarang";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      // Jika tidak login, redirect ke halaman login dan hapus history sebelumnya
      navigate("/", { replace: true });

      // Hapus history agar user tidak bisa kembali ke dashboard
      window.history.replaceState(null, "", "/");
    }
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <Barang />
    </div>
  );
}
