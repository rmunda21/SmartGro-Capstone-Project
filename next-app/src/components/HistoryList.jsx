import LineChart from "./LineChart";

const HistoryList = () => {
    
    const HumidityChartConfig = {
        type: "line",
        height: 240,
        width: "100%",
        series: [
          {
            name: "Humidity",
            data: [25, 30, 35],
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

    const AirPressureChartConfig = {
    type: "line",
    height: 240,
    width: "100%",
    series: [
        {
        name: "Air Pressure",
        data: [25, 30, 35],
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

    const TemperatureChartConfig = {
    type: "bar",
    height: 240,
    width: "100%",
    series: [
        {
        name: "Temperature",
        data: [25, 30, 35],
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
        colors: ["#f3f989"],
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

    const HeatIndexChartConfig = {
    type: "bar",
    height: 240,
    width: "100%",
    series: [
        {
        name: "Heat Index",
        data: [25, 30, 35],
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
        colors: ["#f45b56"],
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

    const SoilMoistureChartConfig = {
    type: "line",
    height: 240,
    width: "100%",
    series: [
        {
        name: "Soil Moisture",
        data: [25, 30, 35],
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
        colors: ["#e0823b"],
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
                <LineChart config={HumidityChartConfig} title={'Humidity(%)'} />
                <LineChart config={TemperatureChartConfig} title={'Temperature(°C)'} />
            </div>
            <div className="w-full flex flex-col">
                <LineChart config={AirPressureChartConfig} title={'Air Pressure(Pa)'} />
            </div>
            <div className="flex flex-row gap-5">
                <LineChart config={HeatIndexChartConfig} title={'Heat Index(°C)'} />
                <LineChart config={SoilMoistureChartConfig} title={'Soil Moisture(%)'} />
            </div>
        </div>
     );
}
 
export default HistoryList;