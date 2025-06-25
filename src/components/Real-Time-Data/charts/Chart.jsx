import React from "react";
import EnergyChart from "./EnergyChart";
import LoadChart from "./LoadChart";
import TripChart from "./TripChart";

const Chart = () => {
  return (
    <div className="flex flex-col">
      <div className="max-h-screen p-5 flex justify-between">
        <EnergyChart />
        <LoadChart />
      </div>
      <div>
        <TripChart />
      </div>
    </div>
  );
};

export default Chart;
