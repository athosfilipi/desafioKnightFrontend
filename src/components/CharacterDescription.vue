<template>
  <div>
    <div>
      <br />
      <hr>
      <p> • Descrição: </p>
      <p>
        <input type="text" v-model="state.character._id" disabled />
        <label> » ID </label>
      </p>
      <p>
        <input type="text" placeholder="Nome" v-model="state.character.name" disabled />
        <label> » Nome</label>
      </p>
      <p>
        <ChangeNicknameCharacter :nickname="state.character.nickname" :characterId="state.character._id" />
      </p>
      <p>
        <input type="text" placeholder="Aniversário" v-model="state.character.birthday" disabled />
        <label> » Aniversário</label>
      </p>
      <p>
        <input type="text" placeholder="Aniversário" v-model="state.character.keyAttribute" disabled />
        <label> » Atributo principal</label>
      </p>
      
      <p> • Seus atributos: </p>
      <p>
        <input type="number" min="1" max="20" v-model="state.character.attributes.strength" disabled />
        <label> » Força </label>
      </p>
      <p>
        <input type="number" min="1" max="20" v-model="state.character.attributes.dexterity" disabled />
        <label> » Destreza </label>
      </p>
      <p>
        <input type="number" min="1" max="20" v-model="state.character.attributes.constitution" disabled />
        <label> » Constituição </label>
      </p>
      <p>
        <input type="number" min="1" max="20" v-model="state.character.attributes.intelligence" disabled />
        <label> » Inteligência </label>
      </p>
      <p>
        <input type="number" min="1" max="20" v-model="state.character.attributes.wisdom" disabled />
        <label> » Sabedoria </label>
      </p>
      <p>
        <input type="number" min="1" max="20" v-model="state.character.attributes.charisma" disabled />
        <label> » Carisma </label>
      </p>

      <p>• Armas:</p>
      <div v-for="(weapon, index) in state.character.weapons" v-bind:key="index">
        <div v-if="weapon.name">
          <br />
          <p>
            <input type="text" :value="weapon.name" disabled>
            <label> » Arma </label>
          </p>
          <p>
            <input type="text" :value="weapon.mod" disabled>
            <label> » Pontos </label>
          </p>
          <p>
            <input type="text" :value="weapon.attr" disabled>
            <label> » Atributo </label>
          </p>
          <p>
            <input type="text" :value="weapon.equipped" disabled>
            <label> » Equipado </label>
          </p>
        </div>
      </div>


      <br />
      <p>
        <KillCharacter :characterId="state.character._id" @onKillCharacter="event => onCharacterToHero(event)" />
      </p>
    </div>
  </div>
</template>

<script >
import { reactive } from 'vue';
import KillCharacter from './KillCharacter.vue';
import ChangeNicknameCharacter from './ChangeNicknameCharacter.vue';
export default {
  name: 'CharacterDescription',
  props: {
    character: {
      type: Object
    }
  },
  components: {
    KillCharacter,
    ChangeNicknameCharacter
  },

  setup(props, { emit }) {
    const state = reactive({
      character: props.character
    })

    const onCharacterToHero = (event) => {
      emit('onCharacterToHero', event)
    }

    return {
      state,
      onCharacterToHero
    }
  },
  watch: {
    character(newVal, oldVal) {
      this.state.character = newVal
    }
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
