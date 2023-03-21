import http from "@/utils/http/request";
import { ApiParams } from "./model/home";

export const getRecommendApi = (params: ApiParams) =>
  http.get<any>(`rss/topgrossingapplications/limit=${params.size}/json`);

export const getAppListApi = (params: ApiParams) =>
  http.get<any>(`rss/topfreeapplications/limit=${params.size}/json`);

export const getAppDetailedApi = (params: string) =>
  http.get<any>(`lookup?id=${params}`);
