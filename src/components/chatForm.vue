<template>
  <div class="q-pa-md row justify-center">
    <div v-chat-scroll="{always: true, smooth: true}" id="chat-messages-form" class="scroll-here">
      <div v-for="message in messages" :key="message.id">
        <span>{{message.sender}}: </span>
        <span>{{message.text}} </span>
      </div>
    </div>
    <q-input outlined v-model="text" v-on:keyup.enter="submit()" label="Outlined" id="chat-message-input"/>
  </div>
</template>

<script>
  import VueChatScroll from "vue-chat-scroll";
  import Vue from "vue";
  Vue.use(VueChatScroll);

  export default {
    data() {
      return {
        messages: [],
        chosenSender: "me",
      };
    },

    methods: {
      submit(){
        //message type logic(whisp/ooc)
        this.messages.push({
          id: this.messages.length +1,
          sender: this.chosenSender,
          text: this.text,
          type: "sent",
        });
        //removing first message if above 50
        if(this.messages.length === 50){
          this.messages.shift();
        }
        this.text = "";
      },
      loadOldMessages(){

      },
      changeSender(sender){
        this.chosenSender = sender;
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
