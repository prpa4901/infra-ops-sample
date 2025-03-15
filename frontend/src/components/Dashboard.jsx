import React, { useState, useEffect } from 'react';
import ServerList from './ServerList';
import ResourceChart from './ResourceChart';
import { getServers } from '../serverService';

const Dashboard = () => {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getServers();
        setServers(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch server data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Set up a polling interval
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Calculate aggregate statistics
  const totalServers = servers.length;
  const runningServers = servers.filter(s => s.status === 'running').length;
  const stoppedServers = servers.filter(s => s.status === 'stopped').length;
  const errorServers = servers.filter(s => s.status === 'error').length;
  
  const avgCpuUsage = servers.length 
    ? servers.reduce((sum, server) => sum + server.cpu_usage, 0) / servers.length
    : 0;
  
  const avgMemoryUsage = servers.length 
    ? servers.reduce((sum, server) => sum + server.memory_usage, 0) / servers.length
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Infrastructure Dashboard</h1>
      
      {loading && <div className="flex justify-center"><div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div></div>}
      
      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
        <p>{error}</p>
      </div>}
      
      {!loading && !error && (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">Total Servers</h3>
              <p className="text-3xl font-bold">{totalServers}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">Running</h3>
              <p className="text-3xl font-bold text-green-600">{runningServers}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">Stopped</h3>
              <p className="text-3xl font-bold text-yellow-600">{stoppedServers}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">Error</h3>
              <p className="text-3xl font-bold text-red-600">{errorServers}</p>
            </div>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Server Status</h2>
              <ResourceChart 
                type="pie"
                labels={['Running', 'Stopped', 'Error']}
                data={[runningServers, stoppedServers, errorServers]}
                backgroundColor={['#10B981', '#F59E0B', '#EF4444']}
              />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Resource Usage</h2>
              <ResourceChart 
                type="bar"
                labels={['CPU', 'Memory']}
                data={[avgCpuUsage, avgMemoryUsage]}
                backgroundColor={['#3B82F6', '#8B5CF6']}
              />
            </div>
          </div>
          
          {/* Server List */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Servers</h2>
            </div>
            <ServerList servers={servers} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;