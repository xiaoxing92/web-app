import * as axios from "axios";

declare module "axios" {
  // 定制业务相关的网络请求响应格式， T 是具体的接口返回类型数据
  export interface CustomSuccessData<T> {
    feed?: T;
  }

  export interface CustomRes {
    body?: object;
  }

  export interface CustomOpts {
    showError: boolean;
  }
}
