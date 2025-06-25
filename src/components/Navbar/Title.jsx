import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Title = () => {
  const userNameFromRedux = useSelector((state) => state.user.userInfo);
  const [userName, setUserName] = useState(userNameFromRedux);
  const [timeMonitor, setTimeMonitor] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    if (userNameFromRedux) {
      setUserName(userNameFromRedux);
      const timer = setTimeout(() => {
        setUserName("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [userNameFromRedux]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeMonitor(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="title grid grid-cols-2 gap-4 pt-8">
        <div className="smart col-span-1 pl-18 text-4xl text-white">
          {userName && <p>Welcome, {userName}! 👋</p>}
          <h1>Smart Elevator Control Center</h1>
        </div>
        <div className="system col-span-1 text-right pr-18">
          <button className="border rounded-full border-green-600 text-green-500 px-4 mt-4">
            System Online
          </button>
        </div>
        <div className="real col-span-1 pl-18 text-xl text-white">
          <h3>
            Real-time monitoring • Cloud-integrated • AI-powered analytics
          </h3>
        </div>
        <div className="time col-span-1 text-right pr-25 text-white">
          <p>{timeMonitor}</p>
        </div>
      </div>
    </div>
  );
};

export default Title;
