<template>
  <div class="search-wrapper">
    <!-- 搜索 -->
    <van-search
      shape="round"
      v-model="searchKey"
      placeholder="Search..."
      @search="onSearch"
      @clear="onCancel"
    >
    </van-search>
  </div>
  <div class="main-wrapper">
    <app-common-list
      :onLoadMore="onLoadMore"
      :total="total"
      :list="appLicationList"
    >
      <template v-slot:content="{ data }">
        <!-- 推荐列表 -->
        <app-recommend head-line="Recommend" :data="recommendData" />
        <!-- 应用列表 -->
        <app-list :data="data" />
      </template>
    </app-common-list>
  </div>
</template>

<script lang="ts" setup>
import { getRecommendApi, getAppListApi, getAppDetailedApi } from "@/api/home";
import AppList from "@/views/home/component/app-list/index.vue";
import AppRecommend from "@/views/home/component/app-recommend/index.vue";
import { ListData } from "@/api/model/home";
import { useList } from "@/hooks/useList";
import { onMounted, ref } from "vue";
import { debounce } from "@/utils/tool/tool";
//  全部数据Key
const TOTAL_DATA = "TOTAL_DATA";

//  搜索字段
const searchKey = ref("");

//  推荐数据
const recommendData = ref<ListData[]>([]);

//  搜索索引缓存字典
const cacheMap: Record<string, any> = {};

//  应用数据
const getFilterData = (data: any) => {
  const newData = consolidateData(
    data.entry,
    {
      title: "",
      classify: "",
      img: "",
      keyWord: "",
    },
    true
  );
  cacheMap[TOTAL_DATA] = newData;
  getAppDetailedData();
  return newData;
};

const [appLicationList, total, onLoadMore] = useList<ListData[]>(
  getAppListApi,
  {
    params: { size: 100 },
    afterCallback: getFilterData,
  }
);

//  推荐接口
const getRecommendData = async () => {
  const { feed } = await getRecommendApi({ size: 10 });
  recommendData.value = consolidateData(
    feed.entry,
    {
      title: "",
      classify: "",
      img: "",
    },
    false
  );
};

//  所有应用ID
let appId: string[] = [];

//  应用详情
const getAppDetailedData = async () => {
  //  TODO::接口缺陷只能整合,可模板遍历索引匹配,同理,模板解析原理也遍历了一次
  const { results } = (await getAppDetailedApi(appId.toString())) as any;
  appLicationList.value.forEach((item: any, index: number) => {
    item["userRatingCount"] = results[index].userRatingCount;
    item["averageUserRating"] = results[index].averageUserRating.toFixed(2);
  });
};

//  搜索
const onSearch = debounce(() => {
  //  空值数据还原
  if (!searchKey.value) {
    onCancel();
    return;
  }
  //  已有数据走缓存
  if (cacheMap[searchKey.value]) {
    appLicationList.value = cacheMap[searchKey.value];
    return;
  }
  //  检索数据
  const reg = new RegExp(searchKey.value);
  cacheMap[searchKey.value] = [];
  cacheMap[TOTAL_DATA].length &&
    cacheMap[TOTAL_DATA].forEach((item: ListData) => {
      if (item.keyWord && reg.test(item.keyWord))
        cacheMap[searchKey.value].push(item);
    });
  // 检索结果
  if (cacheMap[searchKey.value].length) {
    appLicationList.value = cacheMap[searchKey.value];
  } else {
    appLicationList.value = [];
    delete cacheMap[searchKey.value];
  }
}, 300);

//  清除搜索
const onCancel = () => {
  searchKey.value = "";
  appLicationList.value = cacheMap[TOTAL_DATA];
};

type DataHandling = (
  source: any[],
  keyMap: Record<string, unknown>,
  extensionStatus: boolean
) => ListData[];

//  整合数据
const consolidateData: DataHandling = (source, keyMap, extensionStatus) => {
  source.forEach((item: any, index: number, arr: any) => {
    extensionStatus && appId.push(item["id"]["attributes"]["im:id"]);
    Object.keys(keyMap).forEach((key: string) => {
      keyMap[key] = tacticsFunctions[key] && tacticsFunctions[key](item);
    });
    arr[index] = JSON.parse(JSON.stringify(keyMap));
  });
  return source;
};

type Tactics = (item: any) => string;

//  策略整合
const tacticsFunctions: Record<string, Tactics> = {
  title: (item) => {
    return item["im:name"]["label"];
  },
  classify: (item) => {
    return item["category"]["attributes"]["label"];
  },
  img: (item) => {
    return item["im:image"]["0"]["label"];
  },
  keyWord: (item) => {
    return (
      item["im:name"]["label"] +
      item["im:artist"]["label"] +
      item["summary"]["label"]
    );
  },
};

onMounted(() => {
  getRecommendData();
});
</script>
<style lang="less" scoped>
.search-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  border-bottom: 1px solid #eee;
}
.main-wrapper {
  padding-top: 60px;
  height: 100%;
}
</style>
