
"use client";

import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

export default function Component() {
  return (
    <aside className="w-48 max-w-48 overflow-hidden fixed top-16 left-0 h-full bg-gray-100 shadow-md">
  <Sidebar aria-label="Sidebar with logo branding example">
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Sidebar.Item href="#" icon={HiChartPie}>Dashboard</Sidebar.Item>
        <Sidebar.Item href="#" icon={HiViewBoards}>Kanban</Sidebar.Item>
        <Sidebar.Item href="#" icon={HiInbox}>Inbox</Sidebar.Item>
        <Sidebar.Item href="#" icon={HiUser}>Users</Sidebar.Item>
        <Sidebar.Item href="#" icon={HiShoppingBag}>Products</Sidebar.Item>
        <Sidebar.Item href="#" icon={HiArrowSmRight}>Sign In</Sidebar.Item>
        <Sidebar.Item href="#" icon={HiTable}>Sign Up</Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
</aside>

  );
}
