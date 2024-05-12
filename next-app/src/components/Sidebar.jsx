"use client";

import { Sidebar } from "flowbite-react";
import {
  HiHome,
  HiDocument,
  HiUser,
  HiChartBar,
  HiInformationCircle
} from "react-icons/hi";

const customTheme = {
  "root": {
    "inner": "h-full overflow-y-auto overflow-x-hidden rounded bg-green-50 px-3 py-4 dark:bg-gray-800 border"
  },
};

export function MySidebar() {
  return (
    <Sidebar aria-label="my-sidebar" className="w-80" theme={customTheme}>
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
