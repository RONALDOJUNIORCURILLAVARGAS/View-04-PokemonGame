import { shallowMount } from "@vue/test-utils";
import PokemonOptions from "@/components/PokemonOptions";
import { pokemons } from "../mocks/pokemons.mock";
describe("PokemonOptions Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        //pokemons:pokemons
        pokemons,
      },
    })
  })
  test("debe de hacer match con el snapshot", () => {
    //console.log(wrapper.html())
    expect(wrapper.html()).toMatchSnapshot()
  })
  test('debe de mostrar las 4 opciones correctamente', () => {
      //debe de tener 4 li
      //console.log(pokemons)
      const lista=wrapper.findAll('li')
      expect(lista.length).toBe(4);

      //cada li debe de tener su nombre del pokemon
      //expect(lista[0].text()).toBe('pikachu');
      for (const pokemon in pokemons){
        //console.log(pokemon)
        //console.log(pokemons[pokemon].name)
        expect(lista[pokemon].text()).toBe(pokemons[pokemon].name)
      }
      //Hacer esto es lo mismo
      expect(lista[0].text()).toBe('pikachu')
      expect(lista[1].text()).toBe('venusaur')
      expect(lista[2].text()).toBe('charmeleon')
      expect(lista[3].text()).toBe('mew')
  })
  test('debe de emitir "selection con sus respectivos parametros al hacer click', () => {
      const [li1,li2,li3,li4]=wrapper.findAll('li')
      //Utilizamos un disparador para simular un click
      li1.trigger('click')
      li2.trigger('click')
      li3.trigger('click')
      li4.trigger('click')

      console.log(wrapper.emitted('selectionPokemon'))
      expect(wrapper.emitted('selectionPokemon').length).toBe(4)
      expect(wrapper.emitted('selectionPokemon')[0]).toEqual([1])
      expect(wrapper.emitted('selectionPokemon')[1]).toEqual([3])
      expect(wrapper.emitted('selectionPokemon')[2]).toEqual([5])
      expect(wrapper.emitted('selectionPokemon')[3]).toEqual([15])
  })
  
  
})
