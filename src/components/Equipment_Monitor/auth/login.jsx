import React, { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { LogIn, Loader2 } from "lucide-react"
import axios from "axios"
import UserContext from '../../../context.jsx'
import { setUserName, setUserRole } from "../../../store/UserSlice.js"
import { useDispatch } from "react-redux"

const LoginForm = ({ onClose }) => {

  const { setUsername } = useContext(UserContext)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        "https://0cqvsm8di3.execute-api.ap-southeast-2.amazonaws.com/prod/login",
        data
      );
      const userData = response.data
      const userName = userData.user.name
      setUsername(userName)
      dispatch(setUserName(userName))
      dispatch(setUserRole(userData.user.role))

      if (onClose) {
        onClose()
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false)
      reset();
    }
  };

  return (
    <div className="w-full max-w-md p-5 bg-slate-700/90 rounded-xl shadow-lg border border-slate-800 text-white mt-4 text-sm/4">
      <h2 className="text-white text-xl font-semibold mb-4">🔐 Login</h2>
      <p className="text-md text-slate-300 mb-6">
        Enter your credentials to access the system
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="flex flex-col gap-4"
      >
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="admin@elevator.com"
          {...register("email")}
          disabled={isLoading}
          className="bg-slate-700/50 text-white placeholder-slate-400 px-4 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-white-500 disabled:opacity-50 disabled:cursor-not-allowed"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          {...register("password")}
          disabled={isLoading}
          className="bg-slate-700/50 text-white placeholder-slate-400 px-4 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-white-500 disabled:opacity-50 disabled:cursor-not-allowed"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;