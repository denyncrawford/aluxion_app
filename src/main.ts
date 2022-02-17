import { createApp } from "vue";
import { router } from "./router";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import GoogleMaps from "@fawmi/vue-google-maps";
import { HiSearch, FaBusAlt } from "oh-vue-icons/icons";
import { createPinia } from "pinia";
import App from "./App.vue";
import "animate.css";
import "./index.css";

const mapsKey = 'AIzaSyBYJ9AWtrb6oHQUC1mQ7yuWyZk1Dgc_UPQ' // Public key

console.log(import.meta.env);


// Icons are added to a global component

addIcons(HiSearch, FaBusAlt);

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(GoogleMaps, {
  load: {
    key: mapsKey,
  },
});
app.component("Icon", OhVueIcon);

app.mount("#app");
