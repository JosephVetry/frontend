import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"
import Checkout from '../components/Checkout'


export default function Dashboard() {
  return (
    <div>
      <Navbar/>
      <Sidebar/> 
      <Checkout/>
    </div>
  );
}