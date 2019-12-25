<template>
  <div class="q-pa-md row" style="height: 100vh;">
    <div
      v-chat-scroll="{ always: true, smooth: true }"
      id="chat-messages-form"
      class="scroll-here q-pr-sm"
    >
      <div
        v-for="message in messages"
        :key="message.id"
        class="text-justify q-pl-sm q-pr-sm"
        :class="{
          'system-background': message.type === 'system',
          'ooc-background':
            message.type === 'ooc' &&
            message.sender !== $store.getters.getGameMaster,
          'gm-background':
            message.type === 'ooc' &&
            message.sender === $store.getters.getGameMaster,
          'whisper-background': message.whisperTarget !== null
        }"
        style="padding-top: 0.5rem;"
      >
        <div style="padding-bottom: 0.5rem">
          <span v-if="message.whisperTarget !== null"
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
                message.type === 'ooc' &&
                message.sender !== $store.getters.getGameMaster,
              'gm-message':
                message.type === 'ooc' &&
                message.sender === $store.getters.getGameMaster
            }"
            >{{ message.sender }}:
          </span>
          <span>
            <!--          :class="{-->
            <!--            'system-message': message.type === 'system',-->
            <!--            'ooc-message': message.type === 'ooc'-->
            <!--          }"-->
            {{ message.text }}
          </span>
        </div>
        <q-separator></q-separator>
      </div>
    </div>

    <q-input
      filled
      v-model="text"
      v-on:keyup.enter="submit()"
      v-bind:label="$store.getters.getSelectedCharacter.name"
      class="chat-message-input fixed-bottom-right"
      style="width: 100%;"
      color="accent"
    >
      <template v-slot:append>
        <q-btn
          round
          dense
          flat
          icon="send"
          color="accent"
          v-on:click="submit()"
        />
      </template>
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
import { Howl } from "howler";
Vue.use(VueChatScroll);
import notifications from "../functions/notifications";
export default {
  data() {
    return {
      newMessageSound: null,
      playerJoinedSound: null,
      messages: [],
      stompClient: null,
      text: ""
    };
  },
  //Disconnecting socket on leaving component
  beforeDestroy() {
    this.stompClient.disconnect(console.log("disconnect"));
    this.$store.commit("resetNewMessages");
  },
  mounted() {
    this.loadOldMessages();
    this.$store.commit("resetNewMessages");
    this.connect();

    this.newMessageSound = new Howl({
      src: ["statics/sounds/newmessage.mp3"]
    });

    this.playerJoinedSound = new Howl({
      src: ["statics/sounds/playerjoined.mp3"]
    });
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
      let resp = response;
      var objectResponse = JSON.parse(resp.body);
      if (objectResponse.action === "message") {
        this.displayMessage(objectResponse.body);
        if (!this.$store.getters.getChatOpen) {
          this.newMessageSound.play();
        }
      } else if (objectResponse.action === "reload") {
        if (objectResponse.target === "characters") {
          this.$store.dispatch("reloadCharacters", {
            data: this.$q
          });
        } else if (objectResponse.target === "players") {
          this.$store.dispatch(
            "reloadPlayers",
            this.$store.getters.getScenarioKey
          );
        }
        //do some stuff here
      }
    },
    connect() {
      var socket = new SockJS("http://localhost:8080/rpg-server");
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
      if (!this.$store.getters.getChatOpen) {
        this.$store.dispatch("addMessage");
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
          this.$store.commit("resetNewMessages");
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
  height: 90%;
  width: 100%;
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
.chat-message-input {
  height: 10%;
  position: sticky;
  bottom: 8px;
}
.ooc-background {
  background-color: rgba(0, 0, 255, 0.1);
  border-radius: 5px;
}
.whisper-background {
  background-color: rgba(250, 158, 114, 0.2);
  border-radius: 5px;
}
.gm-background {
  background-color: rgba(0, 255, 0, 0.1);
  border-radius: 5px;
}
</style>
