<template>
  <div class="app-card">
    <div class="app-card__header">
      <div class="app-card__thumb">
        <div class="app-card__num">{{ props.num + 1 }}</div>
        <div class="app-card__image">
          <img :src="props.img" />
        </div>
      </div>
      <div class="app-card__content">
        <h3 class="app-card__title">{{ props.title }}</h3>
        <i class="app-card__classify">{{ props.classify }}</i>
        <div class="app-card__grade">
          <app-common-rate :value="props.averageUserRating" />
          <span class="app-card__grade__num">
            ({{ props.userRatingCount }})</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import AppCommonRate from "@/components/app-common-rate/index.vue";
type Props = {
  title: string;
  num: number;
  classify: string;
  img: string;
  userRatingCount?: number;
  averageUserRating?: string;
};
const props = defineProps<Props>();
</script>
<style lang="less">
.app-card {
  border-bottom: 1px solid #eee;
  :last-child {
    border-bottom: none;
  }
}
.app-card__header {
  display: flex;
  padding: 10px 0;
}
.app-card__thumb {
  display: flex;
  align-items: center;
  margin-right: 10px;
  .app-card__image {
    img {
      width: 53px;
      height: 53px;
      border-radius: 10px;
      overflow: hidden;
    }
  }
}
.app-card__num {
  width: 35px;
  font-size: 12px;
  font-weight: bold;
  color: #ccc;
  text-align: center;
}
.app-card__content {
  display: flex;
  flex-direction: column;
  .app-card__title {
    width: 100%;
    padding: 3px 0;
    margin: 0;
    font-size: 12px;
    font-weight: bold;
  }
  .app-card__classify {
    font-size: 12px;
    color: #ccc;
    font-weight: bold;
  }
  .app-card__grade {
    font-size: 12px;
    color: #ccc;
  }
  .app-card__grade__num {
    margin-right: 5px;
  }
}
</style>
