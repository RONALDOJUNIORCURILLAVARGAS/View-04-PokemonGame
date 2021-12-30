import {shallowMount,mount} from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage'
import { pokemons } from '../mocks/pokemons.mock';

describe('PokemonPage component', () => {
    let wrapper
    //let mixPokemonArraySpy
    beforeEach(()=>{
        //mixPokemonArraySpy=jest.spyOn(PokemonPage.methods,'mixPokemonArray')
        wrapper=shallowMount(PokemonPage)
    })
    test('debe de hace match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    })
    test('debe de llamar mixPokemonArray al montar', () => {
        const mixPokemonArraySpy=jest.spyOn(PokemonPage.methods,'mixPokemonArray')
        const wrapper=shallowMount(PokemonPage)
        expect(mixPokemonArraySpy).toHaveBeenCalled();
        //Esperamos que solo sea llamado una vez
        expect(mixPokemonArraySpy).toHaveBeenCalledTimes(1);
    })
    test('debe de hacer match con el snapshot cuando cargan los pokemon', () => {
        //El shallowMautn que monta de manera sutil
        //El mount monta todo
       
        const wrapper=mount(PokemonPage,{
            data() {
                return {
                  pokemonArr:pokemons,
                  pokemon:pokemons[0],
                  showPokemon:false,
                  showAnswer: false,
                  message:'',
                  message_refresh:'¿Quien es este pokémon?',
                  life:3,
                  points:0,
                  counter_click:true
                }
              }
        })
        expect(wrapper.html()).toMatchSnapshot();

    })
    test('debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {
        //mount
        const wrapper=shallowMount(PokemonPage,{
            data() {
                return {
                  pokemonArr:pokemons,
                  pokemon:pokemons[0],
                  showPokemon:false,
                  showAnswer: false,
                  message:'',
                  message_refresh:'¿Quien es este pokémon?',
                  life:3,
                  points:0,
                  counter_click:true
                }
              }
        })
        //PokemonPicture debe de existir
        const PokemonPicture=wrapper.find('pokemon-picture-stub')
        expect(PokemonPicture.exists()).toBeTruthy();

        //PokemonOption debe de existir
        const PokemonOptions = wrapper.find('pokemon-options-stub')
        expect(PokemonOptions.exists()).toBeTruthy()

        //PokemonPicture attribute pokemonId==5
        expect(PokemonPicture.attributes('pokemonid')).toBe('1');

        //PokemonOptions attribute pokemons toBe true
        const pokemones=PokemonOptions.attributes('pokemons')
        //expect(wrapper.find('pokemon-options-stub').attributes('pokemons')).toBeTruthy()
        expect(pokemones).toBeTruthy()
    })
    test('pruebas con CheckAnswer', async () => {
        const wrapper=shallowMount(PokemonPage,{
            data() {
                return {
                  pokemonArr:pokemons,
                  pokemon:pokemons[0],
                  showPokemon:false,
                  showAnswer: false,
                  message:'',
                  message_refresh:'¿Quien es este pokémon?',
                  life:3,
                  points:0,
                  counter_click:true
                }
              }
        })
        //Llamamos el metodo desde aqui
        console.log(wrapper.vm)
        //Como las propiedades son reactivas VUE tiene q esperar el cambio pór
        //eso se utilizara el await
        await wrapper.vm.checkAnswer(1)
        expect(wrapper.find('h2').exists()).toBeTruthy()
        expect(wrapper.vm.showPokemon).toBeTruthy()
        expect(wrapper.find('h2').text()).toBe(`Correcto, es ${pokemons[0].name}`)
        await wrapper.vm.checkAnswer(5)
        expect(wrapper.vm.message).toBe(`Oops fallaste, era ${pokemons[0].name}`)
    })

    
    
    
    
});