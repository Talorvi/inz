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
    onlinePlayers: []
  },
  mutations: {
    updateCharacterList(context, characterList) {
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
      context.gameMaster = playerList.gameMaster;
      context.onlinePlayers = playerList.onlinePlayers;
      context.players = playerList;
      console.log("Username: " + context.gameMaster);
      if (context.gameMaster === "admin") {
        context.isGameMaster = true;
        console.log(context.isGameMaster);
      }
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
    reloadCharacters(context) {
      //data.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + "TESTSCEN" + "/character";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "Bearer " + VueCookies.get("token")
          }
        })
        .then(response => {
          context.commit("updateCharacterList", response.data);
          //data.data.loading.hide();
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification("Couldn't reload character list");
          }
        });
    },
    requestDeleteCharacter(context, payload) {
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
          //console.log(response);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification("Couldn't delete character");
          }
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
          context.commit("updatePlayerList", response.data);
          //data.data.loading.hide();
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification("Couldn't reload player list");
          }
        });
    }
  }
};
