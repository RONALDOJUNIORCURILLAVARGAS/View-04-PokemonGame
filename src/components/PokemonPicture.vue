<template>
  <div>
    <div class="pokemon-container">

     <img v-if="!showPokemon"
     :src="imgSrc" 
      class="hidden-pokemon"
      alt="pokemon" >
      <img v-else
      :src="imgSrc"
      class="fade-in"
      alt="pokemon" >
    </div>
    
  
  </div>
</template>

<script>
export default {
  props:{
    pokemonId:{
      type:Number,
      default:2,
      required:true
    },
    showPokemon:{
      type:Boolean,
      default:false,
      required:true
    }
  },
  computed:{
    imgSrc(){
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`
    }
  }
}
</script>
<!-- Se pone scoped para que el estilo se aplique solo a este componene-->
<style scoped>
/* Pokemon Picture */
.pokemon-container {
    height: 200px;
    display: flex;
    justify-content: center;
}
img {
    height: 200px;
    position: absolute;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
.hidden-pokemon {
    filter: brightness(0);
}
</style>