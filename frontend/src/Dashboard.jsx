import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/dashboard')
      .then(response => setChecked(response.data.enabled))
      .catch(err => console.error('Error fetching dashboard state:', err));
  }, []);

  const handleToggle = (e) => {
    const newState = e.target.checked;
    setChecked(newState);
    axios.post('http://localhost:5000/dashboard', { enabled: newState })
      .catch(err => console.error('Error updating dashboard state:', err));
  };

  return (
    <div>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleToggle}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
          peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
          after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border 
          after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 
          dark:peer-checked:bg-blue-600"
        ></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">filter run</span>
      </label>
    </div>
  );
}

export default Dashboard;
