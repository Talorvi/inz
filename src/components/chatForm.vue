<template>
  <div class="q-pa-md row justify-center">
    <div
      v-chat-scroll="{ always: true, smooth: true }"
      id="chat-messages-form"
      class="scroll-here"
    >
      <div v-for="message in messages" :key="message.id">
        <span>{{ message.sender }}: </span>
        <span>{{ message.text }} </span>
      </div>
    </div>

    <q-input
      outlined
      v-model="text"
      v-on:keyup.enter="submit()"
      v-bind:label="chosenSender"
      id="chat-message-input"
    >
      <q-btn  round dense flat icon="send" v-on:click="submit()"/>
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
    this.connect();
  },
  methods: {
    submit() {
      let message = {
        id: this.messages.length + 1,
        sender: this.chosenSender,
        text: this.text,
        messageType: "all"
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
      console.log("Player messages: " + playerName);
    },
    displayMessage: function(response) {
      let responseBody = JSON.parse(response.body);
      let message = {
        id: this.messages.length + 1,
        sender: responseBody.body.sender,
        text: responseBody.body.content,
        messageType: "all"
      };

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
      this.subscribeToPlayerMessages("test");
    },
    onError() {
      console.log("Connection Error x");
    },
    loadOldMessages() {},
    changeSender(sender) {
      this.chosenSender = sender;
    },
    checkMessageCorrectness(message) {
      //If message starts with /w
      if(message.text.trim() === ""){
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
      var targetURL = "ms/message/scenario/" + this.scenarioKey;
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
    }
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
</style>
