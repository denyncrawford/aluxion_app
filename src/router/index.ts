import { createRouter, createWebHistory } from "vue-router";

//Routes

const routes = [
  {
    name: "Home",
    path: "/",
    meta: { title: "Home" },
    component: () => import("../views/Home.vue"),
  },
  {
    name: "results",
    path: "/results/:id",
    meta: { title: "Results" },
    component: () => import("../views/Results.vue"),
  },
  {
    name: "notFound",
    path: "/:page",
    component: () => import("../views/NotFound.vue"),
  },
];

// Export Router

export const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title as string} - Aluxion`;
  next();
});
