
<template>
  <div class="">
    <FindCharacter @foundCharacter="event => ViewCharacter(event)" />
    <span style="flex" v-if="Object.keys(state.characterData).length">
      <CharacterDescription :character="state.characterData" />
    </span>

  </div>
</template>

<script>
import { reactive } from 'vue';
import CharacterDescription from '../components/CharacterDescription.vue';
import FindCharacter from '../components/FindCharacter.vue';
export default {
  name: 'FindKnightsView',
  components: {
    FindCharacter,
    CharacterDescription
  },
  setup() {
    const state = reactive({
      characterData: {},
    });

    function ViewCharacter(data) {
      state.characterData = data;
    }

    return {
      state,
      ViewCharacter
    }
  }

}
</script>
