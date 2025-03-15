import React, { useState } from "react";
import ServerCard from "./ServerCard";

const ServerList = ({ servers }) => {
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedServers = [...servers].sort((a, b) => {
    if (sortOrder === "asc") return a.name.localeCompare(b.name);
    return b.name.localeCompare(a.name);
  });

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Server List</h2>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedServers.map((server) => (
          <ServerCard key={server.id} server={server} />
        ))}
      </div>
    </div>
  );
};

export default ServerList;
