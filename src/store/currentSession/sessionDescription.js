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
    scenarioStatus: null,
    isInGame: false,
    chatOpen: false,
    unreadMessages: 0
  },
  mutations: {
    updateCharacterList(context, characterList) {
      context.characterSelectionList = [];
      var isSelectedCharacter = false;
      //if there are no characters for player
      if (characterList.length < 1) {
        context.selectedCharacter = "No character";
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
      context.players = playerList;
    },
    updateGameMaster(context, payload) {
      context.gameMaster = payload.gameMaster;
      if (context.gameMaster === payload.userName) {
        context.isGameMaster = true;
      }
    },
    updateOnlinePlayerList(context, onlinePlayerList) {
      context.onlinePlayers = onlinePlayerList;
    },
    updateScenarioStatus(context, scenarioStatus) {
      context.scenarioStatus = scenarioStatus;
    },
    updateScenarioKey(context, scenarioKey) {
      context.scenarioKey = scenarioKey;
    },
    changeSelectedCharacter(state, payload) {
      state.characterSelectionList[payload.prevIndex].selected = false;
      state.selectedCharacter = state.characters[payload.index];
      state.characterSelectionList[payload.index].selected = true;
    },
    changeIsInGame(context, state) {
      context.isInGame = state;
    },
    changeChatOpen(context, value) {
      context.chatOpen = !value;
      if (context.chatOpen) {
        context.unreadMessages = 0;
      }
    },
    pushNewMessage(context) {
      context.unreadMessages++;
    },
    resetNewMessages(context) {
      context.unreadMessages = 0;
    }
  },
  getters: {
    getCharacters: state => {
      return state.characters;
    },
    getPlayer: state => {
      state.players.push(state.gameMaster);
      return state.players.sort();
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
      return state.onlinePlayers.sort();
    },
    getOfflinePlayers: state => {
      state.players.push(state.gameMaster);
      return state.players
        .filter(function(el) {
          return state.onlinePlayers.indexOf(el) < 0;
        })
        .sort();
    },
    getIsInGame: state => {
      return state.isInGame;
    },
    getChatOpen: state => {
      return state.chatOpen;
    },
    getUnreadMessages: state => {
      return state.unreadMessages;
    }
  },
  actions: {
    reloadCharacters(context) {
      var targetURL =
        "api/api/v1/scenario/" + context.getters.getScenarioKey + "/character";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "Bearer " + VueCookies.get("token")
          }
        })
        .then(response => {
          context.commit("updateCharacterList", response.data);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(
              "Couldn't reload character list"
            );
          }
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
    requestDeletePlayer(context, payload) {
      payload.data.loading.show();
      var targetURL =
        "api/action/remove/player/scenario/" + payload.scenarioKey;
      axios
        .delete(targetURL, {
          params: {
            player: payload.name
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
          console.log(error);
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(
              "Couldn't delete player"
            );
          }
          payload.data.loading.hide();
        });
    },
    reloadPlayers(context, scenarioKey) {
      var targetURL = "api/api/v1/scenario/" + scenarioKey + "/player";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "Bearer " + VueCookies.get("token")
          }
        })
        .then(response => {
          context.commit("updateGameMaster", {
            gameMaster: response.data.gameMaster
          });
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
          context.commit(
            "updatePlayerList",
            response.data.scenarioInfo.players
          );
          context.commit(
            "updateOnlinePlayerList",
            response.data.scenarioInfo.onlinePlayers
          );
          context.commit("updateCharacterList", response.data.userCharacters);
          context.commit("changeIsInGame", true);
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
    },
    toggleChatOpen(context, value) {
      context.commit("changeChatOpen", value);
    },
    addMessage(context) {
      context.commit("pushNewMessage");
    },
    rollDice(context, payload) {
      var postData = {
        characterName: payload.characterName.name,
        dices: payload.dices,
        value: payload.sides,
        visible: payload.visible
      };
      console.log(postData);
      var config = {
        headers: {
          Authorization: "Bearer " + VueCookies.get("token")
        }
      };
      var targetURL = "api/action/roll/scenario/" + payload.scenarioKey;
      axios.post(targetURL, postData, config).catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          notifications.methods.sendErrorNotification("Unauthorized");
        } else {
          notifications.methods.sendErrorNotification(
            "Couldn't load scenario correctly"
          );
        }
      });
    },
    createCharacter(context, payload) {
      var targetURL =
        "api/action/create/character/scenario/" + payload.scenarioKey;
      axios
        .post(targetURL, payload.general, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(() => {
          notifications.methods.sendSuccessNotification("Created character");
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateCharacterGeneralInfo(context, payload) {
      var targetURL =
        "api/action/update/character/scenario/" + payload.scenarioKey;
      axios
        .patch(targetURL, payload.general, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(() => {
          notifications.methods.sendSuccessNotification("Updated character");
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateCharacterAbilities(context, payload) {
      var targetURL =
        "api/action/update/characterAbilities/scenario/" + payload.scenarioKey;
      axios
        .patch(targetURL, payload.abilities, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(() => {
          notifications.methods.sendSuccessNotification("Updated character");
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateCharacterSpells(context, payload) {
      var targetURL =
        "api/action/update/characterSpells/scenario/" + payload.scenarioKey;
      axios
        .patch(targetURL, payload.spells, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(() => {
          notifications.methods.sendSuccessNotification("Updated character");
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateCharacterEquipment(context, payload) {
      var targetURL =
        "api/action/update/characterEquipment/scenario/" + payload.scenarioKey;
      axios
        .patch(targetURL, payload.equipment, {
          headers: { Authorization: "bearer " + context.getters.loggedIn }
        })
        .then(() => {
          notifications.methods.sendSuccessNotification("Updated character");
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    startScenario(context, payload) {
      var targetURL = "api/v1/scenario/" + payload.scenarioKey + "/start";
      axios
        .post(targetURL, {
          Authorization: "bearer " + context.getters.loggedIn
        })
        .then(() => {
          notifications.methods.sendSuccessNotification("Started scenario");
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
