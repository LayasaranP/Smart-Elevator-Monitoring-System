import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Helpers to generate random elevation and activity
const getRandomElevation = () => Math.floor(Math.random() * 5000 + 1000);
const getRandomActivity = () => {
  const activities = [
    "Start Hiking",
    "Mountain Trail",
    "Summit Approach",
    "Peak Summit",
    "Descent",
    "Base Camp",
    "Forest Trek",
    "Ridge Walk",
  ];
  return activities[Math.floor(Math.random() * activities.length)];
};

// Static time points
const times = ["08:00", "10:30", "13:15", "15:45", "17:30", "19:00"];

// Generate new random dataset
const generateRandomData = () => {
  return times.map((time) => ({
    time,
    timestamp: `2024-06-23T${time}:00`,
    elevation: getRandomElevation(),
    activity: getRandomActivity(),
  }));
};

const TripActivityTimeline = () => {
  const [data, setData] = useState(generateRandomData());
  const [currentTime, setCurrentTime] = useState(
    times[Math.floor(Math.random() * times.length)]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData());
      setCurrentTime(times[Math.floor(Math.random() * times.length)]);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const currentItem = data.find((item) => item.time === currentTime);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="text-gray-800 font-medium">{`Time: ${label}`}</p>
          <p className="text-purple-600 font-semibold">
            {`Elevation: ${payload[0].value.toLocaleString()} ft`}
          </p>
          <p className="text-gray-600 text-sm">
            {`Activity: ${payload[0].payload.activity}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 h-full border border-slate-600 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            Trip Activity Timeline
          </h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-gray-300 text-sm">Normal Activity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-gray-300 text-sm">Current Time</span>
            </div>
          </div>
        </div>

        {/* Current Activity Display */}
        <div className="mb-4 p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Current Activity
              </h3>
              <p className="text-purple-300 text-sm">
                {currentItem?.activity || "No current activity"}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {currentItem?.elevation?.toLocaleString() || "0"} ft
              </div>
              <div className="text-sm text-gray-300">at {currentTime}</div>
            </div>
          </div>
        </div>

        <div className="h-[400px]">
          {data.length > 0 && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60,
                }}
                barCategoryGap="20%"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="time"
                  stroke="#9CA3AF"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  interval={0}
                />
                <YAxis
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000).toFixed(1)}k ft`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="elevation"
                  radius={[4, 4, 0, 0]}
                  stroke="#6366F1"
                  strokeWidth={1}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.time === currentTime ? "#F59E0B" : "#8B5CF6"}
                      stroke={
                        entry.time === currentTime ? "#F59E0B" : "#6366F1"
                      }
                      strokeWidth={entry.time === currentTime ? 2 : 1}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Activity details */}
        <div className="mt-4 flex flex-wrap gap-2">
          {data.map((item, index) => (
            <div
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${
                item.time === currentTime
                  ? "bg-yellow-500 text-black border-yellow-400 font-bold shadow-lg"
                  : "bg-purple-600/20 text-purple-300 border-purple-500/30"
              }`}
            >
              {item.time} - {item.activity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripActivityTimeline;
