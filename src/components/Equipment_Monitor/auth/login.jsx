import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { LogIn, Loader2 } from "lucide-react";
import axios from "axios";
import UserContext from '../../../context.jsx';
import { setUserName, setUserRole } from "../../../store/UserSlice.js";
import { useDispatch } from "react-redux";

const LoginForm = ({ onClose }) => {
  const { setUsername } = useContext(UserContext);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(""); 

    try {
      const response = await axios.post(
        "https://0cqvsm8di3.execute-api.ap-southeast-2.amazonaws.com/prod/login",
        data
      );

      const userData = response.data;
      const userName = userData.user.name;

      setUsername(userName);
      dispatch(setUserName(userName));
      dispatch(setUserRole(userData.user.role));

      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error("Login failed:", err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <div className="w-full max-w-md p-5 bg-slate-700/90 rounded-xl shadow-lg border border-slate-800 text-white mt-4 text-sm/4">
      <h2 className="text-white text-xl font-semibold mb-3">🔐 Login</h2>
      <p className="text-md text-slate-300 mb-4">
        Enter your credentials to access the system
      </p>
      {error && (
        <div className="mb-2 p-2 text-red-400 bg-red-900/20 rounded-md text-sm">
          {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="flex flex-col gap-4"
      >
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="admin@elevator.com"
          {...register("email", { required: "Email is required" })}
          disabled={isLoading}
          className="bg-slate-700/50 text-white placeholder-slate-400 px-4 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-white-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {errors.email && (
          <p className="text-red-400 text-xs">{errors.email.message}</p>
        )}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          {...register("password", { required: "Password is required" })}
          disabled={isLoading}
          className="bg-slate-700/50 text-white placeholder-slate-400 px-4 py-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-white-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {errors.password && (
          <p className="text-red-400 text-xs">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isLoading || !isValid}
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
