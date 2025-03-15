import api from './api';

// 🔹 Get All Servers
export const getServers = async (filters = {}) => {
  try {
    const response = await api.get('/servers/', { params: filters });
    return response.data;
  } catch (error) {
    console.error("Error fetching servers:", error);
    throw error;
  }
};

// 🔹 Get Single Server by ID
export const getServer = async (id) => {
  try {
    const response = await api.get(`/servers/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching server ${id}:`, error);
    throw error;
  }
};

// 🔹 Get Server Metrics by ID
export const getServerMetrics = async (id) => {
  try {
    const response = await api.get(`/servers/${id}/metrics/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching metrics for server ${id}:`, error);
    throw error;
  }
};

// 🔹 Get Services for a Specific Server
export const getServices = async (serverId) => {
  try {
    const response = await api.get('/services/', { params: { server: serverId } });
    return response.data;
  } catch (error) {
    console.error(`Error fetching services for server ${serverId}:`, error);
    throw error;
  }
};

// 🔹 Update Server Status (PATCH Request)
export const updateServerStatus = async (id, status) => {
  try {
    const response = await api.patch(`/servers/${id}/`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating server ${id} status:`, error);
    throw error;
  }
};
