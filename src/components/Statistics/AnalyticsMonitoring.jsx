import React from "react";
import { Users, Zap, Clock, TrendingUp } from "lucide-react";

const AnalyticsMonitoring = () => {
  return (
    <div className="flex gap-3 justify-between m-3">
      <div className="flex gap-4 border border-slate-600 bg-slate-800/50 text-white p-4 rounded-2xl w-full">
        <Users className="size-8 my-5 text-blue-500" />
        <div>
          <h1 className="text-xl">Total Trips Today</h1>
          <p className="text-lg">1,247</p>
          <p className="text-green-500">+12% from yesterday</p>
        </div>
      </div>
      <div className="flex gap-4 border border-slate-600 bg-slate-800/50 text-white p-4 rounded-2xl w-full">
        <Zap className="size-8 my-5 text-yellow-500" />
        <div>
          <h1 className="text-xl">Energy Usage</h1>
          <p className="text-lg">2.8 MWh</p>
          <p className="text-red-500">-5% from last week</p>
        </div>
      </div>
      <div className="flex gap-4 border border-slate-600 bg-slate-800/50 text-white p-4 rounded-2xl w-full">
        <Clock className="size-8 my-5 text-green-500" />
        <div>
          <h1 className="text-xl">Average Wait Time</h1>
          <p className="text-lg">3 mins</p>
          <p className="text-green-500">+1 min from last week</p>
        </div>
      </div>
      <div className="flex gap-4 border border-slate-600 bg-slate-800/50 text-white p-4 rounded-2xl w-full">
        <TrendingUp className="size-8 my-5 text-violet-500" />
        <div>
          <h1 className="text-xl">Efficiency</h1>
          <p className="text-lg">94.2%</p>
          <p className="text-green-500">+2.1% this month</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsMonitoring;
