<template>
  <div class="q-pa-md row justify-center">
    <div v-chat-scroll="{always: true, smooth: true}" id="chat-messages-form" class="scroll-here">
      <div v-for="message in messages" :key="message.id">
        <q-chat-message
          :name=message.sender
          :text="[message.text]"
          sent
        />
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
      };
    },

    methods: {
      submit(){
        this.messages.push({
          id: this.messages.length +1,
          sender: "Alicia",
          text: this.text,
          type: "sent"
        });
        this.text = " ";
        console.log(JSON.stringify(this.messages));
      },
    }
  };
</script>



<style scoped>
  .scroll-here {
    overflow: auto;
    height: 650px;
    width: 100%;
    max-width: 450px;

  }
</style>
