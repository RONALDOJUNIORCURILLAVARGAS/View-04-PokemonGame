import pokemonApi from '@/api/pokemonApi'

export const getPokemon=()=>{
    //el array from crea un arreglo basado en  un arrgle de 650 espacios
    //que no se puede modificar 
    //por eso utilizamos array from 
    const pokemonArr= Array.from(Array(650))
    //map es metodo que tienen los arreglos para barrer
    //cada una de sus posiciones y transformarla
    return pokemonArr.map(( _ ,index)=>index+1)
  

}

const getPokemonOptions=async()=>{
    //Desordenamos el arreglo 
    const mixedPokemon = getPokemon().sort(()=>Math.random()-0.5)
    //Recortamos los 4 primeros enviamos
    const pokemons=await getPokemonNames(mixedPokemon.splice(0,4))
    return pokemons
}
export const getPokemonNames=async([a,b,c,d]=[])=>{
    /* const resp= await pokemonApi.get('/150')
    console.log(a,b,c,d)
    console.log(resp.data.name,resp.data.id) */

    //Definir un arreglo de promesas
    const promiseArr=[
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`),
    ]
   const [p1,p2,p3,p4]=await Promise.all(promiseArr)
   return [
       {name:p1.data.name,id:p1.data.id},
       {name:p2.data.name,id:p2.data.id},
       {name:p3.data.name,id:p3.data.id},
       {name:p4.data.name,id:p4.data.id}
    ]  
}
export default getPokemonOptions