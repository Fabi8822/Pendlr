import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router';  // Füge den Router hier hinzu

loadFonts();

createApp(App)
  .use(vuetify)
  .use(router)  // Hier registrierst du den Router
  .mount('#app');
