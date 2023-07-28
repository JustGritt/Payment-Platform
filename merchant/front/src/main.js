import './assets/index.css'
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import VueNumberInput from '@chenfengyuan/vue-number-input';
import PaymentForm from './plugins/PaymentForm/PaymentForm';

const app = createApp(App);
const pinia = createPinia();
const vfm = createVfm()
app.use(vfm)

app.component(VueNumberInput.name, VueNumberInput);
app.use(PaymentForm)
app.use(pinia);
app.use(router);
app.mount('#app');
