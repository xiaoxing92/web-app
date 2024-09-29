import { AppItem } from "../types/appTypes";

const BASE_URL = "https://itunes.apple.com/hk/rss";

export const getTopGrossingApps = async (limit: number): Promise<AppItem[]> => {
  const response = await fetch(
    `${BASE_URL}/topgrossingapplications/limit=${limit}/json`
  );
  const data = await response.json();
  return data.feed.entry.map((app: any) => ({
    id: app.id.attributes["im:id"],
    name: app["im:name"].label,
    icon: app["im:image"][2].label,
    category: app.category.attributes.label,
  }));
};

export const getTopFreeApps = async (limit: number): Promise<AppItem[]> => {
  const response = await fetch(
    `${BASE_URL}/topfreeapplications/limit=${limit}/json`
  );
  const data = await response.json();
  return data.feed.entry.map((app: any) => ({
    id: app.id.attributes["im:id"],
    name: app["im:name"].label,
    icon: app["im:image"][2].label,
    category: app.category.attributes.label,
  }));
};
