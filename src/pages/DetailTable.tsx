
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"
import Transaksi from '../components/TableTransaksi'
// import Footer from "../components/Footer"

export default function Dashboard() {
  return (
    <div>
      <Navbar/>
      <Sidebar/> 
        <Transaksi/>
      {/* <Footer/> */}
    </div>
  );
}