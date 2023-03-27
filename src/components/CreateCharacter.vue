
<template>
  <div>
    <div>
      <form action="" @submit.prevent="create">
        <p><input type="text" placeholder="Nome" v-model="character.name" /> </p>
        <p><input type="text" placeholder="Apelido" v-model="character.nickname" /> </p>
        <p><input type="text" placeholder="aniversario" v-model="character.birthday" /> </p>
        <br />
        <p>• Atributo principal:
          <select v-model="character.keyAttribute">
            <option value="strength" selected>strength</option>
            <option value="dexterity">dexterity</option>
            <option value="constitution">constitution</option>
            <option value="intelligence">intelligence</option>
            <option value="wisdom">wisdom</option>
            <option value="charisma">charisma</option>
          </select>
        </p>
        <br />
        <p>• Escolha seus atributos: </p>
        <p style="margin-left: 10px;">
          <input type="number" min="1" max="20" v-model="character.attributes.strength" />
          <label> » Força: </label>
        </p>
        <p style="margin-left: 10px;">
          <input type="number" min="1" max="20" v-model="character.attributes.dexterity" />
          <label> » Destreza: </label>
        </p>
        <p style="margin-left: 10px;">
          <input type="number" min="1" max="20" v-model="character.attributes.constitution" />
          <label> » Constituição: </label>
        </p>
        <p style="margin-left: 10px;">
          <input type="number" min="1" max="20" v-model="character.attributes.intelligence" />
          <label> » Inteligência: </label>
        </p>
        <p style="margin-left: 10px;">
          <input type="number" min="1" max="20" v-model="character.attributes.wisdom" />
          <label> » Sabedoria: </label>
        </p>
        <p style="margin-left: 10px;">
          <input type="number" min="1" max="20" v-model="character.attributes.charisma" />
          <label> » Carisma: </label>
        </p>
        <br />
        <select v-model="character.weaponsChoice">
          <option value="mesa" selected>Mesa</option>
          <option value="cadeira">Cadeira</option>
          <option value="porta">Porta</option>
          <option value="vagaNoBtg">Vaga No BTG</option>
        </select> » Arma
        <br />
        <button @click="createLegend">Crie essa lenda!</button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import KillCharacter from './KillCharacter.vue';
import { axiosRoutes } from '../services/axios'
export default {
  name: 'CharacterDescription',
  props: {
    character: {
      type: Object
    }
  },
  components: {
    KillCharacter
  },


  setup(props, { emit }) {
    const character = reactive({
      name: "",
      nickname: "",
      birthday: "",
      keyAttribute: "",
      attributes: {
        strength: 1,
        dexterity: 1,
        constitution: 1,
        intelligence: 1,
        wisdom: 1,
        charisma: 1,
      },
      weaponsChoice: "mesa",
      weapons: {
        name: "mesa",
        mod: 5,
        attr: "fisic",
        equipped: "true"
      },
    });

    onMounted(() => {
      character.name = "";
      character.nickname = "";
      character.birthday = "";
      character.keyAttribute = "";
      character.attributes.strength = 1;
      character.attributes.dexterity = 1;
      character.attributes.constitution = 1;
      character.attributes.intelligence = 1;
      character.attributes.wisdom = 1;
      character.attributes.charisma = 1;
      character.weapons = {}
      character.weapons.name = "mesa";
      character.weapons.mod = 5;
      character.weapons.attr = "fisic";
      character.weapons.equipped = true;
    });

    const choose = item => ({
      mesa: {
        name: "mesa",
        mod: 5,
        attr: "fisic",
        equipped: "true"
      },
      cadeira: {
        name: "cadeira",
        mod: 8,
        attr: "fisic",
        equipped: "true"
      },
      vagaNoBtg: {
        name: "vagaNoBtg",
        mod: 99999,
        attr: "magic",
        equipped: "true"
      }
    })[item];

    const createLegend = async () => {
      const { weaponsChoice } = character;
      const { name: weaponName, mod, attr, equipped } = choose(weaponsChoice)

      character.weapons = {}
      character.weapons.name = weaponName;
      character.weapons.mod = mod;
      character.weapons.attr = attr;
      character.weapons.equipped = equipped;

      const validate = [
        character.name,
        character.nickname,
        character.birthday,
        character.keyAttribute,
        character.attributes.strength,
        character.attributes.dexterity,
        character.attributes.constitution,
        character.attributes.intelligence,
        character.attributes.wisdom,
        character.attributes.charisma,
        character.weapons.name,
        character.weapons.mod,
        character.weapons.attr,
        character.weapons.equipped,
      ];

      const isValid = validate.every(item => Boolean(item) === true)
      if (!isValid) {
        alert("Uma Lenda precisa ser completa!, preencha todos os campos")
        return
      }

      try {
        await axiosRoutes.knights.createCharacter(character)
      } catch(error){
        console.error(new Error(`!!► createCharacter ${error}`))
      }

    }

    return {
      character,
      createLegend,
      choose
    };
  },


  watch: {
    character(newVal, oldVal) {
      // this.state.character = newVal
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
