"use client";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  TableCellsIcon,
  InformationCircleIcon,
  ChartBarIcon,
  HomeIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { APIEndpoint } from "@/utils/api";
import { useRouter } from "next/navigation";

export function DefaultSidebar() {
  const router = useRouter();

  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          SmartGro
        </Typography>
      </div>
      <List>
        <Link href={"/dashboard/home"}>
          <ListItem>
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5" />
            </ListItemPrefix>
            Home
          </ListItem>
        </Link>
        <Link href={"/dashboard/live-readings"}>
          <ListItem>
            <ListItemPrefix>
              <TableCellsIcon className="h-5 w-5" />
            </ListItemPrefix>
            Live Readings
          </ListItem>
        </Link>
        <Link href={"/dashboard/history"}>
          <ListItem>
            <ListItemPrefix>
              <ChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            History
          </ListItem>
        </Link>
        <Link href={"/dashboard/about"}>
          <ListItem>
            <ListItemPrefix>
              <InformationCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            About
          </ListItem>
        </Link>
        {/* <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem> */}
        <ListItem
          onClick={() => {
            const logoutAPI = new APIEndpoint();
            logoutAPI
              .post("logout/")
              .then((res) => {
                console.log(res);
                router.push("/sign-in");
              })
              .catch((err) => console.log(err));
          }}
        >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
