import VueCookies from "vue-cookies";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout"),

    children: [
      {
        path: "",
        component: () => import("pages/Index.vue"),
        beforeEnter: (to, from, next) => {
          loggedDisallowed(to, from, next);
        }
      },
      {
        path: "login",
        component: () => import("pages/Auth/Login.vue"),
        beforeEnter: (to, from, next) => {
          loggedDisallowed(to, from, next);
        }
      },
      {
        path: "register",
        component: () => import("pages/Auth/Register.vue"),
        beforeEnter: (to, from, next) => {
          loggedDisallowed(to, from, next);
        }
      },
      {
        path: "home",
        component: () => import("pages/User/Home.vue"),
        beforeEnter: (to, from, next) => {
          loggedRequired(to, from, next);
        }
      },
      {
        path: "profile",
        component: () => import("pages/User/Profile.vue"),
        beforeEnter: (to, from, next) => {
          loggedRequired(to, from, next);
        }
      },
      //testing routes to delete
      {
        path: "new-scenario",
        component: () => import("pages/Scenario/NewScenario.vue"),
        beforeEnter: (to, from, next) => {
          loggedRequired(to, from, next);
        }
      },
      {
        path: "success/:code",
        component: () => import("pages/Scenario/NewScenarioSuccess.vue"),
        beforeEnter: (to, from, next) => {
          loggedRequired(to, from, next);
        }
      },
      {
        path: "join-scenario",
        component: () => import("pages/Scenario/JoinScenario.vue"),
        beforeEnter: (to, from, next) => {
          loggedRequired(to, from, next);
        }
      },
      {
        path: "join-success",
        component: () => import("pages/Scenario/JoinSuccess.vue"),
        beforeEnter: (to, from, next) => {
          loggedRequired(to, from, next);
        }
      },
      {
        path: "game/:scenarioKey",
        component: () => import("pages/Game/Game.vue"),
        beforeEnter: (to, from, next) => {
          loggedRequired(to, from, next);
        },
        children: [
          {
            path: "roll",
            component: () => import("pages/Game/Roll.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          }
        ]
      },
      //testing routes to delete
      {
        path: "test",
        component: () => import("pages/ComponentTester.vue"),
        beforeEnter: (to, from, next) => {
          loggedRequired(to, from, next);
        }
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Others/Error404.vue")
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
