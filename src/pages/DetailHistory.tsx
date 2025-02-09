import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"
import DetailHistory from '../components/DetailHistory'


export default function Dashboard() {
  return (
    <div>
      <Navbar/>
      <Sidebar/> 
      <DetailHistory/>
    </div>
  );
}