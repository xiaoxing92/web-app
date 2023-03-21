/**
 * @function 下拉加载
 * @description 组件配置常用方法
 * @param requestUrl {function} 请求的方法
 * @param page {Object} 分页参数配置
 * @param params {Object} 请求参数配置
 * @return [list, onRefresh, onLoadMore,reset,onSearch, onClear]
 * @author 幸斌 2023-03-21 14:54:15
 **/
import { ref, isRef, isReactive, Ref } from "vue";
// 返回接口
type Result<T> = [
  Ref<T>,
  number,
  (
    checkRefresh: () => void,
    loadMoreDone: () => void,
    errorEvent: () => void
  ) => void,
  () => void,
  () => void,
  () => void,
  () => void
];

type OnLoadMore = (
  loadMoreDone: () => null,
  loadDone: () => null,
  errorEvent: () => null
) => void;

// 配置项接口
interface DefaultOptions {
  params?: any;
  beforeCallback?: () => void;
  afterCallback?: (data: any, index: number) => any;
}

// 自定义keys
export function keys<T>(obj: T) {
  return Object.keys(obj) as Extract<keyof T, string>[];
}

function isHasParams(obj: any): boolean {
  return (obj && Object.keys(obj).includes("params")) || false;
}

// 列表hooks
export function useList<T = any>(
  requestUrl: any,
  options?: DefaultOptions
): Result<T> {
  // 依赖Map
  const targetMap = new WeakMap();

  // 请求接口
  let reqApi = requestUrl;

  // 初始化配置项
  const defaultOptions: DefaultOptions = {
    params: { page: 1, size: 10, current: 10 },
    afterCallback: (data: any) => data,
  };

  // 配置项合并（兼容proxy响应数据）
  if (options) {
    keys<DefaultOptions>(options).forEach((key) => {
      if (!isReactive(options[key]) && !isRef(options[key])) {
        defaultOptions[key] = options[key];
      }
    });
  }

  // 解构配置项
  const { params, beforeCallback, afterCallback } = defaultOptions;
  // 数据源
  const list = ref<T[]>([]);

  // 列表总数
  const total = ref<number>(0);

  // 重置分页
  params.page = 1;

  // 请求数据
  const request = async (errorEvent?: any) => {
    // 兼容响应请求接口
    if (isRef(requestUrl)) {
      reqApi = requestUrl.value as any;
    }
    // 兼容响应式请求参数
    // if (options && isHasParams(options)) {
    //   params = { ...params, ...options.params };
    // }
    try {
      beforeCallback?.();
      const { feed } = await reqApi(params);
      total.value = 100;
      return afterCallback?.(feed, params.current);
    } catch (e) {
      errorEvent?.();
      return [];
    }
  };

  // 加载更多
  const onLoadMore: OnLoadMore = async (loadMoreDone, loadDone, errorEvent) => {
    // 返回数据
    const data: any = await request(errorEvent);
    // 分页叠加
    params.page++;
    // prevSize = params.size;
    // params.size += 10;
    // setTimeout(() => {
    //   data.splice(prevSize, params.size);
    // }, 500);
    // 数据装载
    list.value = data;
    // 当次加载结束
    loadMoreDone();
  };

  // 重新请求数据
  const onReset = async () => {
    params.page = 1;
    list.value = await request();
  };

  // 搜索方法
  const onSearch = (): void => {
    onReset();
  };

  // 清空搜索方法
  const onClear = (): void => {
    onResetParams();
    onReset();
  };

  // 还原参数默认值
  const onResetParams = (): void => {
    const fixedKey = ["page", "size"];
    if (options && isHasParams(options)) {
      keys(options.params).forEach((key) => {
        !fixedKey.includes(key) && (options.params[key] = "");
      });
    }
  };

  // 方法集合
  const hooksMethod = [
    list,
    total,
    onLoadMore,
    onReset,
    onSearch,
    onClear,
    onResetParams,
  ];

  // 依赖收集
  if (!targetMap.get(requestUrl)) targetMap.set(requestUrl, hooksMethod);

  // 返回
  return targetMap.get(requestUrl);
}
