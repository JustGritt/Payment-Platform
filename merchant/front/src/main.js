import "./assets/index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import PaymentForm from "@/plugins/PaymentForm/PaymentForm";
import router from "./router";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.use(PaymentForm)
app.mount('#app');
