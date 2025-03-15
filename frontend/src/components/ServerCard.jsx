import React from 'react';

const StatusBadge = ({ status }) => {
  const statusColors = {
    running: 'bg-green-100 text-green-800 border-green-200',
    stopped: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    error: 'bg-red-100 text-red-800 border-red-200'
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ProgressBar = ({ value, label, color }) => {
  const progressColors = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500'
  };
  
  // Determine color based on value if not provided
  let autoColor = 'blue';
  if (!color) {
    if (value > 90) autoColor = 'red';
    else if (value > 70) autoColor = 'yellow';
    else autoColor = 'green';
  }
  
  const bgColor = progressColors[color || autoColor];
  const percentage = Math.min(Math.max(value, 0), 100); // Clamp between 0-100
  
  return (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-700">{percentage.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${bgColor}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const ServerCard = ({ server }) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{server.name}</h3>
          <StatusBadge status={server.status} />
        </div>
        
        <div className="text-sm text-gray-600 mb-4">
          <p>{server.server_type}</p>
          <p>{server.ip_address}</p>
          <p className="text-xs text-gray-500 mt-1">Last updated: {new Date(server.updated_at).toLocaleString()}</p>
        </div>
        
        <ProgressBar value={server.cpu_usage} label="CPU Usage" color="blue" />
        <ProgressBar value={server.memory_usage} label="Memory Usage" color="purple" />
        <ProgressBar value={server.disk_usage} label="Disk Usage" />
        
        {server.services && server.services.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Services</h4>
            <div className="space-y-1">
              {server.services.map(service => (
                <div key={service.id} className="flex justify-between items-center">
                  <span className="text-sm">{service.name}</span>
                  <StatusBadge status={service.status} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServerCard;