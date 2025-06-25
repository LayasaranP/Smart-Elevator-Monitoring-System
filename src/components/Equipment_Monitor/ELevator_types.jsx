import { useState } from "react";
import {
  Search,
  Power,
  Battery,
  AlertCircle,
  DoorOpen,
  ShieldCheck,
  GaugeCircle,
  Settings,
  Wrench,
  CircleCheckBig,
  Circle,
} from "lucide-react";

const statusColorMap = {
  active: "bg-green-600 text-green-100",
  idle: "bg-blue-600 text-blue-100",
  warning: "bg-yellow-600 text-yellow-900",
  error: "bg-red-600 text-red-100",
};

const statusIconColorMap = {
  active: "text-green-400",
  idle: "text-blue-400",
  warning: "text-yellow-400",
  error: "text-red-400",
};

const getIconByStatus = (status) => {
  switch (status.toLowerCase()) {
    case "active":
      return CircleCheckBig;
    case "idle":
      return Circle;
    case "warning":
    case "error":
      return AlertCircle;
    default:
      return Circle;
  }
};

const getIcon = (id) => {
  switch (id) {
    case "motor":
      return Power;
    case "brake":
      return Wrench;
    case "door":
      return DoorOpen;
    case "load":
      return GaugeCircle;
    case "power":
      return Battery;
    case "valve":
    case "inverter":
      return Settings;
    case "cylinder":
      return AlertCircle;
    case "safety":
      return ShieldCheck;
    case "compressor":
    case "pump":
      return Power;
    default:
      return AlertCircle;
  }
};

const ElevatorCard = ({ name, status, value, unit, id }) => {
  const StatusIcon = getIconByStatus(status);
  const Icon = getIcon(id);

  return (
    <div className="bg-slate-700/50 p-4 rounded-xl shadow-md w-full max-w-md transition-transform duration-200 hover:scale-105 hover:z-10 relative">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Icon className="text-green-400 w-5 h-5 mt-1" />
          <h1>{name}</h1>
        </div>
        <StatusIcon
          className={`w-5 h-5 mt-1 ${
            statusIconColorMap[status.toLowerCase()] || "text-white"
          }`}
        />
      </div>
      <div>
        <div className="flex justify-between mt-2">
          <p className="text-md">Status:</p>
          <div
            className={`mt-1 px-2 py-1 rounded-full text-xs font-semibold inline-block ${
              statusColorMap[status.toLowerCase()]
            }`}
          >
            {status.toUpperCase()}
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-md">Value:</p>
          <p>{`${value} ${unit}`}</p>
        </div>
        <div className="w-full bg-white h-2 rounded-full mt-1.5">
          <div
            className="bg-green-600 h-2 rounded-full"
            style={{ width: `${Math.min(value, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const Elevator_types = () => {
  const [selectedType, setSelectedType] = useState("traction");

  const elv = {
    traction: [
      {
        id: "motor",
        name: "Traction Motor",
        status: "Active",
        value: 85,
        unit: "% Load",
      },
      {
        id: "brake",
        name: "Safety Brake",
        status: "Active",
        value: 90,
        unit: "% Engaged",
      },
      {
        id: "door",
        name: "Door Mechanism",
        status: "Idle",
        value: 0,
        unit: "% Open",
      },
      {
        id: "load",
        name: "Load Sensor",
        status: "Active",
        value: 65,
        unit: "% Capacity",
      },
      {
        id: "power",
        name: "Power Supply",
        status: "Active",
        value: 220,
        unit: "V AC",
      },
    ],
    hydraulic: [
      {
        id: "pump",
        name: "Hydraulic Pump",
        status: "Active",
        value: 78,
        unit: "% Load",
      },
      {
        id: "valve",
        name: "Control Valve",
        status: "Active",
        value: 45,
        unit: "% Open",
      },
      {
        id: "cylinder",
        name: "Hydraulic Cylinder",
        status: "Active",
        value: 1250,
        unit: "PSI",
      },
      {
        id: "door",
        name: "Door System",
        status: "Idle",
        value: 0,
        unit: "% Open",
      },
      {
        id: "load",
        name: "Load Detection",
        status: "Warning",
        value: 88,
        unit: "% Capacity",
      },
    ],
    mrl: [
      {
        id: "motor",
        name: "Gearless Motor",
        status: "Active",
        value: 72,
        unit: "% Load",
      },
      {
        id: "inverter",
        name: "Drive Inverter",
        status: "Active",
        value: 68,
        unit: "% Output",
      },
      {
        id: "brake",
        name: "Electromagnetic Brake",
        status: "Active",
        value: 100,
        unit: "% Force",
      },
      {
        id: "door",
        name: "Door Operator",
        status: "Idle",
        value: 0,
        unit: "% Open",
      },
      {
        id: "load",
        name: "Load Weighing",
        status: "Active",
        value: 42,
        unit: "% Max",
      },
    ],
    pneumatic: [
      {
        id: "compressor",
        name: "Air Compressor",
        status: "Active",
        value: 95,
        unit: "PSI",
      },
      {
        id: "valve",
        name: "Pneumatic Valve",
        status: "Active",
        value: 78,
        unit: "% Flow",
      },
      {
        id: "cylinder",
        name: "Air Cylinder",
        status: "Active",
        value: 85,
        unit: "PSI",
      },
      {
        id: "door",
        name: "Door Control",
        status: "Idle",
        value: 0,
        unit: "% Open",
      },
      {
        id: "safety",
        name: "Safety System",
        status: "Active",
        value: 100,
        unit: "% Ready",
      },
    ],
    freight: [
      {
        id: "motor",
        name: "Heavy-Duty Motor",
        status: "Active",
        value: 92,
        unit: "% Load",
      },
      {
        id: "brake",
        name: "Freight Brake",
        status: "Active",
        value: 100,
        unit: "% Applied",
      },
      {
        id: "door",
        name: "Freight Doors",
        status: "Warning",
        value: 25,
        unit: "% Open",
      },
      {
        id: "load",
        name: "Weight Sensor",
        status: "Error",
        value: 95,
        unit: "% Capacity",
      },
      {
        id: "power",
        name: "Power Distribution",
        status: "Active",
        value: 440,
        unit: "V AC",
      },
    ],
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="relative">
          <Search className="w-4 h-4 text-white absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search components..."
            className="bg-slate-600 text-white pl-10 pr-3 py-2 rounded-md"
          />
        </div>

        <select
          className="bg-slate-600 text-white p-2 rounded-md w-40 appearance-none"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {Object.keys(elv).map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)} Elevator
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {elv[selectedType].map((component) => (
          <ElevatorCard key={component.id} {...component} />
        ))}
      </div>
    </div>
  );
};

export default Elevator_types;
