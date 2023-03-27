<template>
  <div class="about">
    <h1>Lista de Guerreiros</h1>
    <div v-for="(knight, index) in knights" v-bind:key="index">
      <hr>      
      <p>• attributes: {{ knight.attributes }}</p>       
      <p>• birthday: {{ knight.birthday }}</p>
      <p>• keyAttribute: {{ knight.keyAttribute }}</p>
      <p>• name: {{ knight.name }}</p>
      <p>• nickname: {{ knight.nickname }}</p>
      <p>• weapons: {{ knight.weapons }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';

import axios from './../services/axios';

const knights = reactive([]);

onMounted(() => {
  (async () => {    
    const { data } = await axios.get('/knights');
    Object.assign(knights, data);
    
  })()
});

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
