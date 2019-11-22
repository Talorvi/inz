import axios from "axios";
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
import notifications from "../../functions/notifications";
export default {
  state: {
    characters: [],
    players: [],
    scenarioKey: "TESTSCEN",
    gameMaster: null,
    isGameMaster: false,
    selectedCharacter: null,
    characterSelectionList: [],
    onlinePlayers: [],
    scenarioStatus: null
  },
  mutations: {
    updateCharacterList(context, characterList) {
      console.log(characterList);
      context.characterSelectionList = [];
      var isSelectedCharacter = false;
      console.log(characterList.length);
      //if there are no characters for player
      if (characterList.length < 1) {
        context.selectedCharacter = null;
        context.characters = [];
      }
      //if there are characters for player
      else {
        //Check if selected character wasn't deleted
        if (context.selectedCharacter !== null) {
          for (var i = 0; i < characterList.length; i++) {
            if (characterList[i].name === context.selectedCharacter.name)
              isSelectedCharacter = true;
          }
        }
        if (isSelectedCharacter === false) {
          context.selectedCharacter = characterList[0];
          context.characterSelectionList.push({
            name: characterList[0].name,
            selected: true,
            owner: characterList[0].owner
          });
          for (let i = 1; i < characterList.length; i++) {
            context.characterSelectionList.push({
              name: characterList[i].name,
              selected: false,
              owner: characterList[i].owner
            });
          }
        } else {
          for (let i = 0; i < characterList.length; i++) {
            if (context.selectedCharacter.name === characterList[i].name) {
              context.characterSelectionList.push({
                name: characterList[i].name,
                selected: true,
                owner: characterList[i].owner
              });
            } else {
              context.characterSelectionList.push({
                name: characterList[i].name,
                selected: false,
                owner: characterList[i].owner
              });
            }
          }
        }
        context.characters = characterList;
      }
    },
    updatePlayerList(context, playerList) {
      console.log(playerList);
      context.players = playerList;
    },
    updateGameMaster(context, payload) {
      context.gameMaster = payload.gameMaster;
      if (context.gameMaster === payload.userName) {
        context.isGameMaster = true;
        console.log(context.isGameMaster);
      }
    },
    updateOnlinePlayerList(context, onlinePlayerList) {
      context.onlinePlayers = onlinePlayerList;
    },
    updateScenarioStatus(context, scenarioStatus) {
      console.log(scenarioStatus);
      context.scenarioStatus = scenarioStatus;
    },
    updateScenarioKey(context, scenarioKey) {
      console.log(scenarioKey);
      context.scenarioKey = scenarioKey;
    },
    changeSelectedCharacter(state, payload) {
      state.characterSelectionList[payload.prevIndex].selected = false;
      state.selectedCharacter = state.characters[payload.index];
      state.characterSelectionList[payload.index].selected = true;
      console.log("Commit clicked on " + state.characters[payload.index]);
    }
  },
  getters: {
    getCharacters: state => {
      return state.characters;
    },
    getPlayer: state => {
      return state.players;
    },
    getScenarioKey(state) {
      return state.scenarioKey;
    },
    getGameMaster(state) {
      return state.gameMaster;
    },
    getSelectedCharacter: state => {
      return state.selectedCharacter;
    },
    //Return list of character with info if they are currently selected
    getCharacterSelectionList: state => {
      return state.characterSelectionList;
    },
    getIsGameMaster(context) {
      return context.isGameMaster;
    },
    getOnlinePlayers: state => {
      return state.onlinePlayers;
    }
  },
  actions: {
    reloadCharacters(context, payload) {
      payload.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + "TESTSCEN" + "/character";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "Bearer " + VueCookies.get("token")
          }
        })
        .then(response => {
          context.commit("updateCharacterList", response.data);
          payload.data.loading.hide();
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(
              "Couldn't reload character list"
            );
          }
          payload.data.loading.hide();
        });
    },
    requestDeleteCharacter(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/action/remove/character/scenario/" + payload.scenarioKey;
      axios
        .delete(targetURL, {
          params: {
            character: payload.characterName
          },
          headers: {
            Authorization: "Bearer " + VueCookies.get("token")
          }
        })
        .then(response => {
          if (response.status === 200) {
            console.log(" delete request");
          }
          payload.data.loading.hide();
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(
              "Couldn't delete character"
            );
          }
          payload.data.loading.hide();
        });
    },
    reloadPlayers(context) {
      var targetURL = "api/api/v1/scenario/" + "TESTSCEN" + "/player";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "Bearer " + VueCookies.get("token")
          }
        })
        .then(response => {
          context.commit("updateGameMaster", response.data.gameMaster);
          context.commit("updatePlayerList", response.data.players);
          context.commit("updateOnlinePlayerList", response.data.onlinePlayers);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(
              "Couldn't reload player list"
            );
          }
        });
    },
    connectToScenario(context, scenarioKey) {
      var targetURL = "api/api/v1/scenario/" + scenarioKey + "/connect";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "Bearer " + VueCookies.get("token")
          }
        })
        .then(response => {
          console.log("Huge response");
          console.log(response.data);
          context.commit(
            "updateScenarioKey",
            response.data.scenarioInfo.scenarioKey
          );
          context.commit(
            "updateScenarioStatus",
            response.data.scenarioInfo.scenarioStatus
          );
          context.commit("updateGameMaster", {
            gameMaster: response.data.scenarioInfo.gameMaster,
            userName: context.getters.getUserName
          });
          console.log("Is here");
          context.commit(
            "updatePlayerList",
            response.data.scenarioInfo.players
          );
          console.log("Is here not");
          context.commit(
            "updateOnlinePlayerList",
            response.data.scenarioInfo.onlinePlayers
          );
          context.commit("updateCharacterList", response.data.userCharacters);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(
              "Couldn't load scenario correctly"
            );
          }
        });
    }
  }
};
