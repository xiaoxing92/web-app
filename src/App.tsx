import React, { useState, useEffect } from "react";
import { getTopGrossingApps, getTopFreeApps } from "./api/appService";
import AppRow from "./components/AppRow";
import AppColumn from "./components/AppColumn";
import Search from "./components/Search";
import { AppItem } from "./types/appTypes";

const App: React.FC = () => {
  const [topGrossingApps, setTopGrossingApps] = useState<AppItem[]>([]);
  const [topFreeApps, setTopFreeApps] = useState<AppItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchApps = async () => {
      const grossingApps = await getTopGrossingApps(10);
      const freeApps = await getTopFreeApps(100);
      setTopGrossingApps(grossingApps);
      setTopFreeApps(freeApps);
    };
    fetchApps();
  }, []);

  const filteredFreeApps = topFreeApps.filter((app) =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <Search setSearchTerm={setSearchTerm} />
      <AppRow title="Recommend" apps={topGrossingApps} />
      <AppColumn apps={filteredFreeApps} />
    </div>
  );
};

export default App;
