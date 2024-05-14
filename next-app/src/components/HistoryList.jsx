'use client'

import { APIEndpoint } from "@/utils/api";
import { getStartAndEndOfWeek, getStartAndEndOfDay } from "@/utils/helper";
import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const HistoryList = () => {
  const { startOfDay, endOfDay } = getStartAndEndOfDay()

  const [humidityValues, setHumidityValues] = useState([])
  const [tempValues, setTempValues] = useState([])
  const [airQualityValues, setAirQualityValues] = useState([])
  const [heatIndexValues, setHeatIndexValues] = useState([])
  const [soilMoistureValues, setSoilMoistureValues] = useState([])

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = () => {
    const historyAPI = new APIEndpoint();
    historyAPI.get(`graph/${startOfDay}/${endOfDay}/Humidity`)
      .then((res) => {
        if (res.data) {
          const values = res.data.map(obj => Number(obj.value.toFixed(2)));
          setHumidityValues(values)
          console.log(values)
        }
      })
      .catch(err => console.log(err));
      historyAPI.get(`graph/${startOfDay}/${endOfDay}/Temperature`)
      .then((res) => {
        if (res.data) {
          const values = res.data.map(obj => Number(obj.value.toFixed(2)));
          setTempValues(values)
          console.log(values)
        }
      })
      .catch(err => console.log(err));
      historyAPI.get(`graph/${startOfDay}/${endOfDay}/AirQuality`)
      .then((res) => {
        if (res.data) {
          const values = res.data.map(obj => Number(obj.value.toFixed(2)));
          setAirQualityValues(values)
          console.log(values)
        }
      })
      .catch(err => console.log(err));
      historyAPI.get(`graph/${startOfDay}/${endOfDay}/HeatIndex`)
      .then((res) => {
        if (res.data) {
          const values = res.data.map(obj => Number(obj.value.toFixed(2)));
          setHeatIndexValues(values)
          console.log(values)
        }
      })
      .catch(err => console.log(err));
      historyAPI.get(`graph/${startOfDay}/${endOfDay}/SoilMoisture`)
      .then((res) => {
        if (res.data) {
          const values = res.data.map(obj => Number(obj.value.toFixed(2)));
          setSoilMoistureValues(values)
          console.log(values)
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-row gap-5">
        <LineChart values={humidityValues ? humidityValues : []} title={'Humidity(%)'} />
        <LineChart values={tempValues ? tempValues : []} title={'Temperature(°C)'} />
      </div>
      <div className="flex flex-row">
        <LineChart values={airQualityValues ? airQualityValues : []} title={'Air Quality(VOC)'} />
      </div>
      <div className="flex flex-row gap-5">
        <LineChart values={heatIndexValues ? heatIndexValues : []} title={'Heat Index(°C)'} />
        <LineChart values={soilMoistureValues ? soilMoistureValues : []} title={'Soil Mositure(%)'} />
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
            data: values.length > 0 ? values : new Array(24).fill(0),
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
    </Card>
  );
}

export default HistoryList;