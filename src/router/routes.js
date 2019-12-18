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
          },
          {
            path: "new-character",
            component: () => import("pages/Game/Character/NewCharacter.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "abilities/:charName",
            component: () => import("pages/Game/Character/Abilities.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "equipment/:charName",
            component: () => import("pages/Game/Character/Equipment.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "spells/:charName",
            component: () => import("pages/Game/Character/Spells.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "statistics/:charName",
            component: () => import("pages/Game/Character/Statistics.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "notes",
            component: () => import("pages/Game/Character/Notes.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "show-note/:noteId",
            component: () => import("pages/Game/Character/Note.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "edit-character/:charName",
            component: () => import("pages/Game/Character/EditCharacter.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "gameManagement",
            component: () =>
              import("pages/Game/GameManagement.vue"),
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
            component: () =>
              import("components/forms/features/featureForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "languageForm/:languageName",
            component: () =>
              import("components/forms/features/languageForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "proficiencyForm/:proficiencyName",
            component: () =>
              import("components/forms/features/proficiencyForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "skillForm/:skillName",
            component: () => import("components/forms/features/skillForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "spellForm/:spellName",
            component: () => import("components/forms/features/spellForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "traitForm/:traitName",
            component: () => import("components/forms/features/traitForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "armorForm/:armorName",
            component: () => import("components/forms/features/armorForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "gearForm/:gearName",
            component: () => import("components/forms/features/gearForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "toolForm/:toolName",
            component: () => import("components/forms/features/toolForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "vehicleForm/:vehicleName",
            component: () =>
              import("components/forms/features/vehicleForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "weaponForm/:weaponName",
            component: () => import("components/forms/features/weaponForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "conditionForm/:conditionName",
            component: () =>
              import("components/forms/features/conditionForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "damageTypeForm/:damageTypeName",
            component: () =>
              import("components/forms/features/damageTypeForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "magicSchoolForm/:magicSchoolName",
            component: () =>
              import("components/forms/features/magicSchoolForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "weaponPropertyForm/:weaponPropertyName",
            component: () =>
              import("components/forms/features/weaponPropertyForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "updateCharacter/generalInfo/:charName",
            component: () =>
              import(
                "components/forms/character/updateCharacterGeneralInfo.vue"
              ),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "updateCharacter/abilities/:charName",
            component: () =>
              import("components/forms/character/updateCharacterAbilities.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "updateCharacter/equipment/:charName",
            component: () =>
              import("components/forms/character/updateCharacterEquipment.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "updateCharacter/spells/:charName",
            component: () =>
              import("components/forms/character/updateCharacterSpells.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "noteForm/:noteId",
            component: () => import("components/forms/features/noteForm.vue"),
            beforeEnter: (to, from, next) => {
              loggedRequired(to, from, next);
            }
          },
          {
            path: "notes",
            component: () =>
              import("components/NoteList.vue"),
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
