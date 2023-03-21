<template>
  <span v-for="(item, index) in state.grade" :key="index">
    <i
      class="default-style icon-font icon-shoucang"
      :style="`--ratio: ${ratio}%`"
      :class="{
        active: Number(integer) > index,
        half: Number(integer) === index,
      }"
    >
    </i>
  </span>
</template>

<script lang="ts" setup>
import { reactive, defineProps, computed } from "vue";

interface RateState {
  score: number;
  grade: number[];
}

type Props = {
  value?: string;
};

const props = defineProps<Props>();

const state = reactive<RateState>({
  score: 0,
  grade: [1, 2, 3, 4, 5],
});

const integer = computed<string>(
  () => (props.value && props.value.split(".")[0]) || "0"
);

const ratio = computed<string>(
  () => (props.value && props.value.split(".")[1]) || "0"
);
</script>

<style lang="less" scoped>
.default-style {
  color: #ffcc33;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  &.active {
    color: #ffcc33;
    -webkit-background-clip: text;
    -webkit-text-fill-color: #ffcc33;
  }

  &.half {
    background: linear-gradient(to right, #ffcc33 var(--ratio), #ffffff 0);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
