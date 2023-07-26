import './assets/main.css'
import './assets/style.css'
import VueApexCharts from "vue3-apexcharts";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { userState } from './contexts/User';
const app = createApp(App)

app.use(router)
app.use(VueApexCharts);
app.provide('userState', userState);
app.config.globalProperties.$apexcharts = VueApexCharts;



app.mount('#app')

