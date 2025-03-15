import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="px-4 py-6">
        <h2 className="text-xl font-semibold">InfraOps</h2>
      </div>
      <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
        <Link to="/" className="block px-3 py-2 rounded-md text-white hover:bg-gray-700">
          Dashboard
        </Link>
        <Link to="/network-scanner" className="block px-3 py-2 rounded-md text-white hover:bg-gray-700">
          Network Scanner
        </Link>
        {/* Add more navigation links */}
      </nav>
    </div>
  );
};

export default Sidebar;