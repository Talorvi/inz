<template>
  <div>
    <q-list bordered separator v-if="isGameMaster">
      <q-item
        clickable
        v-ripple
        v-for="character in characters"
        :key="character.id"
      >
        <q-item-section>
          <q-item-label>Item with caption</q-item-label>
          <q-item-label caption>Caption</q-item-label>
        </q-item-section>
        <q-btn
          size="12px"
          flat
          dense
          round
          icon="delete"
          v-on:click="deleteCharacter(character)"
        />
      </q-item>
    </q-list>

    <q-list bordered separator v-else>
      <q-item
        active-class="bg-teal-1"
        clickable
        v-ripple
        v-for="(character, index) in this.$store.getters.getCharacterSelectionList"
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
          color="black"
          v-on:click="deleteCharacter(character, index)"
        />
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("reloadCharacters");
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
      console.log("before:" + this.$store.getters.getSelectedCharacter.name);
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
      console.log("after:" + this.$store.getters.getSelectedCharacter.name);
    },
      deleteCharacter(character, index) {
        console.log(character.name);
        if (confirm("Are you sure you want to delete this character?")) {
          this.$store.dispatch("requestDeleteCharacter", {
            data: this.$q,
            scenarioKey: "TESTSCEN",
            characterName: character.name,
            index: index
          });
        }

    }
  }
};
</script>
