import getPokemonOptions,{getPokemon,getPokemonNames} from '@/helpers/getPokemonOptions'

describe('gePokemonOptions helpers', () => {
    test('debe de regresar un arreglo de numeros', () => {
        const pokemons=getPokemon()
        expect(pokemons.length).toBe(650)
        expect(pokemons[0]).toBe(1)
        expect(pokemons[500]).toBe(501)
        expect(pokemons[649]).toBe(650)
    })
    test('debe de retornar un arreglo de 4 elementos con nombres de pokemons', async() => {
        //Se debe de delarar un async en la funcion por que uisaremos una promesa
        //la promesa es la funcion getPomenonNames que retorna la promesa
        //Se envia un arreglo de 4 valores x defecto
        //Por quye eso espara la funcion 
        const pokemonsNames=await getPokemonNames([1,3,5,15])
        //console.log(pokemonsNames)
        //Usamos toStricEqual para una igualdad profunda en este caso
        //Se realizara la igualdad entre objetos

        expect(pokemonsNames).toStrictEqual( [                                                                        
            { name: 'bulbasaur', id: 1 },
            { name: 'venusaur', id: 3 },
            { name: 'charmeleon', id: 5 },
            { name: 'beedrill', id: 15 }
          ])

    })
    test('getPokemonOptions debe de retornar un arreglo mezclado ', async() => {
        const PokemonOptions =await getPokemonOptions()
        //console.log(PokemonOptions)
        expect(PokemonOptions.length).toBe(4)
        
        expect(PokemonOptions).toEqual([                                                                        
            {
                //Esperamos un String y un number para cada atributo
                 name: expect.any(String), 
                 id: expect.any(Number) 
            },
            { 
                name: expect.any(String), 
                id: expect.any(Number) 
            },
            { 
                name: expect.any(String), 
                id: expect.any(Number) 
            },
            { 
                name: expect.any(String), 
                 id: expect.any(Number) 
            }
          ])
        
    })
    
});