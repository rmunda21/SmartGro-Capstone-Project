'use client'
import { Card } from "flowbite-react";
import dynamic from "next/dynamic";

// Dynamic import for react-apexcharts to support SSR in Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function LineChart({ title, config }) {
  return (
    <Card className="w-[100%]">
      <h1 className="font-bold text-lg">{title}</h1>
      <Chart {...config} />
    </Card>
  );
}
