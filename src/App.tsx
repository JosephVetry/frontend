import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Supplier from './pages/Supplier'
import AddSupplier from './pages/AddSupplier'
import DetailTransaksi from './pages/DetailTransaksi'
import History from './pages/HistoryTransaction'
import ItemDetail from "./pages/itemDetail"
import HistoryDetail from "./pages/DetailHistory"
import Repayment from './pages/Repayment'
import EditSupplier from './pages/EditSupplier'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/addsupplier" element={<AddSupplier />} />
        <Route path="/repayment" element={<Repayment />} />
        <Route path="/history" element={<History />} />
        <Route path="/itemdetail" element={<ItemDetail />} />
        <Route path="/editsupplier/:supplierId" element={<EditSupplier />} />
        <Route path="/detailtransaksi/:supplierId" element={<DetailTransaksi />} />
        <Route path="/historydetail/:transactionId" element={<HistoryDetail />} />
      </Routes>
    </Router>
  );
}