
<template>
  <div class="about">
    <CharacterList :characterClass="state.characterClass" />
  </div>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue';
import CharacterList from '../components/CharacterList.vue';

export default {
  name: 'CharacterView',
  components: {
    CharacterList,
  },
  props: {
    characterClass: {
      type: String,
      default: 'knight',
    }
  },
  setup(props, { emit }) {
    const state = reactive({
      characterClass: props.characterClass
    });

    return {
      state,
      name,
    }
  },
  watch: {
    characterClass: function (newVal) {      
      this.state.characterClass = newVal;            
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
  }
}
</style>
