import { createRouter, createWebHistory } from 'vue-router';

//Routes

const routes = [
  {
    path: '/',
    meta: { title: 'Home' },
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    meta: { title: 'About' },
    component: () => import('../views/About.vue'),
  },
  {
    path: '/:page',
    component: () => import('../views/NotFound.vue'),
  },
];

// Export Router

export const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
});
