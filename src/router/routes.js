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
          },
          {
            path: "characters",
            component: () => import("pages/Game/CharacterPicker.vue"),
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
        },
        children: [
          {
            path: "featureForm/:featureName",
            component: () => import("components/forms/featureForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "languageForm/:languageName",
            component: () => import("components/forms/languageForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "proficiencyForm/:proficiencyName",
            component: () => import("components/forms/proficiencyForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "skillForm/:skillName",
            component: () => import("components/forms/skillForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "spellForm/:spellName",
            component: () => import("components/forms/spellForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "traitForm/:traitName",
            component: () => import("components/forms/traitForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "armorForm/:armorName",
            component: () => import("components/forms/armorForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "gearForm/:gearName",
            component: () => import("components/forms/gearForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "toolForm/:toolName",
            component: () => import("components/forms/toolForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "vehicleForm/:vehicleName",
            component: () => import("components/forms/vehicleForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "weaponForm/:weaponName",
            component: () => import("components/forms/weaponForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "conditionForm/:conditionName",
            component: () => import("components/forms/conditionForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "damageTypeForm/:damageTypeName",
            component: () => import("components/forms/damageTypeForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "magicSchoolForm/:magicSchoolName",
            component: () => import("components/forms/magicSchoolForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "weaponPropertyForm/:weaponPropertyName",
            component: () => import("components/forms/weaponPropertyForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          }
        ]
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
