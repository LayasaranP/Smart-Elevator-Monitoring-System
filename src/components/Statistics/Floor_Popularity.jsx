import React from 'react'
import { MapPin } from 'lucide-react'

const floorPopularityData = [
  { floor: 'Ground', percentage: 85, visits: 340 },
  { floor: '1st', percentage: 70, visits: 280 },
  { floor: '2nd', percentage: 50, visits: 200 },
  { floor: '3rd', percentage: 30, visits: 120 },
  { floor: '4th', percentage: 20, visits: 80 },
  { floor: '5th', percentage: 10, visits: 40 },
  { floor: '6th+', percentage: 5, visits: 20 },
]

const Floor_Popularity = () => {
  return (
    <div className='bg-slate-800/50 border border-slate-600 text-white p-6 rounded-xl w-165 h-120 shadow-2xl'>
      <div className='flex gap-2 items-center mb-2'>
        <MapPin className='size-5' />
        <h1 className='text-2xl font-medium'>Floor Popularity</h1>
      </div>
      <p className='text-slate-300 mb-6'>
        Most visited floors and traffic distribution
      </p>

      <div className="space-y-4">
        {floorPopularityData.map((floor, index) => (
          <div key={floor.floor} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                {index + 1}
              </div>
              <span className="text-white font-medium">{floor.floor}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-32 bg-slate-700 rounded-full h-2">
                <div
                  className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${floor.percentage}%` }}
                />
              </div>
              <span className="text-slate-300 text-sm w-12 text-right">
                {floor.percentage}%
              </span>
              <span className="text-slate-400 text-sm w-16 text-right">
                {floor.visits}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Floor_Popularity
