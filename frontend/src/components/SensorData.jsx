import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faUsers, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb as farLightbulb } from '@fortawesome/free-regular-svg-icons'; // Regular lightbulb icon

export function SensorData() {
  const data = {
    "humidity": {
      "id": 0,
      "icon": faDroplet,
      "name": "Humidity",
      "desc": "65%",
      "toggle": false
    },
    "employees": {
      "id": 1,
      "icon": faUsers,
      "name": "Employees",
      "desc": "56",
      "toggle": false
    },
    "Lighting": {
      "id": 3,
      "icon": farLightbulb,
      "name": "Lighting",
      "desc": "On",
      "toggle": true
    }
  };

  return (
    <div className='Main-Sensor container mx-auto px-4 py-8'>
      {Object.keys(data).map((key) => (
        <div className="bg-gray-800 rounded-lg p-4 mb-4 flex items-center" key={key}>
          <FontAwesomeIcon icon={data[key].icon} className="text-gray-400 mr-2" />
          <div>
            <p className="text-white font-semibold">{data[key].name}</p>
            <p className="text-gray-400">{data[key].desc}</p>
          </div>
          {data[key].toggle && <Toggle />}
        </div>
      ))}
    </div>
  );
}

function Toggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="flex">
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            readOnly
          />
          <div
            onClick={() => setEnabled(!enabled)}
            className={`w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600`}
          ></div>
          <span className="ml-2 text-sm font-medium text-gray-900"></span>
        </label>
      </div>
    </div>
  );
}
