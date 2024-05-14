'use client'

import { APIEndpoint } from "@/utils/api";
import { getStartAndEndOfWeek, getStartAndEndOfDay } from "@/utils/helper";
import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const HistoryList = () => {
  const { startOfWeek, endOfWeek } = getStartAndEndOfWeek();
  const { startOfDay, endOfDay } = getStartAndEndOfDay();
  const [humidityValues, setHumidityValues] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    console.log("Humidity", humidityValues)
  }, [humidityValues]);

  const fetchHistory = () => {
    const historyAPI = new APIEndpoint();
    historyAPI.get(`graph/${startOfDay}/${startOfDay+4000}/Humidity`)
      .then((res) => {
        // if (res.data) {
        //   // console.log(res.data)
         
        // }
        console.log(res.data)
        const values = res.data.map(obj => Number(obj.value.toFixed(2)));
        setHumidityValues(values);
        console.log(humidityValues)
        
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-row gap-5">
        <LineChart startOfDay= {startOfDay} endOfDay= {endOfDay} values={humidityValues} title={'Humidity(%)'} key={humidityValues.map((v,index)=>index)} />
      </div>
    </div>
  );
};

const LineChart = ({ title, values, startOfDay, endOfDay}) => {
  console.log("Values:", values)
 

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
            categories: [startOfDay,startOfDay+4000]
            // Array.from({ length: 24 }, (_, i) => `${i}:00`),
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

    </Card>
  );
}

export default HistoryList;
