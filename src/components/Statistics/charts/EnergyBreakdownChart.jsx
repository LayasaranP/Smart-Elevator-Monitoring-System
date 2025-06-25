import React from 'react'
import { Zap } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const EnergyBreakdownChart = () => {
  const data = [
    { name: 'Motor Operation', value: 45, color: '#3b82f6' },
    { name: 'Lighting', value: 20, color: '#10b981' },
    { name: 'HVAC', value: 15, color: '#f59e0b' },
    { name: 'Safety Systems', value: 12, color: '#8b5cf6' },
    { name: 'Controls', value: 8, color: '#ef4444' }
  ]

  const legendItems = [
    { name: 'Motor Operation', percentage: '45%', color: '#3b82f6' },
    { name: 'Lighting', percentage: '20%', color: '#10b981' },
    { name: 'HVAC', percentage: '15%', color: '#f59e0b' },
    { name: 'Safety Systems', percentage: '12%', color: '#8b5cf6' },
    { name: 'Controls', percentage: '8%', color: '#ef4444' }
  ]

  return (
    <div className='bg-slate-800/50 border border-slate-600 rounded-xl p-6 text-white w-180 shadow-2xl'>
      <div className='flex items-center gap-2 mb-2'>
        <Zap className='size-5 text-white' />
        <h1 className='text-2xl font-medium'>Energy Breakdown</h1>
      </div>
      <p className='text-slate-300 text-sm mb-8'>Energy consumption by system components</p>
      
      <div className='flex flex-col items-center'>

        <div className='w-80 h-80 mb-8'>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={140}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className='grid grid-cols-2 gap-x-12 gap-y-3 w-full max-w-md'>
          {legendItems.map((item, index) => (
            <div key={index} className='flex items-center gap-3'>
              <div 
                className='w-3 h-3 rounded-full flex-shrink-0'
                style={{ backgroundColor: item.color }}
              />
              <span className='text-slate-300 text-sm flex-1'>{item.name}</span>
              <span className='text-white font-medium text-sm'>{item.percentage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EnergyBreakdownChart