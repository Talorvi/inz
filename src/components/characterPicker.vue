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
        <q-btn size="12px" flat dense round icon="delete" v-on:click="deleteCharacter(character)" />
      </q-item>
    </q-list>

    <q-list bordered separator v-else>
      <q-item
        active-class="bg-teal-1 text-grey-8"
        clickable
        v-ripple
        v-for="character in characters"
        :key="character.name"
        :active="character.selected"
        v-on:click="clickedOnItem(character)"
      >
        <q-item-section>{{ character.name }}</q-item-section>
        <q-btn size="12px" flat dense round icon="delete"  v-on:click="deleteCharacter(character)" />
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCharacter: null,
      characters: [
        { name: "alfa", selected: false },
        { name: "beta", selected: false },
        { name: "gamma", selected: false },
        { name: "delta", selected: false }
      ],
      isGameMaster: false
    };
  },
  computed() {},
  methods: {
    clickedOnItem(character) {
      if (this.selectedCharacter == null) {
        character.selected = !character.selected;
        this.selectedCharacter = character;
      } else if(this.selectedCharacter === character){
        console.log("You cannot unselect character");
      }
      else{
        this.selectedCharacter.selected = false;
        this.selectedCharacter = character;
        character.selected = true;
      }

      //setChosenCharacter
      //setActiveToElementList
    },
    deleteCharacter(character){
      for( var i = 0; i < this.characters.length; i++){
        if ( this.characters[i].name === character.name) {
          if (confirm("Are you sure you want to delete this character?")) {
            //send request to remove character
            //send request to retreive character
          }

        }
      }
    }
  },
  mounted() {
    //get list of characters
    //get list players
    //check if you are GM

  }
};
</script>
