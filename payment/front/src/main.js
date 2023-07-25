import './assets/main.css'
import './assets/style.css'
import VueApexCharts from "vue3-apexcharts";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PaymentForm from './plugins/PaymentForm/PaymentForm';

const app = createApp(App)

app.use(router)
app.use(VueApexCharts);
app.config.globalProperties.$apexcharts = VueApexCharts;

app.use(PaymentForm,{
    CLIENT_PUBLIC_TOKEN: '735sd0749388',
    CLIENT_SECRET_TOKEN: '091211dz2724'
})

app.mount('#app')

