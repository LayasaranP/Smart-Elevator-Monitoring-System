import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import {
  DoorOpen,
  DoorClosed,
  MoveUp,
  MoveDown,
  Clock,
  Users,
} from "lucide-react";

const FloorDetails = () => {
  const [loadData, setLoadData] = useState({});
  const [energyData, setEnergyData] = useState({});
  const [directionData, setDirectionData] = useState({});
  const [floorData, setFloorData] = useState({});
  const [doorData, setDoorData] = useState({});

  useEffect(() => {
    const Socket = io("https://loadsensor.onrender.com");
    Socket.on("loadData", (data) => {
      setLoadData((prev) => ({ ...prev, [data.id]: data }));
    });
    return () => Socket.disconnect();
  }, []);

  useEffect(() => {
    const Socket = io("https://energy-sensor.onrender.com");
    Socket.on("energyData", (data) => {
      setEnergyData((prev) => ({ ...prev, [data.id]: data }));
    });
    return () => Socket.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = {};
      realTime_Floor_Data.forEach((floor) => {
        const dir = Math.random() > 0.5 ? "up" : "down";
        updated[floor.id] = dir;
      });
      setDirectionData(updated);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = {};
      realTime_Floor_Data.forEach((floor) => {
        const prev = floorData[floor.id]?.currentFloor ?? floor.currentFloor;
        const dir = directionData[floor.id] ?? floor.direction;
        const delta = parseFloat((Math.random() * 1.5).toFixed(2));
        const next = dir === "up" ? prev + delta : prev - delta;
        updated[floor.id] = {
          currentFloor: Math.max(0, Math.min(20, next)), 
        };
      });
      setFloorData(updated);
    }, 2000);
    return () => clearInterval(interval);
  }, [directionData, floorData]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = {};
      realTime_Floor_Data.forEach((floor) => {
        const current = doorData[floor.id]?.doorStatus ?? floor.doorStatus;
        updated[floor.id] = {
          doorStatus: current === "open" ? "closed" : "open",
        };
      });
      setDoorData(updated);
    }, 5000);
    return () => clearInterval(interval);
  }, [doorData]);

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
          const direction = directionData[floor.id] ?? floor.direction;
          const currentFloor = floorData[floor.id]?.currentFloor ?? floor.currentFloor;
          const doorStatus = doorData[floor.id]?.doorStatus ?? floor.doorStatus;
          const liveLoad = loadData[floor.id]?.load ?? floor.loadWeight;
          const loadRatio = liveLoad / floor.maxCapacity;
          const loadPercent = `${Math.min(100, (loadRatio * 100).toFixed(1))}%`;
          const energy = energyData[floor.id]?.energy;

          return (
            <div
              key={floor.id}
              className="bg-slate-700/50 border border-slate-600 p-5 rounded-xl shadow transition-transform duration-200 hover:scale-105 hover:z-10 relative"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{floor.id}</h2>
                <span className={`flex gap-2 text-sm font-medium ${getDoorColor(doorStatus)}`}>
                  {doorStatus === "open" ? (
                    <DoorOpen className="size-4 mt-1" />
                  ) : (
                    <DoorClosed className="size-4 mt-1" />
                  )}
                  {doorStatus}
                </span>
              </div>

              <div className="flex gap-2 mb-3">
                <span className="text-blue-400 text-base font-semibold">
                  Floor {currentFloor.toFixed(2)}
                </span>
                <span>
                  {direction === "up" ? (
                    <MoveUp className="size-3 mt-1.5" />
                  ) : (
                    <MoveDown className="size-3 mt-1.5" />
                  )}
                </span>
                <span className={`text-xs uppercase px-4 py-0.5 rounded-full border border-[#2a4365] bg-[#0f2a44] font-medium ${getDirectionColor(direction)}`}>
                  {direction}
                </span>
              </div>

              <div className="mb-3">
                <div className="flex justify-between mb-2">
                  <div className="flex gap-2 text-sm text-gray-300 mb-1">
                    <Users className="size-4 mt-1" />
                    <span>Load</span>
                  </div>
                  <div className={`text-xs mt-1 font-medium ${getLoadColor(loadRatio)}`}>
                    {liveLoad.toFixed(2)}kg / {floor.maxCapacity}kg
                  </div>
                </div>
                <div className="w-full bg-white h-2 rounded-sm overflow-hidden">
                  <div className="h-full bg-black" style={{ width: loadPercent }}></div>
                </div>
              </div>

              <div className="flex justify-between text-sm mt-2">
                <div className="text-yellow-300">
                  ⚡ Energy: {energy !== undefined ? `${energy}W` : "..."}
                </div>
                <div className="flex gap-2 text-green-400">
                  <Clock className="size-4 mt-1" />
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
