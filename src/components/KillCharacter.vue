
<template>
    <div class="">
        <button @click="killCharacter">Deletar Guerreiro</button>

    </div>
</template>
  
<script>
import { reactive, ref } from 'vue';
import { axiosRoutes } from '../services/axios';

export default {
    name: 'killCharacter',
    props: {
        characterId: {
            type: String,
            default: null,
        },
    },

    setup(props, { emit }) {
        const state = reactive({
            characterId: props.characterId,
        });

        async function killCharacter() {
            try {
                if (!state.characterId) return;
                const data = await axiosRoutes.knights.killCharacterById(state.characterId);
                if (data._id === state.characterId) {
                    alert('Ha! Herois nunca morrem!\n')
                    emit('onKillCharacter', data);
                }
            } catch (error) {
                console.error(new Error("!!► Error at killCharacter"+error));
            }
        }

        //tudo que retornar aqui fica disponível para o template
        return {
            state,
            killCharacter
        }
    }
}

</script>
  
<style scoped>
</style>
  