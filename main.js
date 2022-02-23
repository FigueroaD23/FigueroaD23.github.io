const contenedorPrincipal =  document.querySelector("container-pokes");
const coloresPorTipo = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
let pokemones = {};
const pokemonTemplate = document.querySelector("#pokemonTemplate").content;

const obtenerPokemones = async () => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0/`;
        const res = await fetch(url);
        const resultados = await res.json();
        console.log(resultados.results)  

        const pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/25/");
        const pokemonRes = await pokemon.json();

        const poke_types = pokemonRes.types.map(type => type.type.name);
	    const type = Object.keys(coloresPorTipo).find(type => poke_types.indexOf(type) > -1);	
	    const color = coloresPorTipo[type];

        const pokemonObj = {            
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonRes.id}.png`,
            nombre:pokemonRes.name[0].toUpperCase() + pokemonRes.name.slice(1),
            id:pokemonRes.id,
            ataques:pokemonRes.moves,
            color:coloresPorTipo[type]
          };
        pokemones[pokemonObj.id] = {...pokemonObj};


        if (!res.ok) throw { status: res.status, statusText: res.statusText }; 
        if (!pokemon.ok) throw { status: pokemon.status, statusText: pokemon.statusText };     
    } catch (err) {
        console.error(err.statusText);
    }
};

const generarPokemon = (pokemonDefinido)=>{
    console.log(pokemonDefinido)
}

document.addEventListener("DOMContentLoaded",()=>{
    obtenerPokemones();
})