import React, { useState } from 'react'
import Login from './login.jsx'
import Sign_Up from './Sign_Up.jsx'
import { X } from 'lucide-react'

const Auth = ({ onClose }) => {
  const [isActive, setIsActive] = useState('login')

  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50'>
      <div className='border border-slate-900 bg-slate-800 w-[28rem] text-white p-5 rounded-xl shadow-lg'>
        <div className='flex justify-between items-start'>
          <div>
            <h1 className='text-lg font-bold'>Authentication</h1>
            <p className='text-sm'>Login or create an account to access the elevator monitoring system</p>
          </div>
          <button onClick={onClose} className='text-white hover:text-red-400'>
            <X />
          </button>
        </div>

        <div className='authNavigation flex justify-around mt-4 bg-slate-700 rounded-md p-1'>
          <button
            onClick={() => setIsActive('login')}
            className={`flex-1 py-2 px-4 rounded-md ${isActive === 'login' ? 'bg-blue-600' : 'bg-transparent'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsActive('signup')}
            className={`flex-1 py-2 px-4 rounded-md ${isActive === 'signup' ? 'bg-blue-600' : 'bg-transparent'}`}
          >
            Sign Up
          </button>
        </div>

        <div className="mt-4">
          {isActive === 'login' && <Login onClose={onClose} />}
          {isActive === 'signup' && <Sign_Up onClose={onClose} />}
        </div>
      </div>
    </div>
  );
};

export default Auth;