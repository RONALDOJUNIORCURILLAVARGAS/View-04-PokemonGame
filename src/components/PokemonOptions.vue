<template>
  <div>
     <div class="options-container">
       <ul>
         <li v-for="pokemon in pokemons" 
         :key="pokemon.id"
         @click="$emit('selectionPokemon',pokemon.id)">
           {{pokemon.name}}
         </li>
         
       </ul>
     </div>
  </div>
</template>

<script>
export default {
  props:{
    pokemons:{
      type: Array,
      required:true
    }
  },
  methods: {
    hola(){
     // this.$emit()
    }
  },
  
}
</script>

<style scoped>
/* Pokemon Options */
ul {
    list-style-type: none;
    padding: 0px;
    
}
li {
    background-color: rgb(239, 83, 80);
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
    padding: 10px 20px;
    transition: all .3s;
    color: rgb(235, 231, 0);
    font-size: 24px;
    font-weight: 700;
    text-shadow: 2px 2px 0 rgb(0, 95, 204), -2px -2px 0 rgb(0, 95, 204), 2px -2px 0 rgb(0, 95, 204), -2px 2px 0 rgb(0, 95, 204);
}

li:hover {
    background-color: rgba(235, 231, 0,0.8);
    transform: scale(1.2);
    border: 2px solid rgb(239, 83, 80);
}

.options-container {
    display: flex;
    justify-content: center;
}
</style>