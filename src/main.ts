import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { createI18n, useI18n } from "vue-i18n";

// Import custom language file
import zh from "./locale/zh";
import en from "./locale/en";

// Call with I18n option
const i18n = createI18n({
  legacy: true,
  locale: "zh",
  messages: {
    en: {
      message: {
        good: "Good",
        bad: "Bad"
      },
      menu: {
        ...en
      }
    },
    zh: {
      message: {
        good: "很好",
        bad: "差"
      },
      menu: {
        ...zh
      }
    }
  }
});

const app = createApp(App, {
  setup() {
    return useI18n();
  }
});

// const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(antd)
  .use(i18n)
  .mount("#app");
