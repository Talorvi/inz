<template>
  <div>
    <div v-if="this.noteList.length < 1">
      You have no notes!
      <button>Create note</button>
    </div>

    <q-list bordered separator v-else>
      <q-item
        clickable
        v-ripple
        v-for="(note, index) in this.noteList"
        :key="note.id"
      >
        <q-item-section v-on:click="clickedOnItem(note.id)"
          >{{ note.name }}
        </q-item-section>
        <q-btn
          size="12px"
          flat
          dense
          round
          icon="delete"
          color="black"
          v-on:click="deleteNote(note.id, index)"
        />
      </q-item>
    </q-list>
  </div>
</template>

<script>
import axios from "axios";
import notifications from "../functions/notifications";
export default {
  mounted() {
    this.getNoteList();
  },
  data() {
    return {
      noteList: []
    };
  },
  computed: {
    selectedCharacterList() {
      return this.$store.getters.getCharacterSelectionList;
    }
  },
  methods: {
    clickedOnItem(index) {
      this.$router.push("/" + "test" + "/noteForm/" + index);
    },
    deleteNote(noteID, index) {
      var targetURL =
        "api/api/v1/scenario/" + this.$store.getters.getScenarioKey + "/note/" + noteID;
      axios
        .delete(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
        })
        .then(() => {
          this.noteList.splice(index, 1);
          notifications.methods.sendSuccessNotification("Successfully deleted note");
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    getNoteList() {
      var targetURL =
        "api/api/v1/scenario/" + this.$store.getters.getScenarioKey + "/note";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
        })
        .then(response => {
          var resp = response.data;
          this.noteList = resp;
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    }
  }
};
</script>
