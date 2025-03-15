// src/components/Dashboard/NetworkScanner.jsx
import React, { useState } from 'react';

const NetworkScanner = () => {
  const [network, setNetwork] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsScanning(true);
    setError(null);
    
    try {
      // Simulate network scanning - in a real app, this would call your API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock results
      const mockResults = {
        '192.168.1.1': { status: 'reachable', hostname: 'router.local' },
        '192.168.1.10': { status: 'reachable', hostname: 'webserver.local' },
        '192.168.1.20': { status: 'reachable', hostname: 'database.local' },
        '192.168.1.30': { status: 'unreachable', hostname: null }
      };
      
      setScanResults(mockResults);
    } catch (err) {
      setError(err.message || 'An error occurred during network scan');
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Network Scanner</h2>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="network" className="block text-sm font-medium text-gray-700 mb-1">
              Network CIDR
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="network"
                id="network"
                className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                placeholder="192.168.1.0/24"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                required
              />
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={isScanning}
              >
                {isScanning ? 'Scanning...' : 'Scan'}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Enter the network in CIDR notation (e.g., 192.168.1.0/24)
            </p>
          </div>
        </form>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {isScanning && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-500">Scanning network {network}...</p>
          </div>
        )}
        
        {scanResults && !isScanning && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Scan Results</h3>
            <div className="bg-gray-50 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hostname
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(scanResults).map(([ip, info]) => (
                    <tr key={ip}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ip}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {info.hostname || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${info.status === 'reachable' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {info.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {info.status === 'reachable' && (
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => alert(`Adding ${ip} to inventory...`)}
                          >
                            Add to Inventory
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkScanner;