'use client'

import { Typography } from "@material-tailwind/react";
 
export function AboutFooter() {
  return (
    <footer className="w-full bg-white p-8 mt-auto">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <div className="flex flex-row items-center justify-center gap-2">
        <img src="/icons/logo-no-text.svg" alt="logo-ct" className="w-10" />
        <Typography color="blue-gray" className="text-center font-normal">
            &copy; 2024 SmartGro IOT
        </Typography>
      </div>
      
    </footer>
  );
}