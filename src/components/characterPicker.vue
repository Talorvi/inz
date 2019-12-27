<template>
  <div>
    <div class="text-center">
      <q-btn
        color="accent"
        class="q-mb-md"
        @click="
          $router.push(
            '/game/' + $route.params.scenarioKey + '/new-character',
            () => {}
          )
        "
        >New Character</q-btn
      >
    </div>
    <div v-if="this.$store.getters.getCharacters.length < 1">
      You have no characters!
    </div>
    <q-list bordered separator v-else-if="this.$store.getters.getIsGameMaster">
      <q-item
        clickable
        v-ripple
        active-class="bg-teal-1"
        v-for="(character, index) in this.$store.getters
          .getCharacterSelectionList"
        :key="character.name"
        :active="character.selected"
      >
        <q-item-section v-on:click="clickedOnItem(character, index)">
          <q-item-label>{{ character.name }}</q-item-label>
          <q-item-label caption>{{ character.owner }}</q-item-label>
        </q-item-section>
        <q-btn
          size="12px"
          flat
          dense
          round
          icon="edit"
          color="black"
          v-on:click="editCharacter(character)"
        />
        <q-item-section side>
          <q-btn
            size="12px"
            flat
            dense
            round
            icon="delete"
            color="black"
            v-on:click="deleteCharacter(character, index)"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <q-list bordered separator v-else>
      <q-item
        active-class="bg-teal-1"
        clickable
        v-ripple
        v-for="(character, index) in this.$store.getters
          .getCharacterSelectionList"
        :key="character.name"
        :active="character.selected"
      >
        <q-item-section v-on:click="clickedOnItem(character, index)"
          >{{ character.name }}
        </q-item-section>
        <q-btn
          size="12px"
          flat
          dense
          round
          icon="delete"
          color="accent"
          v-on:click="deleteCharacter(character, index)"
        />
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    // this.$store.dispatch("reloadCharacters");
    // this.$store.dispatch("reloadPlayers");
  },
  data() {
    return {
      isGameMaster: false
    };
  },
  computed: {
    selectedCharacterList() {
      return this.$store.getters.getCharacterSelectionList;
    }
  },
  methods: {
    clickedOnItem(character, index) {
      if (character.name === this.$store.getters.getSelectedCharacter.name) {
        console.log("You cannot unselect character");
      } else {
        var prevIndex = 0;
        for (
          var i = 0;
          i < this.$store.getters.getCharacterSelectionList.length;
          i++
        ) {
          if (
            this.$store.getters.getCharacterSelectionList[i].name ===
            this.$store.getters.getSelectedCharacter.name
          ) {
            prevIndex = i;
          }
        }
        this.$store.commit("changeSelectedCharacter", {
          index: index,
          prevIndex: prevIndex
        });
      }
    },

    deleteCharacter(character, index) {
      if (confirm("Are you sure you want to delete this character?")) {
        this.$store.dispatch("requestDeleteCharacter", {
          data: this.$q,
          scenarioKey: this.$store.getters.getScenarioKey,
          characterName: character.name,
          index: index
        });
      }
    },

    editCharacter(character) {
      this.$router.push(
        "/game/" +
          this.$route.params.scenarioKey +
          "/edit-character/" +
          character.name,
        () => {}
      );
    }
  }
};
</script>
