"use client";

import { Sidebar } from "flowbite-react";
import {
  HiHome,
  HiDocument,
  HiUser,
  HiChartBar,
  HiInformationCircle
} from "react-icons/hi";

export function MySidebar() {
  return (
    <Sidebar aria-label="my-sidebar" className="w-96">
      <Sidebar.Logo className="text-slate-600" href="#" img="/icons/logo-no-text.svg" imgAlt="SmartGro logo">
        SmartGro
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/dashboard/home" icon={HiHome}>
            Home
          </Sidebar.Item>
          <Sidebar.Item
            href="/dashboard/live-readings"
            icon={HiChartBar}
          >
            Live Readings
          </Sidebar.Item>
          <Sidebar.Item href="/dashboard/history" icon={HiDocument}>
            History
          </Sidebar.Item>
          <Sidebar.Item href="/dashboard/about" icon={HiInformationCircle}>
            About
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
