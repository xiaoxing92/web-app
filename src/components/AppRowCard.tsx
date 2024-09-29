import React from "react";
import "../styles/AppCard.scss";
import { AppItem } from "../types/appTypes";

interface AppRowCardProps {
  app: AppItem;
  index: number;
}

const AppRowCard: React.FC<AppRowCardProps> = ({ app }) => {
  return (
    <div className={`app-card-row`}>
      <img src={app.icon} alt={app.name} />
      <div className="app-card-row-name">{app.name}</div>
      <div className="app-card-row-category">{app.category}</div>
    </div>
  );
};

export default AppRowCard;
