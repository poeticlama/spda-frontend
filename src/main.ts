import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {router} from "./router.ts";
import {VueQueryPlugin} from "@tanstack/vue-query";
import {createPinia} from "pinia";

createApp(App)
    .use(router)
    .use(VueQueryPlugin)
    .use(createPinia())
    .mount('#app')

