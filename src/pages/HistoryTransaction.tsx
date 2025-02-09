import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"
import History from '../components/HistoryTransaksi'

export default function Supplier() {
  return (
    <div>
      <Navbar/>
      <Sidebar/> 
      <History/>
    </div>
  );
}