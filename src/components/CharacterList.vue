
<template>
  <div class="about">
    <h1 v-if="state.characterClass === 'knight'">Guerreiros</h1>
    <h1 v-if="state.characterClass === 'hero'">Herois</h1>
    <div v-for="(knight, index) in knights" v-bind:key="index">
      <br />
      <CharacterDescription :character="knight" @onCharacterToHero="event => handleCharacterToHero(event)" />
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import { axiosRoutes } from '../services/axios';
import CharacterDescription from './CharacterDescription.vue';

const choose = item => ({
      'knight': async () => axiosRoutes.knights.findAllKnights(),
      'hero': async () => axiosRoutes.knights.findAllHeroes(),
    })[item] || (() => console.error(new Error('!!► Wrong choose!')))()

export default {
  name: 'CharacterList',
  components: {
    CharacterDescription,
  },
  props: {
    characterClass: {
      type: String
    }
  },
  setup(props, { emit }) {
    const state = reactive({
      characterClass: props.characterClass
    });
    
    const knights = reactive([]);
    const hasNotKnights = reactive(!knights.length)
    
    onMounted(async () => {
      const data = await choose(state.characterClass)();
      Object.assign(knights, data);
    });

    const handleCharacterToHero = async(event) => {
      knights.length = 0;
      const data = await choose(state.characterClass)();        
      Object.assign(knights, data);

    }

    return {
      state,
      knights,
      choose,
      handleCharacterToHero,
    }
  },
  watch: {
    // atualiza o componente de acordo com a nova prop
    characterClass(newVal, oldVal) {
      (async () => {
        if (newVal === oldVal) return;
        this.knights.length = 0;
        this.state.characterClass = newVal;       
        const data = await choose(this.state.characterClass)();        
        Object.assign(this.knights, data);
      })();
    },
  }
}

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
