import React from "react";
import GaugeComponent from "react-gauge-component";
const GaugeChart = ({ setValue }) => {
  return (
    <div className="font-sans  w-full flex items-center justify-center ">
      <GaugeComponent
        arc={{
          subArcs: [
            {
              limit: 20,
              color: "#EA4228",
              showTick: true,
            },
            {
              limit: 40,
              color: "#F58B19",
              showTick: true,
            },
            {
              limit: 60,
              color: "#F5CD19",
              showTick: true,
            },
            {
              limit: 100,
              color: "#5BE12C",
              showTick: true,
            },
          ],
        }}
        value={setValue}
      />
    </div>
  );
};

export default GaugeChart;
