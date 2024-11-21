const routes = [
  {
    path: "/login",
    component: () => import("src/pages/PageLogin.vue"), // Página de Login (sem layout)
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"), // Usa o layout para as demais páginas
    children: [
      { path: "", redirect: "/dashboard" },
      {
        path: "dashboard",
        component: () => import("src/pages/PageDashboard.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "entries",
        component: () => import("src/pages/PageEntradas.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "todos",
        component: () => import("src/pages/PageTodos.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "shopping",
        component: () => import("src/pages/PageCompras.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "week",
        component: () => import("src/pages/PageSemana.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "settings",
        component: () => import("src/pages/PageConfiguracoes.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
