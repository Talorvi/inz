import axios from "axios";
import { Notify } from "quasar";
//import Vue from "vue";
import VueCookies from "vue-cookies";
import notifications from "../../functions/notifications";
export default {
  state: {
    characters: [],
    players: [],
    scenarioKey: null,
    messages: [],
    gameMaster: null,
    selectedCharacter: null
  },
  mutations: {
    // updateCharacterList: (state, characterList) => {
    // },
    // updatePlayerList: (state, playerList) =>{
    // },
    // updateMessages: (state, messages) =>{
    //   }
    selectFirstAvailableCharacter(state) {
      if (state.characters.length > 0) {
        state.selectedCharacter = state.characters[0].name;
      } else {
        notifications.methods.sendErrorNotification(
          "Create your first character"
        );
      }
    },
    changeSelectedCharacter(state, index){
      state.selectedCharacter = state.characters[index];
    }
  },
  getters: {
    getCharacterList: state => {
      return state.characters;
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
    //request for messages
    //request for session info
  }
};
