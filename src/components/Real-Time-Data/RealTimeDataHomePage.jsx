import React from 'react'
import { MapPin } from 'lucide-react'
import FloorDetails from './FloorDetails'
import LoadChart from './charts/LoadChart'
import Chart from './charts/Chart'

const Real_time_Data_HomePage = () => {
  return (
    <div>
      <div className='border border-slate-600 bg-slate-800/50 p-3 mx-5 my-2 rounded-2xl'>
      <div className='text-white mx-5'>
        <div className='flex gap-3'>
          <MapPin className='mt-2' />
          <h1 className='text-3xl'>Live Elevator Status</h1>
        </div>
        <p>Real-time monitoring of all elevator units</p>
      </div>
      <FloorDetails />
    </div>
    <Chart />
    </div>
  )
}

export default Real_time_Data_HomePage
