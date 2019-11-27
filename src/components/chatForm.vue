<template>
  <div class="q-pa-md row justify-center">
    <div
      v-chat-scroll="{ always: true, smooth: true }"
      id="chat-messages-form"
      class="scroll-here"
    >
      <div v-for="message in messages" :key="message.id">
        <span v-if="message.whisperTarget !== null" class="whisper-message"
          >From {{ message.sender }} to {{ message.whisperTarget }}:
        </span>
        <span v-else-if="message.type === 'system'" class="system-message"
          >[SYSTEM]:
        </span>
        <span
          v-else
          :class="{
            'system-message': message.type === 'system',
            'ooc-message':
              message.type === 'ooc' && message.type !== message.isGM,
            'gm-message': message.type === 'ooc'
          }"
          >{{ message.sender }}:
        </span>
        <span
          :class="{
            'system-message': message.type === 'system',
            'ooc-message': message.type === 'ooc'
          }"
          >{{ message.text }}
        </span>
      </div>
    </div>

    <q-input
      outlined
      v-model="text"
      v-on:keyup.enter="submit()"
      v-bind:label="$store.getters.getSelectedCharacter.name"
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
import notifications from "../functions/notifications";
export default {
  data() {
    return {
      messages: [],
      stompClient: null,
      text: ""
    };
  },
  //Disconnecting socket on leaving component
  beforeDestroy() {
    this.stompClient.disconnect(console.log("disconnect"));
  },
  mounted() {
    this.loadOldMessages();
    this.connect();
  },
  methods: {
    //Web socket functionality
    subscribeToScenarioMessages(scenarioID) {
      let targetUrl = "/ws/scenario/" + scenarioID;
      this.stompClient.subscribe(targetUrl, this.checkWebSocketResponseType);
    },
    subscribeToPlayerMessages(playerName, scenarioID) {
      var targetUrl = "/ws/scenario/" + scenarioID + "/player/" + playerName;
      this.stompClient.subscribe(targetUrl, this.checkWebSocketResponseType);
    },
    checkWebSocketResponseType: function(response) {
      console.log("Object response");
      let resp = response;
      var objectResponse = JSON.parse(resp.body);
      console.log("Ktoś wlazł:" + objectResponse.action);
      if (objectResponse.action === "message") {
        this.displayMessage(objectResponse.body);
      } else if (objectResponse.action === "reload") {
        if (objectResponse.target === "characters") {
          this.$store.dispatch("reloadCharacters",{
            data: this.$q
          });
        }
        //do some stuff here
      }
    },
    connect() {
      var socket = new SockJS("http://192.168.99.100:8080/rpg-server");
      var header = { "X-Authorization": this.$store.getters.loggedIn };
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(header, this.onConnected, this.onError);
    },
    onConnected() {
      this.subscribeToScenarioMessages(this.$store.getters.getScenarioKey);
      this.subscribeToPlayerMessages(
        this.$store.getters.getUserName,
        this.$store.getters.getScenarioKey
      );
    },
    onError() {
      console.log("Connection Error x");
    },
    //PostMessage Functionality
    submit() {
      let message = {
        id: this.messages.length + 1,
        sender: this.$store.getters.getSelectedCharacter.name,
        text: this.text,
        type: "character",
        isWhisper: false
      };
      if (this.checkSubmittedMessageCorrectness(message)) {
        this.postMessage(message.text);
        this.text = "";
      }
    },
    postMessage(text) {
      console.log("Sending message");
      var targetURL =
        "/api/action/message/scenario/" + this.$store.getters.getScenarioKey;
      axios
        .post(
          targetURL,
          {
            characterName: this.$store.getters.getSelectedCharacter.name,
            content: text
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
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
    displayMessage: function(response) {
      let responseBody = response;
      let message = {
        id: this.messages.length + 1,
        sender: responseBody.sender,
        text: responseBody.content,
        type: responseBody.type,
        whisperTarget: responseBody.whisperTarget,
        isGM: false
      };
      if (responseBody.sender === "admin") {
        message.isGM = true;
      }
      this.messages.push(message);
      if (this.messages.length === 50) {
        this.messages.shift();
      }
    },
    //Loading old messages functionality
    loadOldMessages() {
      var targetURL =
        "/api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/message";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
        })
        .then(response => {
          var msg = response.data.reverse();
          for (let i = 0; i < msg.length; i++) {
            this.displayMessage(msg[i]);
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(
              "Couldn't load old messages"
            );
          }
        });
    },
    checkSubmittedMessageCorrectness(message) {
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
