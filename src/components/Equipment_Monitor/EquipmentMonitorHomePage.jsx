import React, { useState, useContext } from "react"
import Auth from "./auth/Authentication.jsx"
import { LogIn, User } from "lucide-react"
import ELevator_types from "./ELevator_types.jsx"
import UserContext from "../../context.jsx"
import Logout from "./auth/LogOut.jsx"

const Equipment_Monitor_HomePage = () => {
  const [showAuth, setShowAuth] = useState(false)
  const { username } = useContext(UserContext)

  return (
    <div className="border border-slate-600 bg-slate-800/50 mx-4 mt-2 mb-4 p-2 text-white rounded-2xl">
      <div className="flex justify-between p-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Equipment Monitor</h1>
          <p className="text-md">
            Real-time status of critical elevator components
          </p>
        </div>
        <div className="flex items-center gap-4 ml-6 mt-3">
          {username ? (
            <>
              <div className="flex items-center gap-2 bg-transparent text-2xl px-4 py-1 rounded-md mb-2">
                <User className="size-6 text-blue-500" />
                <span className="text-white">{username}</span>
              </div>
              <Logout />
            </>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="bg-blue-600 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg"
            >
              <LogIn className="inline mr-2.5 text-sm" />
              Login
            </button>
          )}
        </div>
      </div>
      {showAuth ? (
        <Auth onClose={() => setShowAuth(false)} />
      ) : (
        !username && (
          <h1 className="border border-amber-300 bg-yellow-400/10 text-yellow-400 p-2 rounded-md my-3 mx-5">
            ⚠️ Limited access: Login to view detailed equipment monitoring and
            controls
          </h1>
        )
      )}

      <ELevator_types />
    </div>
  );
};

export default Equipment_Monitor_HomePage;
