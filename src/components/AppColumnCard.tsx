import React from "react";
import "../styles/AppColumnCard.scss";
import { AppItem } from "../types/appTypes";

interface AppColumnCardProps {
  app: AppItem;
  index: number;
}

const AppColumnCard: React.FC<AppColumnCardProps> = ({ app, index }) => {
  return (
    <div className={`app-card-column`}>
      <div className="app-card-column-left">
        <span className="app-card-index">{index + 1}</span>
        <img src={app.icon} alt={app.name} />
      </div>
      <div className="app-card-column-right">
        <div className="app-card-column-name">{app.name}</div>
        <div className="app-card-column-category">{app.category}</div>
      </div>
    </div>
  );
};

export default AppColumnCard;
