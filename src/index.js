const ENDPOINT = 'http://pokeapi.salestock.net/api/v2/';
let pokemonSearched = {};
let pokemonEvolutions = [];
let pokemonEvolutionsData = [];

// Event listener para añadir el evento del boton "Buscar"
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('start');
    btn.addEventListener('click', searchPokemonAsync, false);
}, false);

// Funciones para iteraciones de promesas
const searchPokemon = (() => {
    resetAll();
    const inputText = document.getElementById('input').value;
    if(inputText.length <= 0) {
        generateErrorMessage('Debe introducir un nombre o id');
    }
    // Todo Realizar fetch a ENPOINT/pokemon/inputText, en caso de error llamar a generateErrorMessage y en caso de ok
    // asignar el resultado a la variable pokemonSearched y llamar a las funciones createPokemonInfo y createBtnEvolutions

});
// Función que realiza todas las llamadas necesarias a otras funciones para traer las evoluciones
const searchEvolutions = (() => {
    //Todo llamar a getPokemonSpecias, luego a getEvolutionChain, checkEvolutionChain y finalmente getEvolutions.

});

// Devuelve una promesa tras realizar un fetch a species.url
const getPokemonSpecies = ((species) => {

});

// Devuelve una promesa tras realizar un fetch a chain.url
const getEvolutionChain = ((chain) => {

});

const checkEvolutionChain = ((data) => {
    if (data && data.length > 0) {
        data.forEach((evolution) => {
            if (evolution.species && evolution.species.name) {
                pokemonEvolutions.push(evolution.species.name);
            }
            if (evolution.evolves_to && evolution.evolves_to.length > 0) {
                checkEvolutionChain(evolution.evolves_to);
            }
        })
    }
});
// Realiza una petición por cada entrada del Array pokemonEvolutions y almacena los datos devueltos en el array pokemonEvolutionsData
const getEvolutions = (() => {
    let promises = [];

});

// Funciones para iteraciones de async & await
const searchPokemonAsync = async () => {

    resetAll();
    const inputText = document.getElementById('input').value;
    if(inputText.length <= 0) {
        generateErrorMessage('Debe introducir un nombre o id');
    }

};

const searchEvolutionsAsync = async () => {


};

const getPokemonSpeciesAsync = async (species) => {
};

const getEvolutionChainAsync = async (chain) => {
};

const getEvolutionsAsync = async () => {

};

//Funciones para crear los elementos del DOM!

const generateErrorMessage = ((error) => {
    alert(error);
});

const createPokemonInfo = ((pokemon) => {
    const wrapper = document.getElementById('pokemon-info');
    const title = document.createElement('h2');
    const text = document.createTextNode(pokemon.name);
    title.appendChild(text);
    const img = document.createElement('img');
    img.setAttribute("src", pokemon.sprites.front_default);
    wrapper.appendChild(title);
    wrapper.appendChild(img);
})

const createBtnEvolutions = (() => {
    const wrapper = document.getElementById('pokemon-info');
    const btn = document.createElement('button');
    const text = document.createTextNode('Ver evoluciones');
    btn.addEventListener('click', searchEvolutionsAsync, false);
    btn.appendChild(text);
    wrapper.appendChild(btn);
})
const resetAll = (() => {
    const wrapper = document.getElementById("pokemon-info");
    while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
    }
    pokemonEvolutionsData = [];
    pokemonEvolutions = [];
    pokemonSearched = {};
})