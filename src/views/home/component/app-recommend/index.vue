<template>
  <div class="app-recommend">
    <div class="app-recommend__headline">{{ props.headLine }}</div>
    <van-swipe :show-indicators="false" :loop="false" :width="95">
      <van-swipe-item v-for="(item, index) in props.data" :key="index">
        <app-recommend
          :title="item.title"
          :classify="item.classify"
          :img="item.img"
        ></app-recommend>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import appRecommend from "./card.vue";
import { ListData } from "@/api/model/home";
type Props = {
  headLine: string;
  data: ListData[];
};
const props = defineProps<Props>();
</script>
<style lang="less" scoped>
.app-recommend {
  padding: 5px;
  border-bottom: 1px solid #eee;
  min-height: 110px;
}
.app-recommend__headline {
  font-weight: bold;
  font-size: 14px;
  padding: 0 10px;
}
</style>
