
<template>
  <div class="about">
    <h2>Crie seu heroi</h2>
    <CreateCharacter />
  </div>
</template>

<script>
import { reactive } from 'vue';
import CreateCharacter from '../components/CreateCharacter.vue';
export default {
  name: 'MakeKnightsView',
  components: {
    CreateCharacter
  },
  setup() {
    return {}
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
