import React, { useState } from 'react'
import { UserPlus, ChevronDown, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form' 
import axios from 'axios'
import { getUserName } from '../../../store/UserSlice.js'
import { useDispatch } from 'react-redux'

const Sign_Up = ({ onClose }) => {

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        "https://rmzc2hh8yd.execute-api.ap-southeast-2.amazonaws.com/signup/signup",
        data
      );
      const userData = response.data;
      dispatch(getUserName(userData.user.name));
      if (onClose) {
        onClose()
      }
    } catch (error) {
      console.error(
        "Signup failed:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false)
      reset();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} method='POST' className='flex flex-col gap-2 bg-slate-700/90 rounded-xl shadow-lg border border-slate-800 text-white mt-5 p-5'>
      <div className='flex items-center mb-4'>
        <UserPlus className='mr-2' />
        <h2 className='text-lg font-semibold'>Sign Up</h2>
      </div>
        <p className='text-md text-slate-300 mb-2'>Create a new account to access the monitoring system</p>
        <label>FullName</label>
        <input 
          type='text' 
          {...register("name")} 
          placeholder="Enter your name" 
          disabled={isLoading}
          className='border border-slate-600 p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed' 
        />
        <label>Email</label>
        <input 
          type="text" 
          placeholder="Enter your email" 
          {...register("email")} 
          disabled={isLoading}
          className='border border-slate-600 p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed' 
        />
        <label>Password</label>
        <input 
          type="password" 
          placeholder="Enter your password" 
          {...register("password")} 
          disabled={isLoading}
          className='border border-slate-600 p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed' 
        />
        <label>Role</label>
        <select 
          {...register("role")} 
          disabled={isLoading}
          className='bg-slate-700/90 border border-slate-600 p-1.5 text-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white-500 mb-2 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <option value="" className='text-white'>Select User Type</option>
          <option value="admin">Admin</option>
          <option value="technician">Technician</option>
          <option value="user">User</option>
        </select>
        <button 
          type="submit" 
          disabled={isLoading}
          className='button bg-blue-600 p-2 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 flex items-center justify-center'
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Loading...
            </>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
    </div>
  )
}

export default Sign_Up
