import Form from "./components/Form.vue";
import Home from "./components/Home.vue";
import vSelect from 'vue-select'
import config from './formkit.config.js'
import 'vue-select/dist/vue-select.css';
import { plugin, defaultConfig } from "@formkit/vue";
import {VueRestrictedInputDirective} from 'vue-restricted-input';
import VueCreditCardValidation from 'vue-credit-card-validation';
import "@vemlavaraloucagamers/vg-credit-card/dist/style.css";

// import "@formkit/themes/genesis";


export default {
    install: (app, options) => {
        app.component('v-select', vSelect)
        app.use(plugin, defaultConfig(config))
        app.component("payment-form", Home);
        app.directive('mask', VueRestrictedInputDirective);
        app.use(VueCreditCardValidation);
    },
};