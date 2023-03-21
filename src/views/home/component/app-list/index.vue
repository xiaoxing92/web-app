<template>
  <div v-for="(item, index) in props.data" :key="index">
    <app-card
      :user-rating-count="item.userRatingCount"
      :average-user-rating="item.averageUserRating"
      :title="item.title"
      :classify="item.classify"
      :num="index"
      :img="item.img"
    ></app-card>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import appCard from "./card.vue";
import { ListData } from "@/api/model/home";
type Props = {
  data: ListData[];
};
const props = defineProps<Props>();
</script>
<style lang="less"></style>
