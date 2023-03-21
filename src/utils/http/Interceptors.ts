import axios, { AxiosResponse, AxiosError } from "axios";
export class Interceptors {
  public instance;

  public constructor() {
    // 创建axios实例
    this.instance = axios.create({
      baseURL: process.env.VUE_APP_BASE_API,
      withCredentials: true,
      timeout: 1000 * 12,
    });
    // 初始化拦截器
    this.initInterceptors();
  }
  // 为了让http.ts中获取初始化好的axios实例
  public getInterceptors() {
    return this.instance;
  }
  // 初始化拦截器
  public initInterceptors() {
    // 设置post请求头
    this.instance.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";

    // 响应拦截器
    this.instance.interceptors.response.use(
      // 请求成功
      (res: AxiosResponse<any>) => {
        const body = res.data || {};
        return Promise.resolve(body);
      },
      (error: AxiosError) => {
        console.error(error);
        Promise.resolve({ res: false });
      }
    );
  }
}
