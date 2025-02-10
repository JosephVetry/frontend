import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DetailHistory from "../components/DetailHistory";

export default function DetailHistoryPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      // Redirect ke halaman login dan hapus riwayat navigasi
      navigate("/", { replace: true });
      window.history.replaceState(null, "", "/");
    }
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <DetailHistory />
    </div>
  );
}
