import Home from "./components/Home.vue";
import config from './formkit.config.js'
import { plugin, defaultConfig } from "@formkit/vue";

// import "@formkit/themes/genesis";


export default {
    install: (app, options) => {
        app.use(plugin, defaultConfig(config))
        app.component("payment-form", Home);
    },
};