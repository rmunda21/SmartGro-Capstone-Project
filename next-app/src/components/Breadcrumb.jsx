"use client";

import { Breadcrumb } from "flowbite-react";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";

export function MyBreadcrumb() {

    const pathname = usePathname()
    const pathsList = pathname.trim().split('/')
    const paths = pathsList.filter(path=>path !== '')

    function formatString(inputString) {
        let words = inputString.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));
        let formattedString = words.join(' ');
        return formattedString;
    }

  return (
    <Breadcrumb aria-label="my-breadcrumb">
      {paths.map((path, index)=>(
        <Breadcrumb.Item icon={path === 'dashboard' && HiHome} key={path} href={`/${path === 'dashboard' ? 'dashboard/home' : `dashboard/${path}`}`}>{formatString(path)}</Breadcrumb.Item>
        ))}
    </Breadcrumb>
  );
}