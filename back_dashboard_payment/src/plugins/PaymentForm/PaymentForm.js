import Form from "./components/Form.vue";
import vSelect from 'vue-select'
import config from './formkit.config.js'
import 'vue-select/dist/vue-select.css';
import { plugin, defaultConfig } from "@formkit/vue";
// import "@formkit/themes/genesis";


export default {
    install: (app, options) => {
        app.component('v-select', vSelect)
        app.use(plugin, defaultConfig(config))
        app.component("payment-form", Form);
    },
};