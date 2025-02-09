import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Supplier from './pages/Supplier'
import AddSupplier from './pages/AddSupplier'
import DetailTransaksi from './pages/DetailTransaksi'
import History from './pages/HistoryTransaction'
import ItemDetail from "./pages/itemDetail"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/detailtransaksi" element={<DetailTransaksi/>} />
        <Route path="/addsupplier" element={<AddSupplier />} />
        <Route path="/history" element={<History />} />
        <Route path="/itemdetail" element={<ItemDetail />} />
      </Routes>
    </Router>
  );
}