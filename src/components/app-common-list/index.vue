<template>
  <van-list
    v-model:loading="state.loading"
    v-model:error="state.error"
    :finished="state.finished"
    :offset="props.offset"
    :finished-text="!props.total && state.empty ? '' : props.finishedText"
    :error-text="props.errorText"
    :immediate-check="props.immediateCheck"
    :direction="props.direction"
    @load="handleLoadMore"
  >
    <slot name="content" :data="list"></slot>
    <van-empty v-if="!props.total && state.empty" :description="finishedText" />
  </van-list>
</template>

<script lang="ts" setup>
import { ListDirection } from "vant";
import { reactive, watch, defineProps, withDefaults } from "vue";

const state = reactive({
  loading: false,
  finished: false,
  error: false,
  empty: false,
});

interface Props {
  onLoadMore: any;
  list?: any[];
  total?: number;
  offset?: number;
  finishedText?: string;
  errorText?: string;
  immediateCheck?: boolean;
  direction?: ListDirection;
}
const props = withDefaults(defineProps<Props>(), {
  // 加载
  onLoadMore: () => ({}),
  // 数据
  list: () => [],
  // 总数
  total: 0,
  // 滚动条与底部距离小于 offset 时触发 load 事件
  offset: 100,
  // 加载完成后的提示文案
  finishedText: "没有更多了",
  // 加载失败后的提示文案
  errorText: "请求失败,点击重新加载",
  // 是否在初始化时立即执行滚动位置检查
  immediateCheck: true,
  // 滚动触发加载的方向，可选值为 up
  direction: "down",
});

watch(
  () => props.list,
  (val) => {
    if (val.length >= props.total || val.length < 10) {
      loadDone();
    } else {
      state.finished = false;
      state.empty = false;
    }
  }
);

// 加载完成回调
const loadMoreDone = (): void => {
  state.loading = false;
};

// 全部加载完成结束回调
const loadDone = (): void => {
  state.finished = true;
  state.empty = true;
  console.log("进来了吗");
};

// 错误处理
const errorEvent = (): void => {
  state.error = true;
};

// 加载桥接
const handleLoadMore = (): void => {
  props.onLoadMore(loadMoreDone, loadDone, errorEvent);
};
</script>
