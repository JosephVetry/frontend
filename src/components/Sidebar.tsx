
"use client";
import { Link } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiOutlineClipboardList, HiUser, HiOutlineClipboardCheck } from "react-icons/hi";

export default function Component() {
  return (
  <aside className="w-48 max-w-48 overflow-hidden fixed top-16 left-0 h-full bg-gray-100 shadow-md">
      <Sidebar aria-label="SideRepaymentTransactionbar with logo branding example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
          <Sidebar.Item as={Link} to="/dashboard" icon={HiChartPie} className="text-sm space-x-0">
              Data Barang
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/supplier" icon={HiUser} className="text-sm space-x-0">
              Supplier
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/repayment" icon={HiOutlineClipboardList} className="text-sm space-x-0">
              Data Hutang
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/history" icon={HiOutlineClipboardCheck} className="text-sm space-x-0">
              Data Transaksi
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
  </aside>
  );
}
