import './assets/main.css'
import './assets/style.css'
import VueApexCharts from "vue3-apexcharts";
import config from './formkit.config.js'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { plugin, defaultConfig } from "@formkit/vue";
import { userState } from './contexts/User';
const app = createApp(App)

app.use(router)
app.use(VueApexCharts);
app.provide('userState', userState);
app.config.globalProperties.$apexcharts = VueApexCharts;
app.use(plugin, defaultConfig(config))


app.mount('#app')