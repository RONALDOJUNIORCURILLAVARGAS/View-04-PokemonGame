<template>
  <div class="content-app" >
    <div class="headbar">
      <img src="@/assets/pokemonbanner.png" alt="pokebanner" srcset="">
    </div>
    <div class="head">
      <h1 class="life">
        <div class="box-life">
          <img class="icon-heart" v-for="index in life" :key="index" src="@/assets/hearth-life.svg" alt="icon-hearth" srcset="">
        </div>
        
      </h1>

      <h1 class="points text-general">Puntos : {{points}}</h1>
    </div>
    
    <h1 v-if="!pokemon" class="text-general">Espere por favor...</h1>
    <div v-else>
      <h1 class="text-general">{{message_refresh}} </h1>
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
      <button class="btn-new-game" @click="refreshpage">
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
    message_refresh:'¿Quién es este Pokémon?',
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
          this.message='Ya no te quedan vidas'
        }
      }
      else{
        this.message='Ya no puedes cambiar'
      
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
.text-general{
  color: rgb(235, 231, 0);
  text-shadow: 2px 2px 0 rgb(0, 95, 204), -2px -2px 0 rgb(0, 95, 204), 2px -2px 0 rgb(0, 95, 204), -2px 2px 0 rgb(0, 95, 204);
}
.btn-new-game{
  padding: 10px 20px;
  background-color: rgb(235, 231, 0);
  outline: none;
  border: none;
  border-radius: 5px;
  font-weight: 700;
  font-size: 24px;
  color:rgb(0, 95, 204);
  text-align: -webkit-match-parent;
  letter-spacing: -1.5px;
  transition: all .3s;
  cursor: pointer;
  user-select: none;
  text-transform: uppercase;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.btn-new-game:hover{
  transform: scale(1.3);
}
.content-app{
  width: 100%;
    height: 100vh;
    background-image: linear-gradient(to top, rgb(239, 83, 80), rgb(0, 95, 204));
}
.head{
  display: flex;
  justify-content: center;
}
.life{
  color: #2c3e50;
  width: 200px;
  display: block;
  text-align: start;
  font-size: 18px;
}
.box-life{
  display: flex;
  gap: 10px;
}
.icon-heart{
  width: 20px;
  height: 20px;
}
.points{
  right: 1rem;
  width: 200px;
  font-size: 18px;
}
.headbar{
  width: 100%;
  height: 100px;
  padding: 20px 0px;
  display: flex;
  justify-content: center;
}
@media only screen and (max-width: 600px) {
  .headbar{
    height: 60px;
  }
}
.headbar img{
  height: 100%;
}
</style>