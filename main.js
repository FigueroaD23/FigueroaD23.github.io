const contenedorPrincipal = document.querySelector(".container-pokes");
const coloresPorTipo = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};
const fragment  = document.createDocumentFragment();
let pokemones = {};
const pokemonTemplate = document.querySelector("#pokemonTemplate").content;
let urls = [];
const obtenerPokemones = async (url) => {
    contenedorPrincipal.innerHTML = `<img src="img/Spinner-1.4s-217px.svg" alt="">`;
    pokemones = {}
  try {
    
    const res = await fetch(url);
    const resultados = await res.json();
    
    for (let i = 0; i < resultados.results.length; i++) {
      try {
        const pokemon = await fetch(resultados.results[i].url);
        const pokemonRes = await pokemon.json();

        const poke_types = pokemonRes.types.map((type) => type.type.name);
        const type = Object.keys(coloresPorTipo).find(
          (type) => poke_types.indexOf(type) > -1
        );
        const color = coloresPorTipo[type];
        if (!pokemon.ok) throw { status: pokemon.status, statusText: pokemon.statusText }; 
        const pokemonObj = {
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonRes.id}.png`,
          nombre: pokemonRes.name[0].toUpperCase() + pokemonRes.name.slice(1),
          id: pokemonRes.id,
          ataques: pokemonRes.moves,
          color: coloresPorTipo[type],
          tipo: type          
        };
        pokemones[pokemonObj.id] = { ...pokemonObj };

      } catch (error) {}
    }    
    pintarPokemones(resultados);
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    
  } catch (err) {
    console.error(err.statusText);
  }
};

const pintarPokemones = (resultados)=>{ 
    contenedorPrincipal.innerHTML = "";
    let anterior="";
    if(resultados.previous === null){
        anterior = "#";
    }  else{
        anterior = resultados.previous;
    }
    contenedorPrincipal.innerHTML=`
    <div class="links">
            <ul class="pagination d-flex justify-content-between">
                <li class="page-item">
                  <a class="page-link anterior" href="${anterior}" tabindex="-1">Previous</a>
                </li>
                <li class="page-item anterior">
                  <a class="page-link siguiente" href="${resultados.next}">Next</a>
                </li>
            </ul>
    </div>
        `;
    Object.values(pokemones).forEach((poke,i)=>{
        const clone = pokemonTemplate.cloneNode(true);
        clone.querySelector('.img-container img').setAttribute("src", poke.img);
        clone.querySelector('.number').textContent = poke.id.toString().padStart(3, '0');
        clone.querySelector('.name').textContent = poke.nombre;
        clone.querySelector('.pokemon').style.backgroundColor = poke.color;
        clone.querySelector('.tipo').textContent = poke.tipo;
        clone.querySelector('.type').innerHTML = `<b>Ataques:</b><br> ${poke.ataques[0].move.name} y ${poke.ataques[1].move.name}`;


              
        fragment.appendChild(clone);
    });    
    contenedorPrincipal.appendChild(fragment);  
}

document.addEventListener("DOMContentLoaded", () => {
  obtenerPokemones("https://pokeapi.co/api/v2/pokemon?limit=25&offset=0/");
});


contenedorPrincipal.addEventListener("click",(e)=>{
    if(e.target.classList.contains("anterior")){   
        e.preventDefault();
        console.log(e.target.getAttribute("href"))      
        if(e.target.getAttribute("href") != "#"){
            obtenerPokemones(e.target.getAttribute("href"));        
            console.log(e.target.getAttribute("href"))      
        }                     
    }
    if(e.target.classList.contains("siguiente")){        
        e.preventDefault();        
        obtenerPokemones(e.target.getAttribute("href"));  
        console.log(e.target.getAttribute("href"))      
    }
    e.stopPropagation();
})