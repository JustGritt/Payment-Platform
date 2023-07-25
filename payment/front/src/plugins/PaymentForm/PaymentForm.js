import Home from "./components/Home.vue";
import config from './formkit.config.js'
import { plugin, defaultConfig } from "@formkit/vue";
import VueCreditCardValidation from 'vue-credit-card-validation';
import { createToast } from 'mosha-vue-toastify';
// import the styling for the toast
import 'mosha-vue-toastify/dist/style.css'
// import "@formkit/themes/genesis";


export default {
    install: (app, options) => {
        app.use(VueCreditCardValidation);
        app.component("payment-form", Home);
        app.use(plugin, defaultConfig(config)) 
        app.config.globalProperties.$keyToken = (key) => {

        }
    },
};