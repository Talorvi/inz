import axios from "axios";
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
//import notifications from "../../functions/notifications";
export default {
  state: {
    characters: [],
    players: [],
    scenarioKey: "TESTSCEN",
    gameMaster: null,
    selectedCharacter: null,
    characterSelectionList: []
  },
  mutations: {
    updateCharacterList(state, characterList) {
      state.characterSelectionList = [];
      for (var i = 0; i < characterList.length; i++) {
        if (
          state.selectedCharacter !== null &&
          state.selectedCharacter.name === characterList.name
        ) {
          state.characterSelectionList.push({
            name: characterList[i].name,
            index: i,
            selected: true
          });
        } else {
          state.characterSelectionList.push({
            name: characterList[i].name,
            index: i,
            selected: false
          });
        }
        if (state.selectedCharacter === null && characterList.length > 0) {
          state.characterSelectionList[0].selected = true;
          state.selectedCharacter = characterList[0];
        }
      }
      state.characters = characterList;
    },
    unselectCharacter(state, payload) {
      state.characterSelectionList[payload.prevIndex].selected = false;
      state.selectedCharacter = state.characters[payload.index];
      state.characterSelectionList[payload.index].selected = true;
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
    getCharacterNameList: state => {
      return state.characterSelectionList;
    }
  },
  actions: {
    reloadCharacters(context, data) {
      data.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + "TESTSCEN" + "/character";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "Bearer " + VueCookies.get("token")
          }
        })
        .then(response => {
          this.commit("updateCharacterList", response.data);
          data.data.loading.hide();
        })
        .catch(error => {
          console.log(error);
          data.data.loading.hide();
        });
    },
    requestDeleteCharacter(context, payload) {
      var targetURL =
        "api/action/remove/character/scenario/" + payload.scenarioKey;
      axios.delete(targetURL, {
        params: {
          character: payload.characterName
        },
        headers: {
          Authorization: "Bearer " + VueCookies.get("token")
        }
      });
    }
    //request for messages
    //request for session info
  }
};
