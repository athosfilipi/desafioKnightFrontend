
<template>
  <div class="">
    <h1>Localize uma lenda!</h1>    
    <div v-if="state.characterId">
      characterId {{ state.characterId }}
    </div>
    <div v-else="state.characterId">
      Aguardando ID
    </div>

    <input type="text" placeholder="Digite o ID" v-model="characterId" />
    <button @click="searchCharacter">Botão</button>
    
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { axiosRoutes } from '../services/axios';

export default {
  props: {
    characterId: {
      type: String,
      default: null,
    },
    teste: {
      type: Array
    },
  },

  setup(props, { emit }) {
    const state = reactive({
      characterId: props.characterId,
      teste: props.teste,
    });

    const characterId = ref();

    async function searchCharacter() {
      try {
        if (!characterId.value) return;
        const data = await axiosRoutes.knights.findCharacterById(characterId.value)
        if (data._id === characterId.value) {
          emit('foundCharacter', data)
        }
      } catch (error) {
        console.error(new Error("!!► Error at searchCharacter"))
      }
    }

    //tudo que retornar aqui fica disponível para o template
    return {
      state,
      characterId,
      searchCharacter
    }
  }
}

</script>
