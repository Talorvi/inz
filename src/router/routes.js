const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }]
  },
  {
    path: "/login",
    component: () => import("layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("pages/Login.vue") }]
  },
  {
    path: "/register",
    component: () => import("layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("pages/Register.vue") }]
  },
  {
    path: "/home",
    component: () => import("layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("pages/Home.vue") }]
  },
  {
  path: "/chat",
  component: () => import("layouts/MyLayout.vue"),
  children: [{ path: "", component: () => import("pages/ChatPage.vue") }]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
