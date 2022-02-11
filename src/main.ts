import { createApp } from 'vue'
import { router } from './router';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { HiSearch } from "oh-vue-icons/icons";
import { createPinia } from 'pinia'
import App from './App.vue'
import 'animate.css'
import './index.css'


// Icons are added to a global component

addIcons(HiSearch);

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.component("Icon", OhVueIcon);

app.mount('#app');
