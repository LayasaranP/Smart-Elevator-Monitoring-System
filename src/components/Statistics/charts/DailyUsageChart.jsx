import React, { useState } from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const UsagePatternsChart = () => {
  const [activeView, setActiveView] = useState('Daily')

  const dailyData = [
    { time: '06:00', value: 300 },
    { time: '07:00', value: 450 },
    { time: '08:00', value: 720 },
    { time: '09:00', value: 950 },
    { time: '10:00', value: 780 },
    { time: '11:00', value: 650 },
    { time: '12:00', value: 1100 },
    { time: '13:00', value: 1050 },
    { time: '14:00', value: 850 },
    { time: '15:00', value: 680 },
    { time: '16:00', value: 720 },
    { time: '17:00', value: 950 },
    { time: '18:00', value: 880 },
    { time: '19:00', value: 650 },
    { time: '20:00', value: 480 },
    { time: '21:00', value: 320 }
  ]

  const weeklyData = [
    { day: 'Mon', value: 1250 },
    { day: 'Tue', value: 1180 },
    { day: 'Wed', value: 1350 },
    { day: 'Thu', value: 1320 },
    { day: 'Fri', value: 1480 },
    { day: 'Sat', value: 890 },
    { day: 'Sun', value: 750 }
  ]

  const monthlyData = [
    { month: 'Jan', value: 28500 },
    { month: 'Feb', value: 26200 },
    { month: 'Mar', value: 31800 },
    { month: 'Apr', value: 29600 },
    { month: 'May', value: 33200 },
    { month: 'Jun', value: 35100 },
    { month: 'Jul', value: 32900 },
    { month: 'Aug', value: 30400 },
    { month: 'Sep', value: 28800 },
    { month: 'Oct', value: 31500 },
    { month: 'Nov', value: 29200 },
    { month: 'Dec', value: 27600 }
  ]

  const Daily = () => (
    <div className="h-80 w-full shadow-2xl">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="dailyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            domain={[0, 1200]}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#10b981" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#dailyGradient)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )

  const Weekly = () => (
    <div className="h-80 w-full shadow-2xl">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="weeklyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.6}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 14 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            domain={[0, 1600]}
          />
          <Bar 
            dataKey="value" 
            fill="url(#weeklyGradient)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )

  const Monthly = () => (
    <div className="h-80 w-full shadow-2xl">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="monthlyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.6}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickFormatter={(value) => `${value / 1000}k`}
            domain={[0, 40000]}
          />
          <Bar 
            dataKey="value" 
            fill="url(#monthlyGradient)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )

  const renderChart = () => {
    switch(activeView) {
      case 'Weekly':
        return <Weekly />
      case 'Monthly':
        return <Monthly />
      default:
        return <Daily />
    }
  }

  return (
    <div className='flex flex-col gap-2 bg-slate-800/50 border border-slate-600 m-3 rounded-xl p-6'>
      <h1 className='text-white text-2xl font-medium'>Usage Patterns</h1>
      <p className='text-slate-300 text-sm'>Traffic patterns and peak usage analysis</p>
      
      <div className='flex gap-1 bg-slate-700/50 p-1 text-slate-400 rounded-lg my-4 w-fit'>
        {['Daily', 'Weekly', 'Monthly'].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              activeView === view 
                ? 'bg-white text-slate-900 font-medium' 
                : 'hover:text-white hover:bg-slate-600/50'
            }`}
          >
            {view}
          </button>
        ))}
      </div>
      
      {renderChart()}
    </div>
  )
}

export default UsagePatternsChart