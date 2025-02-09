import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"
import Form from '../components/TambahSupplier'


export default function Tambahsupplier() {
  return (
    <div>
      <Navbar/>
      <Sidebar/> 
      <div className="flex">
        <main className="flex-1 ml-48 mt-16 p-4">
            <Form/>
        </main>
      </div>
    </div>
  );
}