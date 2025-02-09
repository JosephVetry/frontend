import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"
import Allsupplier from "../components/TableSupplier"



export default function Supplier() {
  return (
    <div>
      <Navbar/>
      <Sidebar/> 
      <Allsupplier/>
    </div>
  );
}