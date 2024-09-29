import React from "react";
import AppColumnCard from "./AppColumnCard";
import "../styles/AppColumn.scss";
import { AppItem } from "../types/appTypes";

interface AppColumnProps {
  apps: AppItem[];
}

const AppColumn: React.FC<AppColumnProps> = ({ apps }) => {
  return (
    <div className={`app-column vertical`}>
      <div className="app-column-container">
        {apps.map((app, index) => (
          <AppColumnCard key={app.id} app={app} index={index} />
        ))}
      </div>
    </div>
  );
};

export default AppColumn;
