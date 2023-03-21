import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "@/assets/style/common.less";
import "@/assets/style/iconfont.less";
createApp(App).use(router).mount("#app");
