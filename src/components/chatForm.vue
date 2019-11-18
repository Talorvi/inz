<template>
  <div class="q-pa-md row justify-center">
    <div
      v-chat-scroll="{ always: true, smooth: true }"
      id="chat-messages-form"
      class="scroll-here"
    >
      <div v-for="message in messages" :key="message.id">
        <span v-if="message.isWhisper" class="whisper-message">From {{ message.sender }}: </span>
        <span v-else-if="message.type ==='system'" class="system-message">[SYSTEM]: </span>
        <span v-else :class="{ 'system-message': message.type === 'system','ooc-message': message.type === 'ooc' && message.type !== message.isGM ,'gm-message': message.type === 'ooc' }">{{ message.sender }}: </span>
        <span :class="{ 'system-message': message.type === 'system', 'ooc-message': message.type === 'ooc' }">{{ message.text }} </span>
      </div>
    </div>

    <q-input
      outlined
      v-model="text"
      v-on:keyup.enter="submit()"
      v-bind:label="chosenSender"
      id="chat-message-input"
    >
      <q-btn round dense flat icon="send" v-on:click="submit()" />
    </q-input>
  </div>
</template>

<script>
import VueChatScroll from "vue-chat-scroll";
import Vue from "vue";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import axios from "axios";
import { Notify } from "quasar";
Vue.use(VueChatScroll);
export default {
  data() {
    return {
      messages: [],
      chosenSender: "Robert",
      stompClient: null,
      scenarioKey: "TESTSCEN"
    };
  },
  mounted() {
    this.loadOldMessages();
    this.connect();
  },
  methods: {
    submit() {
      let message = {
        id: this.messages.length + 1,
        sender: this.chosenSender,
        text: this.text,
        type: "character",
        isWhisper: false
      };
      if (this.checkMessageCorrectness(message)) {
        this.postMessage(message.text);
        this.text = "";
      }
    },
    subscribeToScenarioMessages(scenarioID) {
      console.log("Scenario messages:" + scenarioID);
      this.stompClient.subscribe("/ws/scenario/TESTSCEN", this.displayMessage);
    },
    subscribeToPlayerMessages(playerName) {
      this.stompClient.subscribe(
        "/ws/scenario/TESTSCEN/player/kappa",
        this.displayMessage
      );
      console.log("Player messages: " + playerName);
    },
    displayMessage: function(response) {
      let responseBody = JSON.parse(response.body);
      let message = {
        id: this.messages.length + 1,
        sender: responseBody.body.sender,
        text: responseBody.body.content,
        type: responseBody.body.type,
        isWhisper: false,
        isGM: false
      };
      if (responseBody.body.whisperTarget !== null) {
        message.isWhisper = true;
      }
      if(responseBody.body.sender === "admin"){
        message.isGM = true;
      }
      this.messages.push(message);
      if (this.messages.length === 50) {
        this.messages.shift();
      }
    },
    connect(event) {
      var socket = new SockJS("http://192.168.99.100:8080/rpg-server");
      this.stompClient = Stomp.over(socket);

      this.stompClient.connect({}, this.onConnected, this.onError);

      event.preventDefault();
    },
    onConnected() {
      this.subscribeToScenarioMessages("TESTSCEN");
      this.subscribeToPlayerMessages("kappa");
    },
    onError() {
      console.log("Connection Error x");
    },
    loadOldMessages() {
      var targetURL = "/api/api/v1/message/" + this.scenarioKey;
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
        })
        .then(response => {
          for (let i = 0; i < response.data.length; i++){
            this.disp(response.data[i]);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    changeSender(sender) {
      this.chosenSender = sender;
    },
    checkMessageCorrectness(message) {
      //If message starts with /w
      if (message.text.trim() === "") {
        return false;
      }
      if (/^\//.test(message.text)) {
        if (/^\/w\s+\w+\s+\w+/.test(message.text)) {
          message.type = "whisper";
          return true;
        } else if (/^\/ooc\s\w+/.test(message.text)) {
          message.type = "ooc";
          return true;
        } else {
          Notify.create({
            color: "red-5",
            textColor: "white",
            icon: "error",
            message: "Incorrect command",
            timeout: 1500,
            position: "bottom-right"
          });
          return false;
        }
      }
      return true;
    },
    postMessage(text) {
      console.log("test");
      var targetURL = "/api/action/message/scenario/" + this.scenarioKey;
      axios.post(
        targetURL,
        {
          characterName: this.chosenSender,
          content: text
        },
        {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
        }
      );
    },
    disp: function(response) {
      let responseBody = response;
      let message = {
        id: this.messages.length + 1,
        sender : responseBody.sender,
        text: responseBody.content,
        type: responseBody.type,
        isWhisper: false,
        isGM: false
      };
      if(responseBody.sender === "admin"){
        message.isGM = true;
      }
      if (responseBody.whisperTarget !== null) {
        message.isWhisper = true;
      }
      this.messages.push(message);
      if (this.messages.length === 50) {
        this.messages.shift();
      }
    },
  }
};
</script>

<style scoped>
/*creating special classes*/
.scroll-here {
  overflow: auto;
  height: 650px;
  width: 100%;
  max-width: 450px;
}
.gm-message {
  color: green;
}
.ooc-message {
  color: blue;
}
.whisper-message {
  color: salmon;
}
.system-message {
  font-weight: bold;
}
</style>
