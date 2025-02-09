
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"
import Barang from "../components/TableBarang"
// import Footer from "../components/Footer"

export default function Dashboard() {
  return (
    <div>
      <Navbar/>
      <Sidebar/> 
      <Barang/>
      {/* <Footer/> */}
    </div>
  );
}