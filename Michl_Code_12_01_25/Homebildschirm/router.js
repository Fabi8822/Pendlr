import { createRouter, createWebHistory } from 'vue-router';

// Importiere deine Komponenten
import ProfilePage from './components/ProfilePage.vue';

const routes = [
  
  {
    path: '/profile',
    name: 'profile-page',
    component: ProfilePage
  },
  // Weitere Routen können hier hinzugefügt werden
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
