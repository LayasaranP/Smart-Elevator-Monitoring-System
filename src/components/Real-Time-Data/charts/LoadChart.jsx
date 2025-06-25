import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const LoadChart = () => {

  const [loadData, setLoadData] = useState([]);

  useEffect(() => {

    const Socket = io('https://loadsensor.onrender.com');

    Socket.on('loadData', (data) => {
      console.log('Load Data:', data);
      setLoadData(prev => [...prev.slice(-20), data]);
    });

    return () => {
      Socket.disconnect();
    };
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 border border-slate-600 rounded-lg p-3 shadow-lg">
          <p className="text-slate-300 text-sm">{`Time: ${label}`}</p>
          <p className="text-white font-medium">
            {`${payload[0].dataKey === 'energy' ? 'Energy' : 'Load'}: ${payload[0].value}${payload[0].dataKey === 'energy' ? ' kW' : ' kg'}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600 text-white w-173 p-8 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-white">Live Load Monitoring</h1>
        <p className="text-slate-300 mb-6 text-base">Real-time passenger weight distribution</p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={loadData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis 
                dataKey="timestamp" 
                stroke="#94a3b8" 
                fontSize={12}
                tickFormatter={(value) => value.split(' ')[0]}
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="load" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={false}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LoadChart;