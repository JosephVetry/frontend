// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import Checkout from "../components/Checkout"

// export default function Dashboard() {
//   const { supplierId } = useParams<{ supplierId: string }>();

//   useEffect(() => {
//     console.log("Supplier ID from query params:", supplierId);
//   }, [supplierId]); // Logs supplierId whenever it changes

//   return (
//     <div>
//       <Navbar />
//       <Sidebar />
//       <Checkout supplierId={supplierId} />
//     </div>
//   );
// }
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Checkout from "../components/Checkout";

export default function DetailTransaksi() {
  const navigate = useNavigate();
  const { supplierId } = useParams<{ supplierId: string }>();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      // Redirect ke halaman login dan hapus riwayat navigasi
      navigate("/", { replace: true });
      window.history.replaceState(null, "", "/");
    }
  }, [navigate]);

  useEffect(() => {
    console.log("Supplier ID from query params:", supplierId);
  }, [supplierId]); // Logs supplierId whenever it changes

  return (
    <div>
      <Navbar />
      <Sidebar />
      <Checkout supplierId={supplierId} />
    </div>
  );
}
