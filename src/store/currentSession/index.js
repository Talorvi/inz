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
    changeSelectedCharacter(state, payload) {
      state.characterSelectionList[payload.prevIndex].selected = false;
      state.selectedCharacter = state.characters[payload.index];
      state.characterSelectionList[payload.index].selected = true;
      console.log("Commit clicked on " + state.characters[payload.index]);
    },
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
    }
  },
  actions: {
    reloadCharacters() {
      //data.data.loading.show();
      var targetURL = "api/api/v1/scenario/" + "TESTSCEN" + "/character";
      axios
        .get(targetURL, {
          headers: {
            Authorization: "Bearer " + VueCookies.get("token")
          }
        })
        .then(response => {
          this.commit("updateCharacterList", response.data);
          console.l;
          //data.data.loading.hide();
        })
        .catch(error => {
          console.log(error);
          //data.data.loading.hide();
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
            context.dispatch("reloadCharacters");
          }
          //console.log(response);
        });
    }
    //request for messages
    //request for session info
  }
};
