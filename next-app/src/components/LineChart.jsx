'use client'
import { Card } from "flowbite-react";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
   
  // If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
  // import dynamic from "next/dynamic";
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
   
  
   
  export default function LineChart({title, config=chartConfig, values}) {
    config.series[0].data = values
    const chartConfig = {
      type: "line",
      height: 240,
      width: "100%",
      series: [
        {
          name: "Temperature",
          data: values,
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          show: "",
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#020617"],
        stroke: {
          lineCap: "round",
          curve: "smooth",
        },
        markers: {
          size: 0,
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
          categories: [
            "Mon",
            "Tue",
            "Wed",
            "Thr",
            "Fri",
            "Sat",
            "Sun",
          ],
        },
        yaxis: {
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
        },
        grid: {
          show: true,
          borderColor: "#dddddd",
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 5,
            right: 20,
          },
        },
        fill: {
          opacity: 0.8,
        },
        tooltip: {
          theme: "dark",
        },
      },
    };

    return (
      <Card className="w-[100%]">
        <h1 className="font-bold text-lg">{title}</h1>
        <Chart {...config} />
      </Card>
    );
  }