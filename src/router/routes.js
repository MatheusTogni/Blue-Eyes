const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "/entries" }, // Redireciona '/' para '/entries'
      {
        path: "entries",
        component: () => import("src/pages/PageEntradas.vue"),
      },
      {
        path: "settings",
        component: () => import("src/pages/PageConfiguracoes.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
