import axios from "axios";
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
//import notifications from "../../functions/notifications";
export default {
  state: {
    characters: [],
    players: [],
    scenarioKey: null,
    messages: [],
    gameMaster: null,
    selectedCharacter: null,
    characterSelectionList: []
  },
  mutations: {
    updateCharacterList(state, characterList) {
      state.characterNameList = [];
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
    getCharacterList: state => {
      return state.characters;
    },
    getCharacterNameList: state => {
      return state.characterSelectionList;
    },
    getSelectedCharacter: state => {
      return state.selectedCharacter;
    },
    getPlayerList: state => {
      return state.players;
    },
    getMessages: state => {
      return state.messages;
    },
    getCharaterListNames: state => {
      var nameArray = [];
      state.characters.forEach(function(item) {
        nameArray.push({ name: item.name, selected: false });
      });
      return nameArray;
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
