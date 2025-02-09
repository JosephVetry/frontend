import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Supplier from './pages/Supplier'
import DetailTable from './pages/DetailTable'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/itemdetail" element={<DetailTable />} />
      </Routes>
    </Router>
  );
}