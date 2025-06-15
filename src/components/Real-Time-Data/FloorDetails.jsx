import React from "react";
import {
  DoorOpen,
  DoorClosed,
  MoveUp,
  MoveDown,
  Clock,
  Users,
} from "lucide-react";

const FloorDetails = () => {
  const realTime_Floor_Data = [
    {
      id: "ELV-001",
      currentFloor: 11.44,
      direction: "down",
      doorStatus: "open",
      loadWeight: 885.4,
      maxCapacity: 1000,
      energyUsage: 81.64,
      tripsToday: 247,
      lastMaintenance: "6 days ago",
    },
    {
      id: "ELV-002",
      currentFloor: 12.98,
      direction: "up",
      doorStatus: "closed",
      loadWeight: 638.57,
      maxCapacity: 1000,
      energyUsage: 62.5,
      tripsToday: 189,
      lastMaintenance: "3 days ago",
    },
    {
      id: "ELV-003",
      currentFloor: 7.92,
      direction: "up",
      doorStatus: "open",
      loadWeight: 215.08,
      maxCapacity: 1000,
      energyUsage: 126.32,
      tripsToday: 156,
      lastMaintenance: "1 day ago",
    },
    {
      id: "ELV-004",
      currentFloor: 6.61,
      direction: "up",
      doorStatus: "closed",
      loadWeight: 457.1,
      maxCapacity: 1500,
      energyUsage: 74.32,
      tripsToday: 203,
      lastMaintenance: "4 days ago",
    },
  ];

  const getLoadColor = (ratio) => {
    if (ratio > 0.8) return "text-red-400";
    if (ratio > 0.5) return "text-yellow-400";
    return "text-green-400";
  };

  const getDoorColor = (status) => {
    return status === "open" ? "text-green-400" : "text-red-400";
  };

  const getDirectionColor = (dir) => {
    return dir === "up" ? "text-green-400" : "text-blue-400";
  };

  return (
    <div className="bg-transparent max-h-screen text-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {realTime_Floor_Data.map((floor) => {
          const loadRatio = floor.loadWeight / floor.maxCapacity;
          const loadPercent = `${Math.min(100, (loadRatio * 100).toFixed(1))}%`;
          return (
            <div
              key={floor.id}
              className="bg-slate-700/50 border border-[#415a77] p-5 rounded-xl shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{floor.id}</h2>
                <span
                  className={`flex gap-2 text-sm font-medium ${getDoorColor(
                    floor.doorStatus
                  )}`}
                >
                  {floor.doorStatus === "open" ? (
                    <DoorOpen className="size-4 mt-1" />
                  ) : (
                    <DoorClosed className="size-4 mt-1" />
                  )}
                  {floor.doorStatus}
                </span>
              </div>

              <div className="flex gap-2 mb-3">
                <span className="text-blue-400 text-base font-semibold">
                  Floor {floor.currentFloor.toFixed(10)}
                </span>
                <span>{floor.direction === "up"? <MoveUp className="size-3 mt-1.5" /> : <MoveDown className="size-3 mt-1.5" />}</span>
                <span
                  className={`text-xs uppercase px-4 py-0.5 rounded-full border border-[#2a4365] bg-[#0f2a44] inline-block font-medium ${getDirectionColor(
                    floor.direction
                  )}`}
                >
                    {floor.direction}
                </span>
              </div>

              <div className="mb-3">
                <div className="flex justify-between mb-2">
                  <div className="flex gap-2 text-sm text-gray-300 mb-1">
                    <Users className="size-4 mt-1" />
                    <span>Load</span></div>
                  <div
                    className={`text-xs mt-1 font-medium ${getLoadColor(
                      loadRatio
                    )}`}
                  >
                    {floor.loadWeight.toFixed(6)}kg / {floor.maxCapacity}kg
                  </div>
                </div>
                <div className="w-full bg-white h-2 rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-black"
                    style={{ width: loadPercent }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between text-sm mt-2">
                <div className="text-yellow-300">
                  ⚡ Energy: {floor.energyUsage.toFixed(6)}W
                </div>
                <div className="flex gap-2 text-green-400">
                    <Clock className="size-4 mt-1"/>
                   Trips: {floor.tripsToday}
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-3 border-t border-[#415a77] pt-2">
                Last maintenance: {floor.lastMaintenance}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FloorDetails;
