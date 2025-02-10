// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar"
// import Form from '../components/TambahSupplier'


// export default function Tambahsupplier() {
//   return (
//     <div>
//       <Navbar/>
//       <Sidebar/> 
//       <div className="flex">
//         <main className="flex-1 ml-48 mt-16 p-4">
//             <Form/>
//         </main>
//       </div>
//     </div>
//   );
// }
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Form from "../components/TambahSupplier";

export default function AddSupplier() {
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
      <div className="flex">
        <main className="flex-1 ml-48 mt-16 p-4">
          <Form />
        </main>
      </div>
    </div>
  );
}
