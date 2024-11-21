const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "/dashboard" }, // Redireciona '/' para '/dashboard'
      {
        path: "dashboard",
        component: () => import("src/pages/PageDashboard.vue"), // Página de Dashboard
      },
      {
        path: "entries",
        component: () => import("src/pages/PageEntradas.vue"), // Página de gastos
      },
      {
        path: "todos",
        component: () => import("src/pages/PageTodos.vue"), // Página de afazeres
      },
      {
        path: "shopping",
        component: () => import("src/pages/PageCompras.vue"), // Página de compras
      },
      {
        path: "week",
        component: () => import("src/pages/PageSemana.vue"), // Página de organização da semana
      },
      {
        path: "settings",
        component: () => import("src/pages/PageConfiguracoes.vue"), // Configurações
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
