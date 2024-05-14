'use client'

import { APIEndpoint } from "@/utils/api";
import LineChart from "./LineChart";
import { getStartAndEndOfWeek } from "@/utils/helper";
import { useEffect, useState } from "react";

const initialHumidityChartConfig = {
  type: "line",
  height: 240,
  width: "100%",
  series: [
    {
      name: "Humidity",
      data: [],
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
    colors: ["#1ecbe1"],
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

const HistoryList = () => {
  const { startOfWeek, endOfWeek } = getStartAndEndOfWeek();

  const [humidityConfig, setHumidityConfig] = useState(initialHumidityChartConfig);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    console.log("Humidity config updated:", humidityConfig);
  }, [humidityConfig]);

  const fetchHistory = () => {
    const historyAPI = new APIEndpoint();
    historyAPI.get(`graph/${startOfWeek}/${endOfWeek}/Humidity`)
      .then((res) => {
        if (res.data) {
          const values = res.data.map(obj => Number(obj.value.toFixed(2)));
          console.log("Fetched values:", values); // Debugging log
          
          setHumidityConfig(prevConfig => {
            const newConfig = {
              ...prevConfig,
              series: [{ ...prevConfig.series[0], data: values }]
            };
            console.log("Updated config:", newConfig); // Debugging log
            return newConfig;
          });
        }
      })
      .catch(err => console.log(err));
  };

  const otherChartConfig = {
    type: "line",
    height: 240,
    width: "100%",
    series: [
      {
        name: "Air Quality",
        data: [0, 50, 100, 150, 200, 300, 500],
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
      colors: ["#84e1a0"],
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
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-row gap-5">
        <LineChart key={JSON.stringify(humidityConfig.series[0].data)} config={humidityConfig} title={'Humidity(%)'} />
        <LineChart config={otherChartConfig} title={'Temperature(°C)'} />
      </div>
      <div className="w-full flex flex-col">
        <LineChart config={otherChartConfig} title={'Air Quality(VOC)'} />
      </div>
      <div className="flex flex-row gap-5">
        <LineChart config={otherChartConfig} title={'Heat Index(°C)'} />
        <LineChart config={otherChartConfig} title={'Soil Moisture(%)'} />
      </div>
    </div>
  );
};

export default HistoryList;
