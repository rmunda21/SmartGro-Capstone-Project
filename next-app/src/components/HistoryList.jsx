'use client'

import { APIEndpoint } from "@/utils/api";
import { getStartAndEndOfWeek, getStartAndEndOfDay } from "@/utils/helper";
import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const HistoryList = () => {
  const { startOfWeek, endOfWeek } = getStartAndEndOfWeek();
  const { startOfDay, endOfDay } = getStartAndEndOfDay()
  const [humidityValues, setHumidityValues] = useState([])

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = () => {
    const historyAPI = new APIEndpoint();
    historyAPI.get(`graph/${startOfDay}/${endOfDay}/Humidity`)
      .then((res) => {
        if (res.data) {
          const values = res.data.map(obj => Number(obj.value.toFixed(2)));
          setHumidityValues([10,20,30,40,50,60,70])
          console.log(values)
        }
        
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-row gap-5">
        <LineChart values={humidityValues ? humidityValues : []} title={'Humidity(%)'} />
      </div>
    </div>
  );
};

const LineChart = ({ title, values }) => {
  return (
    <Card className="w-[100%]">
      <h1 className="font-bold text-lg">{title}</h1>
      <Chart
        type={"line"}
        height={240}
        width={"100%"}
        series={[
          {
            name: {title},
            data: values,
          },
        ]}
        options= {{
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
            categories: ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"],
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
          }
        }}
      />
      {/* <Chart key={JSON.stringify(config.series[0].data)} {...config} /> */}
    </Card>
  );
}

export default HistoryList;