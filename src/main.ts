import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {router} from "./router.ts";
import {VueQueryPlugin} from "@tanstack/vue-query";
import {createPinia} from "pinia";
import {useUserStore} from "./store/user.ts";

const pinia = createPinia();

createApp(App)
    .use(pinia)
    .use(router)
    .use(VueQueryPlugin)
    .mount('#app')

const userStore = useUserStore()
userStore.init()