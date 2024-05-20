import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Loading from 'vue-loading-overlay';



// Nucleo Icons
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import 'vue-loading-overlay/dist/css/index.css';
import ElementPlus from 'element-plus';
import materialKit from "./material-kit";
import 'element-plus/dist/index.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(materialKit);
app.use(Loading, {                // 可以在後面加上客製化樣式
  color: '#FF1111'
})
app.mount("#app");
