import {
  AxiosRequestConfig,
  AxiosInstance,
  CustomOpts,
  CustomSuccessData,
} from "axios";

import { Interceptors } from "./Interceptors";
import qs from "qs";
export type Get = <T>(
  url: string,
  params?: object,
  config?: AxiosRequestConfig
) => Promise<CustomSuccessData<T>>;

export type Post = <T>(
  url: string,
  params?: object,
  options?: CustomOpts,
  config?: AxiosRequestConfig
) => Promise<CustomSuccessData<T>>;

class HttpService {
  private static instance: HttpService;
  public axios: AxiosInstance;
  public constructor() {
    this.axios = new Interceptors().getInterceptors();
  }

  public getInstance() {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  public get: Get = async <T>(
    url: string,
    params?: object,
    config?: AxiosRequestConfig
  ) => {
    const response: any = await this.axios.get<T>(
      params ? `${url}?${qs.stringify(params)}` : url,
      config
    );
    return response;
  };

  public post: Post = async <T>(
    url: string,
    params?: object,
    options?: CustomOpts,
    config?: AxiosRequestConfig
  ) => {
    const response: any = await this.axios.post<T>(url, params, config);
    return response;
  };
}

export default new HttpService().getInstance();
