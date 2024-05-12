"use client";
import dynamic from "next/dynamic";
const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

const MeterGauge = ({ value }) => {
  return (
    <GaugeComponent
      value={value}
      type="radial"
      labels={{
        tickLabels: {
          type: "inner",
          ticks: [
            { value: 50 },
            { value: 100 },
            { value: 150 },
            { value: 200 },
            { value: 300 },
            { value: 500 },
          ],
        },
      }}
      arc={{
        // colorArray: ["#5BE12C", "#EA4228"],
        // nbSubArcs: 5,
        subArcs: [
          { limit: 50, color: "#2ad53f" },
          { limit: 100, color: "#d4ee11" },
          { limit: 150, color: "#edbe12" },
          { limit: 200, color: "#ff4800" },
          { limit: 300, color: "#fa0510" },
          { limit: 500, color: "#7a0755"},
        ],
        padding: 0.02,
        width: 0.3,
      }}
      pointer={{
        elastic: true,
        animationDelay: 0,
      }}
      maxValue={500}
    />
  );
};

export default MeterGauge;
