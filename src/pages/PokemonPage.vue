<template>
  <div >
    <div class="head">
      <h1 class="life">Vidas : {{life}}</h1>
      <h1 class="points">Puntos : {{points}}</h1>
    </div>
    
    <h1 v-if="!pokemon">Espere por favor...</h1>
    <div v-else>
      <h1 >{{message_refresh}} </h1>
      <!-- TODO:img-->
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
      <!-- TODO:Opciones-->
    <PokemonOptions 
    :pokemons="pokemonArr"
    @selection-pokemon="checkAnswer($event)"
    />

    <template v-if="showAnswer" >
     <h2 class="fade-in">{{message}}</h2>
      
    </template>
    <template v-if="life===0">
      <button @click="refreshpage">
        Nuevo juego
      </button>
    </template>
    
    </div>
      
  </div>
</template>

<script>
//Number, required
import PokemonOptions from '../components/PokemonOptions.vue'
import PokemonPicture from '../components/PokemonPicture.vue'
import getPokemonOptions from '@/helpers/getPokemonOptions'
//console.log(getPokemonOptions())

export default {
name:'Pokemon Page',
components:{
    PokemonOptions,
    PokemonPicture
},
data() {
  return {
    pokemonArr:[],
    pokemon:null,
    showPokemon:false,
    showAnswer: false,
    message:'',
    message_refresh:'¿Quien es este pokémon?',
    life:3,
    points:0,
    counter_click:true
  }
},
methods: {
  async mixPokemonArray(){
    this.pokemonArr=await getPokemonOptions()
    //Agarramos un pokemos de los 4
    //de manera aleatoria
    const rndInt=Math.floor(Math.random()*4)
    this.pokemon=this.pokemonArr[rndInt]
    //console.log(this.pokemon)
  },
  checkAnswer(selectedid){
    if(this.counter_click){
          if(this.life>0){
            this.counter_click=false
            this.showPokemon=true
            this.showAnswer=true
            if(selectedid===this.pokemon.id){
              this.message=`Correcto, es ${this.pokemon.name}`
              this.points+=10
            }else{
              this.message=`Oops fallaste, era ${this.pokemon.name}`
              --this.life
            }
            //Despues de 3 segundos de ser ejecutado se recargara la pagina
            setTimeout(()=>{
              this.message_refresh='Recargando en  3...'
            },0)
            setTimeout(()=>{
              this.message_refresh='Recargando en  2...'
            },1000)
            setTimeout(()=>{
              this.message_refresh='Recargando en  1...'
            },2000)
            setTimeout(this.newGame, 3000)
        }
        else{
          this.showAnswer=true
          this.message='Ya no te quedan vidas, recarga la pagina mrd!'
        }
      }
      else{
        this.message='Habil te crees mongol, ya no puedes cambiar'
      
      }   

  },
  newGame(){
    this.showAnswer=false
    this.showPokemon=false
    this.pokemonArr=[]
    this.pokemon=null
    this.counter_click=true
    this.message_refresh='¿Quien es este pokémon?'
    this.mixPokemonArray()
    
  },
  refreshpage(){
    this.newGame()
    this.life=3
    this.points=0
    this.mixPokemonArray()
  }
},
//Es un metodo que se llama de una sola vez
mounted() {
  this.mixPokemonArray()
},

}
</script>
<style scoped>
.head{
  display: flex;
  justify-content: center;
}
.life{
  color: blue;
  width: 200px;
}
.points{
  right: 1rem;
  width: 200px;
}
</style>