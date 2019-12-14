import axios from "axios";
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
import notifications from "../../functions/notifications";
export default {
  state: {
    feature: {
      name: "",
      description: "",
      visible: false
    },
    features: []
  },
  mutations: {
    updateFeatureTable(context, payload) {
      context.features = [];
      for (var i = 0; i < payload.length; i++) {
        context.features.push(payload[i].name);
      }
    },
    updateSingleFeature(context, payload) {
      context.feature = null;
      console.log("Before loop" + payload.results[0].name.toLowerCase());
      for (var i = 0; i < payload.results.length; i++) {
        if (
          payload.results[i].name.toLowerCase() ===
          payload.searchPhrase.toLowerCase()
        ) {
          console.log(
            "Condition fulfilled" + payload.results[i].name.toLowerCase()
          );
          context.feature = payload.results[i];
          break;
        }
      }
    },
    clearFeature(context) {
      context.feature = {
        name: "",
        description: "",
        visible: false
      };
    }
  },
  getters: {
    getFeature(context) {
      return context.feature;
    }
  },
  actions: {
    //Abilities?
    getExactFeatureByName(context, payload) {
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/feature";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + context.getters.loggedIn },
          params: {
            name: payload.name
          }
        })
        .then(response => {
          console.log("lambda");
          var resp = response.data;
          console.log("This is returned feature", resp);
          context.commit("updateSingleFeature", {
            results: response.data,
            searchPhrase: payload.name
          });
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },

    getFeatureByName(context, payload) {
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/feature";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + context.getters.loggedIn },
          params: {
            name: payload.name
          }
        })
        .then(response => {
          console.log("This is returned feature", response);
          context.commit("updateFeatureTable", response.data);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateFeature(context, payload) {
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/feature";
      axios
        .patch(
          targetURL,
          {
            description: payload.feature.description,
            name: payload.feature.name,
            visible: payload.feature.visible
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    deleteFeature(context, payload) {
      var targetURL =
        "api/api/v1/scenario/" +
        payload.scenarioKey +
        "/feature" +
        payload.featureName;
      axios
        .delete(targetURL, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },

    getLanguageByName(context, payload) {
      var targetURL =
        "api/api/v1/scenario/" + payload.scenarioKey + "/language";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "bearer " + context.getters.loggedIn,
            params: {
              name: payload.name
            }
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    createLanguage(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" + payload.scenarioKey + "/language";
      axios
        .post(
          targetURL,
          {
            name: payload.language.name,
            script: payload.language.script,
            type: payload.language.type,
            visible: payload.language.visible
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateLanguage(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" + payload.scenarioKey + "/language";
      axios
        .patch(
          targetURL,
          {
            name: payload.language.name,
            script: payload.language.script,
            type: payload.language.type,
            visible: payload.language.visible
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    deleteLanguage(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" +
        payload.scenarioKey +
        "/language" +
        payload.languageName;
      axios
        .delete(targetURL, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },

    getProficiencyByName(context, payload) {
      var targetURL =
        "api/api/v1/scenario/" + payload.scenarioKey + "/proficiency";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "bearer " + context.getters.loggedIn,
            params: {
              name: payload.name
            }
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    createProficiency(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" + payload.scenarioKey + "/proficiency";
      axios
        .post(
          targetURL,
          {
            name: payload.proficiency.name,
            type: payload.proficiency.type,
            visible: payload.proficiency.visible
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateProficiency(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" + payload.scenarioKey + "/proficiency";
      axios
        .patch(
          targetURL,
          {
            name: payload.proficiency.name,
            type: payload.proficiency.type,
            visible: payload.proficiency.visible
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    deleteProficiency(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" +
        payload.scenarioKey +
        "/proficiency" +
        payload.proficiencyName;
      axios
        .delete(targetURL, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },

    getSkillByName(context, payload) {
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/skill";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "bearer " + context.getters.loggedIn,
            params: {
              name: payload.name
            }
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    createSkill(context, payload) {
      payload.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/skill";
      axios
        .post(
          targetURL,
          {
            abilityScore: payload.skill.abilityScore,
            description: payload.skill.description,
            name: payload.skill.name,
            visible: payload.skill.visible
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateSkill(context, payload) {
      payload.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/skill";
      axios
        .patch(
          targetURL,
          {
            abilityScore: payload.skill.abilityScore,
            description: payload.skill.description,
            name: payload.skill.name,
            visible: payload.skill.visible
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    deleteSkill(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" +
        payload.scenarioKey +
        "/skill" +
        payload.skillName;
      axios
        .delete(targetURL, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },

    getSpellByName(context, payload) {
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/spell";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "bearer " + context.getters.loggedIn,
            params: {
              name: payload.name
            }
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    createSpell(context, payload) {
      payload.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/spell";
      axios
        .post(
          targetURL,
          {
            castingTime: payload.spell.castingTime,
            components: payload.spell.components,
            concentration: payload.spell.concentration,
            description: payload.spell.description,
            duration: payload.spell.duration,
            higherLevels: payload.spell.higherLevels,
            level: payload.spell.level,
            magicSchool: payload.spell.magicSchool,
            material: payload.spell.material,
            name: payload.spell.name,
            range: payload.spell.range,
            ritual: payload.spell.ritual,
            visible: payload.spell.visible
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateSpell(context, payload) {
      payload.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/spell";
      axios
        .patch(
          targetURL,
          {
            castingTime: payload.spell.castingTime,
            components: payload.spell.components,
            concentration: payload.spell.concentration,
            description: payload.spell.description,
            duration: payload.spell.duration,
            higherLevels: payload.spell.higherLevels,
            level: payload.spell.level,
            magicSchool: payload.spell.magicSchool,
            material: payload.spell.material,
            name: payload.spell.name,
            range: payload.spell.range,
            ritual: payload.spell.ritual,
            visible: payload.spell.visible
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    deleteSpell(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" +
        payload.scenarioKey +
        "/spell" +
        payload.spellName;
      axios
        .delete(targetURL, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },

    getTraitByName(context, payload) {
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/trait";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "bearer " + context.getters.loggedIn,
            params: {
              name: payload.name
            }
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    createTrait(context, payload) {
      payload.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/trait";
      axios
        .post(
          targetURL,
          {
            description: payload.trait.description,
            name: payload.trait.name,
            visible: payload.trait.visible
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateTrait(context, payload) {
      payload.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/trait";
      axios
        .patch(
          targetURL,
          {
            description: payload.trait.description,
            name: payload.trait.name,
            visible: payload.trait.visible
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    deleteTrait(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" +
        payload.scenarioKey +
        "/trait" +
        payload.traitName;
      axios
        .delete(targetURL, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },

    //equipment
    getArmorByName(context, payload) {
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/armor";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "bearer " + context.getters.loggedIn,
            params: {
              name: payload.name
            }
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    createArmor(context, payload) {
      payload.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/armor";
      axios
        .post(
          targetURL,
          {
            armorClass: {
              base: payload.armor.armorClass.base,
              dexBonus: payload.armor.armorClass.dexBonus,
              maxBonus: payload.armor.armorClass.maxBonus
            },
            cost: payload.armor.cost,
            name: payload.armor.name,
            stealthDisadvantage: payload.armor.stealthDisadvantage,
            strMinimum: payload.strMinimum,
            visible: payload.armor.visible,
            weight: payload.armor.weight
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateArmor(context, payload) {
      payload.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/armor";
      axios
        .patch(
          targetURL,
          {
            armorClass: {
              base: payload.armor.armorClass.base,
              dexBonus: payload.armor.armorClass.dexBonus,
              maxBonus: payload.armor.armorClass.maxBonus
            },
            cost: payload.armor.cost,
            name: payload.armor.name,
            stealthDisadvantage: payload.armor.stealthDisadvantage,
            strMinimum: payload.strMinimum,
            visible: payload.armor.visible,
            weight: payload.armor.weight
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    deleteArmor(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" +
        payload.scenarioKey +
        "/armor" +
        payload.armorName;
      axios
        .delete(targetURL, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },

    getGearByName(context, payload) {
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/gear";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "bearer " + context.getters.loggedIn,
            params: {
              name: payload.name
            }
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    createGear(context, payload) {
      payload.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/gear";
      axios
        .post(
          targetURL,
          {
            cost: payload.gear.cost,
            description: payload.gear.description,
            name: payload.gear.name,
            visible: payload.gear.visible,
            weight: payload.gear.weight
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    udpateGear(context, payload) {
      payload.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/gear";
      axios
        .patch(
          targetURL,
          {
            cost: payload.gear.cost,
            description: payload.gear.description,
            name: payload.gear.name,
            visible: payload.gear.visible,
            weight: payload.gear.weight
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    deleteGear(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" +
        payload.scenarioKey +
        "/gear" +
        payload.gearName;
      axios
        .delete(targetURL, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },

    getToolByName(context, payload) {
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/tool";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "bearer " + context.getters.loggedIn,
            params: {
              name: payload.name
            }
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    createTool(context, payload) {
      payload.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/tool";
      axios
        .post(
          targetURL,
          {
            category: payload.tool.category,
            cost: payload.tool.cost,
            description: payload.tool.description,
            name: payload.tool.name,
            visible: payload.tool.visible,
            weight: payload.tool.weight
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateTool(context, payload) {
      payload.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/tool";
      axios
        .patch(
          targetURL,
          {
            category: payload.tool.category,
            cost: payload.tool.cost,
            description: payload.tool.description,
            name: payload.tool.name,
            visible: payload.tool.visible,
            weight: payload.tool.weight
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    deleteTool(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" +
        payload.scenarioKey +
        "/tool" +
        payload.toolName;
      axios
        .delete(targetURL, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },

    getVehicleByName(context, payload) {
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/vehicle";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "bearer " + context.getters.loggedIn,
            params: {
              name: payload.name
            }
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    createVehicle(context, payload) {
      payload.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/vehicle";
      axios
        .post(
          targetURL,
          {
            cost: payload.vehicle.cost,
            description: payload.vehicle.description,
            name: payload.vehicle.name,
            visible: payload.vehicle.visible,
            weight: payload.vehicle.weight
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateVehicle(context, payload) {
      payload.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/vehicle";
      axios
        .patch(
          targetURL,
          {
            cost: payload.vehicle.cost,
            description: payload.vehicle.description,
            name: payload.vehicle.name,
            visible: payload.vehicle.visible,
            weight: payload.vehicle.weight
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    deleteVehicle(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" +
        payload.scenarioKey +
        "/vehicle" +
        payload.vehicleName;
      axios
        .delete(targetURL, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },

    getWeaponByName(context, payload) {
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/weapon";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "bearer " + context.getters.loggedIn,
            params: {
              name: payload.name
            }
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    createWeapon(context, payload) {
      payload.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/weapon";
      axios
        .post(
          targetURL,
          {
            category: payload.weapon.category,
            cost: payload.weapon.cost,
            damageBonus: payload.weapon.damageBonus,
            damageDice: payload.weapon.damageDice,
            damageType: payload.weapon.damageType,
            longRange: payload.weapon.longRange,
            longThrowRange: payload.weapon.longThrowRange,
            name: payload.weapon.name,
            normalRange: payload.weapon.normalRange,
            normalThrowRange: payload.weapon.normalThrowRange,
            properties: payload.weapon.properties,
            visible: payload.weapon.visible,
            weaponRange: payload.weapon.weaponRange,
            weight: payload.weapon.weight
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateWeapon(context, payload) {
      payload.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + payload.scenarioKey + "/weapon";
      axios
        .patch(
          targetURL,
          {
            category: payload.weapon.category,
            cost: payload.weapon.cost,
            damageBonus: payload.weapon.damageBonus,
            damageDice: payload.weapon.damageDice,
            damageType: payload.weapon.damageType,
            longRange: payload.weapon.longRange,
            longThrowRange: payload.weapon.longThrowRange,
            name: payload.weapon.name,
            normalRange: payload.weapon.normalRange,
            normalThrowRange: payload.weapon.normalThrowRange,
            properties: payload.weapon.properties,
            visible: payload.weapon.visible,
            weaponRange: payload.weapon.weaponRange,
            weight: payload.weapon.weight
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    deleteWeapon(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" +
        payload.scenarioKey +
        "/weapon" +
        payload.weaponName;
      axios
        .delete(targetURL, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },

    //types
    getConditionByName(context, payload) {
      var targetURL =
        "api/api/v1/scenario/" + payload.scenarioKey + "/condition";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "bearer " + context.getters.loggedIn,
            params: {
              name: payload.name
            }
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    createCondition(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" + payload.scenarioKey + "/condition";
      axios
        .post(
          targetURL,
          {
            description: payload.condition.description,
            name: payload.condition.name,
            visible: payload.condition.visible
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateCondition(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" + payload.scenarioKey + "/condition";
      axios
        .patch(
          targetURL,
          {
            description: payload.condition.description,
            name: payload.condition.name,
            visible: payload.condition.visible
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    deleteCondition(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" +
        payload.scenarioKey +
        "/condition" +
        payload.conditionName;
      axios
        .delete(targetURL, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },

    getDamageTypeByName(context, payload) {
      var targetURL =
        "api/api/v1/scenario/" + payload.scenarioKey + "/damageType";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "bearer " + context.getters.loggedIn,
            params: {
              name: payload.name
            }
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    createDamageType(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" + payload.scenarioKey + "/damageType";
      axios
        .post(
          targetURL,
          {
            description: payload.damageType.description,
            name: payload.damageType.name,
            visible: payload.damageType.visible
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateDamageType(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" + payload.scenarioKey + "/damageType";
      axios
        .patch(
          targetURL,
          {
            description: payload.damageType.description,
            name: payload.damageType.name,
            visible: payload.damageType.visible
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    deleteDamageType(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" +
        payload.scenarioKey +
        "/damageType" +
        payload.damageTypeName;
      axios
        .delete(targetURL, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },

    getMagicSchoolByName(context, payload) {
      var targetURL =
        "api/api/v1/scenario/" + payload.scenarioKey + "/magicSchool";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "bearer " + context.getters.loggedIn,
            params: {
              name: payload.name
            }
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    createMagicSchool(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" + payload.scenarioKey + "/magicSchool";
      axios
        .post(
          targetURL,
          {
            description: payload.magicSchool.description,
            name: payload.magicSchool.name,
            visible: payload.magicSchool.visible
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateMagicSchool(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" + payload.scenarioKey + "/magicSchool";
      axios
        .patch(
          targetURL,
          {
            description: payload.magicSchool.description,
            name: payload.magicSchool.name,
            visible: payload.magicSchool.visible
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    deleteMagicSchool(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" +
        payload.scenarioKey +
        "/magicSchool" +
        payload.magicSchoolName;
      axios
        .delete(targetURL, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },

    getWeaponPropertyByName(context, payload) {
      var targetURL =
        "api/api/v1/scenario/" + payload.scenarioKey + "/weaponProperty";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "bearer " + context.getters.loggedIn,
            params: {
              name: payload.name
            }
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    createWeaponProperty(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" + payload.scenarioKey + "/weaponProperty";
      axios
        .post(
          targetURL,
          {
            description: payload.weaponProperty.description,
            name: payload.weaponProperty.name,
            visible: payload.weaponProperty.visible
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateWeaponProperty(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" + payload.scenarioKey + "/weaponProperty";
      axios
        .patch(
          targetURL,
          {
            description: payload.weaponProperty.description,
            name: payload.weaponProperty.name,
            visible: payload.weaponProperty.visible
          },
          {
            headers: { Authorization: "bearer " + context.getters.loggedIn }
          }
        )
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    deleteWeaponProperty(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/api/v1/scenario/" +
        payload.scenarioKey +
        "/weaponProperty" +
        payload.weaponPropertyName;
      axios
        .delete(targetURL, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    }
  }
};
