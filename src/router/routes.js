import VueCookies from "vue-cookies";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
    beforeEnter: (to, from, next) => {
      loggedDisallowed(to, from, next);
    }
  },
  {
    path: "/login",
    component: () => import("layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("pages/Login.vue") }],
    beforeEnter: (to, from, next) => {
      loggedDisallowed(to, from, next);
    }
  },
  {
    path: "/register",
    component: () => import("layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("pages/Register.vue") }],
    beforeEnter: (to, from, next) => {
      loggedDisallowed(to, from, next);
    }
  },
  {
    path: "/home",
    component: () => import("layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("pages/Home.vue") }],
    beforeEnter: (to, from, next) => {
      loggedRequired(to, from, next);
    }
  },
  {
    path: "/chat",
    component: () => import("layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("pages/ChatPage.vue") }],
    beforeEnter: (to, from, next) => {
      loggedRequired(to, from, next);
    }
  },
  {
    path: "/profile",
    component: () => import("layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("pages/Profile.vue") }],
    beforeEnter: (to, from, next) => {
      loggedRequired(to, from, next);
    }
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

// eslint-disable-next-line no-unused-vars
function loggedDisallowed(to, from, next) {
  if (VueCookies.get("token")) {
    next({ path: "/home" });
  } else {
    next();
  }
}

// eslint-disable-next-line no-unused-vars
function loggedRequired(to, from, next) {
  if (!VueCookies.get("token")) {
    next({ path: "/login" });
  } else {
    next();
  }
}

export default routes;
