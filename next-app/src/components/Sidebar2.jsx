'use client'

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
    PowerIcon
  } from "@heroicons/react/24/solid";
  import Link from 'next/link'
   
  export function DefaultSidebar() {
    return (
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            SmartGro
          </Typography>
        </div>
        <List>
          <ListItem>
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link href={"/dashboard/home"}>Home</Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <TableCellsIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link href={"/dashboard/live-readings"}>Live Readings</Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <ChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link href={"/dashboard/history"}>History</Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <InformationCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link href={"/dashboard/about"}>About</Link>
          </ListItem>
          {/* <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem> */}
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    );
  }