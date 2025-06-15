import React, { useContext } from "react"
import { LogOut } from "lucide-react"
import UserContext from "../../../context.jsx"
import { useDispatch } from "react-redux"
import { getUserName } from "../../../store/UserSlice.js"

const Logout = () => {
  const { setUsername } = useContext(UserContext)
  const dispatch = useDispatch()

  const handleLogout = () => {
    setUsername("")
    dispatch(getUserName(null))
  };

  return (
    <div
      onClick={handleLogout}
      className="flex items-center gap-2 cursor-pointer text-red-400 hover:text-red-500 transition"
    >
      <LogOut className="w-5 h-5" />
      <span className="text-lg font-medium">Logout</span>
    </div>
  );
};

export default Logout;
