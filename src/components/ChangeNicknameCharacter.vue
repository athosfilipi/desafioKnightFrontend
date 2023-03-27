
<template>
    <input type="text" placeholder="Apelido" v-model="state.nickname" />
    <button @click="changeNickname">Alterar</button>
    <label> » Apelido</label>
</template>
  
<script>
import { reactive } from 'vue';
import { axiosRoutes } from '../services/axios';

export default {
    name: 'ChangeNicknameCharacter',
    props: {
        characterId: {
            type: String,
            default: null,
        },
        nickname: {
            type: String,
            default: null,
        },
    },

    setup(props, { emit }) {
        const state = reactive({
            characterId: props.characterId,
            nickname: props.nickname,
        });

        async function changeNickname() {
            try {
                if (!state.characterId || !state.nickname) return;
                const data = await axiosRoutes.knights.changeNicknameById(state.characterId, state.nickname);
                if (data._id === state.characterId) {
                    emit('onchangeNickname', data);
                }
            } catch (error) {
                console.error(new Error("!!► Error at killCharacter" + error));
            }
        }

        //tudo que retornar aqui fica disponível para o template
        return {
            state,
            changeNickname,
        }
    }
}

</script>
  
<style scoped></style>
  