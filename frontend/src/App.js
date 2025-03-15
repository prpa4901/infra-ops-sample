/*-------------------------------------------------------------------------------
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
-------------------------------------------------------------------------------*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard';
import NetworkScanner from './components/NetworkScanner';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar /> {/* Sidebar component used here */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header /> {/* Header component used here */}
          <main className="flex-1 overflow-y-auto p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/network-scanner" element={<NetworkScanner />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;