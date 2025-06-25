import React, { useState } from "react";
import Equipment_Monitor_HomePage from "../Equipment_Monitor/EquipmentMonitorHomePage";
import Real_time_Data_HomePage from "../Real-Time-Data/RealTimeDataHomePage";
import Statistics_HomePage from "../Statistics/StatisticsHomePage";
import UserContext from "../../context.jsx";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("monitor");
  const [username, setUsername] = useState("");

  const userRole = useSelector((state) => state.user.userRole);

  const renderPage = () => {
    if (userRole === "admin") {
      switch (activeTab) {
        case "monitor":
          return <Equipment_Monitor_HomePage />;
        case "realTime":
          return <Real_time_Data_HomePage />;
        case "analytics":
          return <Statistics_HomePage />;
        default:
          return <Equipment_Monitor_HomePage />;
      }
    } else {
      switch (activeTab) {
        case "monitor":
          return <Equipment_Monitor_HomePage />;
        case "realTime":
          return <Real_time_Data_HomePage />;
        default:
          return <Equipment_Monitor_HomePage />;
      }
    }
  };

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <div className="flex flex-col">
        <div className="nav flex justify-between items-center text-white border border-slate-700 bg-slate-800/50 mx-15 my-6 h-18 rounded-xl px-6">
          <div
            onClick={() => setActiveTab("monitor")}
            className={`flex-1 mx-1 py-3 rounded-lg text-center text-lg font-medium cursor-pointer transition-all ${
              activeTab === "monitor"
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-700 text-gray-300"
            }`}
          >
            Equipment Monitor
          </div>
          <div
            onClick={() => setActiveTab("realTime")}
            className={`flex-1 mx-1 py-3 rounded-lg text-center text-lg font-medium cursor-pointer transition-all ${
              activeTab === "realTime"
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-700 text-gray-300"
            }`}
          >
            Real-Time Data
          </div>
          {userRole === "admin" && (
            <div
              onClick={() => setActiveTab("analytics")}
              className={`flex-1 mx-1 py-3 rounded-lg text-center text-lg font-medium cursor-pointer transition-all ${
                activeTab === "analytics"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-700 text-gray-300"
              }`}
            >
              Usage Analytics
            </div>
          )}
        </div>

        <div className="mx-10">{renderPage()}</div>
      </div>
    </UserContext.Provider>
  );
};

export default Navbar;
