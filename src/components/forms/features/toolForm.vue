<template>
  <div>
    <div v-if="tool.scenarioKey === null">
      <h5>This tool cannot be edited</h5>
      <h5>Name: {{ tool.name }}</h5>
      <h5>Category: {{ tool.category }}</h5>
      <h5>Cost: {{ tool.cost }}</h5>
      <h5>Weight: {{ tool.weight }}</h5>
      <p>Description: {{ tool.description }}</p>
    </div>
    <q-form
      @submit="createFeature"
      @reset="onReset"
      class="q-gutter-md"
      v-else-if="toolName === 'new'"
    >
      <q-input filled label="Name" :rules="[]" v-model="tool.name" />
      <q-input filled label="Category" :rules="[]" v-model="tool.category" />
      <q-input filled label="Cost" :rules="[]" v-model="tool.cost" />
      <q-input filled label="Weight(pounds)" type="number" :rules="[]" v-model="tool.weight" />
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="tool.description"
      />
      <q-toggle color="green" label="Visible" v-model="tool.visible" />
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
      v-else-if="toolName !== 'new' && searchResultFound === true"
    >
      <h3>Tool: {{ tool.name }}</h3>
      <q-input filled label="Category" :rules="[]" v-model="tool.category" />
      <q-input filled label="Cost" :rules="[]" v-model="tool.cost" />
      <q-input filled label="Weight(pounds)" type="number" :rules="[]" v-model="tool.weight" />
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="tool.description"
      />
      <q-toggle color="green" label="Visible" v-model="tool.visible" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <div v-else>
      <h5>Haven't found tool with name: {{ toolName }}.</h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notifications from "../../../functions/notifications";
export default {
  data() {
    return {
      toolName: "",
      tool: {
        name: "",
        category: "",
        cost: "",
        weight: 0,
        description: "",
        visible: false
      },
      searchResultFound: false
    };
  },
  mounted() {
    this.toolName = this.$route.params.toolName;
    if (this.toolName !== "new") {
      this.getExactFeatureByName(this.toolName);
    }
    //new -> no fill to fields, submit creates a new one
    //existing -> fill fields, name cannot be changed , submit patch existing one
    //not new and not existing -> 404!
  },
  methods: {
    createFeature() {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/tool";
      axios
        .post(
          targetURL,
          {
            description: this.tool.description,
            name: this.tool.name,
            category: this.tool.category,
            cost: this.tool.cost,
            weight: this.tool.weight,
            visible: this.tool.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully created tool"
          );
          this.tool.description = "";
          this.tool.name = "";
          this.tool.category = "";
          this.tool.cost = "";
          this.tool.wight = 0;
          this.tool.visible = false;
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
        "/tool";
      axios
        .patch(
          targetURL,
          {
            description: this.tool.description,
            name: this.tool.name,
            category: this.tool.category,
            cost: this.tool.cost,
            weight: this.tool.weight,
            visible: this.tool.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully updated tool"
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
    onReset() {
      this.tool.description = "";
      this.tool.name = "";
      this.tool.category = "";
      this.tool.cost = "";
      this.tool.wight = 0;
      this.tool.visible = false;
    },
    getExactFeatureByName(toolName) {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/tool";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: toolName
          }
        })
        .then(response => {
          console.log("This is mounted method");
          var resp = response.data;
          console.log("This is returned feature", resp);
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].name.toLowerCase() === toolName.toLowerCase()) {
              console.log("Condition fulfilled" + resp[i].name.toLowerCase());
              this.tool = resp[i];
              this.searchResultFound = true;
              break;
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
