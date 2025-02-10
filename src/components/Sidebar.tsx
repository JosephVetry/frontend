
"use client";
import { Link } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiOutlineClipboardList, HiUser } from "react-icons/hi";

export default function Component() {
  return (
  <aside className="w-48 max-w-48 overflow-hidden fixed top-16 left-0 h-full bg-gray-100 shadow-md">
      <Sidebar aria-label="Sidebar with logo branding example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item as={Link} to="/dashboard" icon={HiChartPie}>Pharmacy Items</Sidebar.Item>
            <Sidebar.Item as={Link} to="/supplier" icon={HiUser}>Supplier</Sidebar.Item>
            <Sidebar.Item as={Link} to="/history" icon={HiOutlineClipboardList}>Transaction History</Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
  </aside>
  );
}
