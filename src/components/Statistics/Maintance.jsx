import React from "react";
import { TriangleAlert } from 'lucide-react';

const Maintance = () => {
  const maintenanceData = [
    {
      component: "Motor",
      lastService: "2024-01-15",
      nextDue: "2024-04-15",
      status: "Good",
      dotColor: "bg-blue-400",
    },
    {
      component: "Brake System",
      lastService: "2024-02-01",
      nextDue: "2024-05-01",
      status: "Excellent",
      dotColor: "bg-green-400",
    },
    {
      component: "Door Mechanism",
      lastService: "2024-01-28",
      nextDue: "2024-04-28",
      status: "Warning",
      dotColor: "bg-yellow-400",
    },
    {
      component: "Safety Sensors",
      lastService: "2024-02-10",
      nextDue: "2024-05-10",
      status: "Good",
      dotColor: "bg-blue-400",
    },
    {
      component: "Power Supply",
      lastService: "2024-01-20",
      nextDue: "2024-07-20",
      status: "Excellent",
      dotColor: "bg-green-400",
    },
  ];

  const statusColor = {
    Excellent: "border border-green-500 text-green-300",
    Good: "border border-blue-500 text-blue-300",
    Warning: "border border-yellow-400 text-yellow-300",
  };

  return (
    <div className="bg-slate-800/50 border border-slate-600 p-6 rounded-xl m-3 shadow-2xl">
      <div className="flex gap-2 text-white items-center mb-1">
        <TriangleAlert className="size-5" />
        <h1 className="text-2xl font-medium">Maintenance Schedule & Alerts</h1>
      </div>
      <p className="text-white mb-4">Predictive maintenance timeline and component health</p>

      {maintenanceData.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center text-white bg-slate-700/50 p-4 rounded-lg my-3"
        >
          <div className="flex items-start gap-3">
            <div className={`w-3 h-3 rounded-full mt-4 ${item.dotColor}`} />
            <div className="flex flex-col">
              <h2 className="font-medium">{item.component}</h2>
              <p className="text-sm text-slate-300">Last service: {item.lastService}</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div
              className={`text-sm px-2 py-0.5 rounded-xl w-fit text-center ${statusColor[item.status]}`}
            >
              {item.status}
            </div>
            <p className="text-sm text-slate-300">Next: {item.nextDue}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Maintance;
