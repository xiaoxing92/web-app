import React from "react";
import AppRowCard from "./AppRowCard";
import "../styles/AppRow.scss";
import { AppItem } from "../types/appTypes";

interface AppRowProps {
  title: string;
  apps: AppItem[];
}

const AppRow: React.FC<AppRowProps> = ({ title, apps }) => {
  return (
    <div className={`app-row horizontal`}>
      <div className="app-box">
        <span className="app-row-title">{title}</span>
        <div className="app-row-container">
          {apps.map((app, index) => (
            <AppRowCard key={app.id} app={app} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppRow;
