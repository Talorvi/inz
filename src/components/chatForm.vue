<template>
  <div class="q-pa-md row justify-center">
    <div
      v-chat-scroll="{ always: true, smooth: true }"
      id="chat-messages-form"
      class="scroll-here"
    >
      <div v-for="message in messages" :key="message.id">
        <span v-if="message.isWhisper" class="whisper-message"
          >From {{ message.sender }}:
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
      stompClient: null
    };
  },
  computed: {
    scenarioKey() {
      return this.$store.getters.getScenarioKey;
    },
    userName(){
      return this.$store.getters.getUserName();
    }
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
      console.log("Scenario messages sub:" + scenarioID);
      let targetUrl = "/ws/scenario/" + scenarioID;
      this.stompClient.subscribe(targetUrl, this.displayMessage);
    },
    subscribeToPlayerMessages(playerName, scenarioID) {
      var targetUrl = "/ws/scenario/" + scenarioID + "/player/" + playerName;
      this.stompClient.subscribe(targetUrl, this.displayMessage);
      console.log("Player messages: " + playerName);
    },
    connect(event) {
      var socket = new SockJS("http://192.168.99.100:8080/rpg-server");
      var header = { "X-Authorization": this.$store.getters.loggedIn };
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(header, this.onConnected, this.onError);

      event.preventDefault();
    },
    onConnected() {
      this.subscribeToScenarioMessages(this.scenarioKey);
      this.subscribeToPlayerMessages(this.userName, this.scenarioKey);
    },
    onError() {
      console.log("Connection Error x");
    },
    checkWebSocketResponse(response) {
      if(response.action === "message"){
        this.displayMessage(response);
      }
      //else if
      //emit particular event depending on action type

    },
    //PostMessage Functionality
    submit() {
      let message = {
        id: this.messages.length + 1,
        sender: this.chosenSender,
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
      console.log("wysylam wiadomosc");
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
    displayMessage: function(response) {
      console.log("Odebrana wiadomosc: " + response);
      let responseBody = JSON.parse(response.body);
      console.log(responseBody.content);
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
      if (responseBody.body.sender === "admin") {
        message.isGM = true;
      }
      this.messages.push(message);
      if (this.messages.length === 50) {
        this.messages.shift();
      }
    },
    //Loading old messages functionality
    loadOldMessages() {
      var targetURL = "/api/api/v1/scenario/" + this.scenarioKey + "/message";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
        })
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            this.displayOldMessage(response.data[i]);
          }
        })
        .catch(error => {
          console.log(error);
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
    },
    displayOldMessage: function(response) {
      let responseBody = response;
      let message = {
        id: this.messages.length + 1,
        sender: responseBody.sender,
        text: responseBody.content,
        type: responseBody.type,
        isWhisper: false,
        isGM: false
      };
      if (responseBody.sender === "admin") {
        message.isGM = true;
      }
      if (responseBody.whisperTarget !== null) {
        message.isWhisper = true;
      }
      this.messages.push(message);
      if (this.messages.length === 50) {
        this.messages.shift();
      }
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
