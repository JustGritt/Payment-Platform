import Form from "./components/Form.vue";
import Home from "./components/Home.vue";
import config from './formkit.config.js'
import 'vue-select/dist/vue-select.css';
import { plugin, defaultConfig } from "@formkit/vue";
import VueCreditCardValidation from 'vue-credit-card-validation';
import "@vemlavaraloucagamers/vg-credit-card/dist/style.css";

// import "@formkit/themes/genesis";


export default {
    install: (app, options) => {
        app.use(plugin, defaultConfig(config))
        app.component("payment-form", Home);
        app.use(VueCreditCardValidation);
    },
};