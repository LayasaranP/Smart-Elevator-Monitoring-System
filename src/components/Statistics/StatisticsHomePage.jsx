import React from "react";
import ExportAnalytics from "./ExportAnalytics";
import { TrendingUp } from "lucide-react";
import AnalyticsMonitoring from "./AnalyticsMonitoring";
import DailyUsageChart from "./charts/DailyUsageChart";
import EnergyBreakdownChart from "./charts/EnergyBreakdownChart";
import Floor_Popularity from "./Floor_Popularity";
import Maintance from "./Maintance";

const Statistics_HomePage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between bg-slate-800/50 border border-slate-600 rounded-2xl p-6 shadow-md mx-4 my-2 text-white">
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <TrendingUp className="size-7 mt-2" />
            <h1 className="text-3xl font-bold">Usage Analytics & Statistics</h1>
          </div>
          <p className="text-lg text-slate-300">
            Comprehensive performance insights and usage trends
          </p>
        </div>
        <ExportAnalytics />
      </div>
      <AnalyticsMonitoring />
      <DailyUsageChart />
      <div className="flex justify-between m-4">
        <Floor_Popularity />
        <EnergyBreakdownChart />
      </div>
      <Maintance />
    </div>
  );
};

export default Statistics_HomePage;
