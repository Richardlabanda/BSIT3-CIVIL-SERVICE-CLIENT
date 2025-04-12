import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Ensure the router is imported

import "@/assets/css/main.css"; // Ensure CSS is loaded

const app = createApp(App);
app.use(router); // Use the router
app.mount("#app");
