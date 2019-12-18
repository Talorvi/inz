<template>
  <div>
    <q-form
      @submit="createFeature"
      @reset="onReset"
      class="q-gutter-md"
      v-if="noteID === 'new'"
    >
      <q-input filled label="Name" :rules="[]" v-model="note.name" />
      <q-input filled label="Content" :rules="[]" v-model="note.content" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
    <q-form
      @submit="updateFeature"
      class="q-gutter-md"
      v-else-if="noteID !== 'new' && searchResultFound === true"
    >
      <q-input filled label="Name" :rules="[]" v-model="note.name" />
      <q-input filled label="Content" :rules="[]" v-model="note.content" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <div v-else>
      <h5>Haven't found note.</h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notifications from "../../../functions/notifications";
export default {
  data() {
    return {
      noteName: "",
      noteID: 0,
      note: {
        name: "",
        content: ""
      },
      searchResultFound: false
    };
  },
  mounted() {
    this.noteID = this.$route.params.noteId;
    if (this.noteID !== "new") {
      this.getExactFeatureByName(this.noteID);
    }
    //new -> no fill to fields, submit creates a new one
    //existing -> fill fields, name cannot be changed , submit patch existing one
    //not new and not existing -> 404!
  },
  methods: {
    createFeature() {
      var targetURL =
        "api/api/v1/scenario/" + this.$store.getters.getScenarioKey + "/note";
      axios
        .post(
          targetURL,
          {
            content: this.note.content,
            name: this.note.name
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully created note"
          );
          this.note.content = "";
          this.note.name = "";
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateFeature() {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/note/" +
        this.noteID;
      axios
        .patch(
          targetURL,
          {
            content: this.note.content,
            name: this.note.name
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully updated note"
          );
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    deleteNote(noteID) {
      if (confirm("Are you sure you want to delete this note?")) {
        var targetURL =
          "api/api/v1/scenario/" +
          this.$store.state.scenarioKey +
          "/note" +
          noteID;
        axios
          .delete(targetURL, {
            headers: { Authorization: "bearer " + this.$store.state.loggedIn }
          })
          .then(response => {
            console.log(response);
            //this.$router.push("");
          })
          .catch(error => {
            if (error.response.status === 401) {
              notifications.methods.sendErrorNotification("Unauthorized");
            } else {
              notifications.methods.sendErrorNotification(error.response.data);
            }
          });
      }
    },
    onReset() {
      this.note.content = "";
      this.note.name = "";
    },
    getExactFeatureByName(noteId) {
      var targetURL =
        "api/api/v1/scenario/" + this.$store.getters.getScenarioKey + "/note";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
        })
        .then(response => {
          var resp = response.data;
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].id == noteId) {
              this.note = resp[i];
              this.searchResultFound = true;
            }
          }
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
