import React from 'react'
import { Activity, Zap, Users, TrendingUp } from 'lucide-react';

const Monitoring = () => {
  return (
    <div className='flex text-white justify-evenly p-6 flex-wrap'>
        <div className='bg-slate-800/50 rounded-md shadow-md p-6 w-80 border border-slate-700 h-25 flex items-center'>
            <div><Activity  className="h-5 w-5 text-green-400" /></div>
            <div className='ml-4'> 
                <h1 className="text-lg text-green-300">Active Elevators</h1>
                <h1 className="text-2xl font-bold mt-2">3/4</h1>
            </div>
        </div>
        <div className='bg-slate-800/50 rounded-md shadow-md p-6 w-80 border border-slate-700 h-25 flex items-center'>
            <div><Users className="h-5 w-5 text-blue-400" /></div>
            <div className='ml-4'>
                <h1 className="text-lg text-blue-300">Daily Trips</h1>
                <h1 className="text-2xl font-bold mt-2">847</h1>
            </div>
        </div>
        <div className='bg-slate-800/50 rounded-md shadow-md p-6 w-80 border border-slate-700 h-25 flex items-center'>
            <div><Zap className="h-5 w-5 text-yellow-400" /></div>
            <div className='ml-4'>
                <h1 className="text-lg text-yellow-300">Energy Usage</h1>
                <h1 className="text-2xl font-bold mt-2">142 kW</h1>
            </div>
        </div>
        <div className='bg-slate-800/50 rounded-md shadow-md p-6 w-80 border border-slate-700 h-25 flex items-center'>
            <div><TrendingUp className="h-5 w-5 text-emerald-400" /></div>
            <div className='ml-4'>
                <h1 className="text-lg text-green-300">Efficiency</h1>
                <h1 className="text-2xl font-bold mt-2">94.2%</h1>
            </div>
        </div>
    </div>
  )
}

export default Monitoring
