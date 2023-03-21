<template>
  <div class="app-recommend-row">
    <div class="app-recommend__header">
      <div class="app-recommend__thumb">
        <div class="app-recommend__image">
          <img :src="props.img" />
        </div>
      </div>
      <div class="app-recommend__content">
        <h3 class="app-recommend__title">{{ props.title }}</h3>
        <i class="app-recommend__classify">{{ props.classify }}</i>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
type Props = {
  title: string;
  classify: string;
  img: string;
};
const props = defineProps<Props>();
</script>
<style lang="less">
.app-recommend__header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.app-recommend__thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 5px 0;
  .app-recommend__image {
    img {
      width: 75px;
      height: 75px;
      border-radius: 17px;
      overflow: hidden;
    }
  }
}
.app-recommend__content {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 10px;
  .app-recommend__title {
    width: 100%;
    padding: 2px 0;
    margin: 0;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .app-recommend__classify {
    font-size: 12px;
    color: #ccc;
    font-weight: bold;
    text-align: center;
  }
}
</style>
