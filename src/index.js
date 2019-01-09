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
    fetch(`${ENDPOINT}pokemon/${inputText}`)
        .then((res) => res.json())
        .then((data) => {
            if(data.detail) {
                generateErrorMessage('Pokemon no encontrado');
            }
            pokemonSearched = data;
            createPokemonInfo(data);
            createBtnEvolutions();
        });
});

const searchEvolutions = (() => {
    getPokemonSpecies(pokemonSearched.species)
        .then((data) => data.evolution_chain)
        .then((chain) => getEvolutionChain(chain))
        .then((chainData) => checkEvolutionChain(chainData.chain.evolves_to))
        .then(() => getEvolutions())
        .then(() => {
            if (pokemonEvolutionsData && pokemonEvolutionsData.length > 0) {
                pokemonEvolutionsData.map((pokemon) => createPokemonInfo(pokemon));
            }
        })
});

const getPokemonSpecies = ((species) => {
    return fetch(species.url)
        .then((res) => res.json());
});

const getEvolutionChain = ((chain) => {
    return fetch(chain.url)
        .then((res) => res.json());
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

const getEvolutions = (() => {
    let promises = [];
    if (pokemonEvolutions && pokemonEvolutions.length > 0) {
        promises = pokemonEvolutions.map((pokemon) => fetch(`${ENDPOINT}pokemon/${pokemon}`)
            .then((res) => res.json())
            .then((data) => pokemonEvolutionsData.push(data)));
    }
    return Promise.all(promises);
});

// Funciones para iteraciones de async & await
const searchPokemonAsync = async () => {
    resetAll();
    const inputText = document.getElementById('input').value;
    if(inputText.length <= 0) {
        generateErrorMessage('Debe introducir un nombre o id');
    }
    try {
        const data = await (await fetch(`${ENDPOINT}pokemon/${inputText}`)).json();
        if(data.detail) {
            generateErrorMessage('Pokemon no encontrado');
        }
        pokemonSearched = data;
        createPokemonInfo(data);
        createBtnEvolutions();
    }catch (err) {
        console.log(err);
    }
};

const searchEvolutionsAsync = async () => {
    try {
        const species = await getPokemonSpeciesAsync(pokemonSearched.species);
        const chainData = await getEvolutionChainAsync(species.evolution_chain);
        console.log(chainData)
        checkEvolutionChain(chainData.chain.evolves_to);
        await getEvolutionsAsync();
        if (pokemonEvolutionsData && pokemonEvolutionsData.length > 0) {
            pokemonEvolutionsData.map((pokemon) => createPokemonInfo(pokemon));
        }
    }catch (err) {
        console.log(err);
    }

};

const getPokemonSpeciesAsync = async (species) => {
    return await (await fetch(species.url)).json();
};
const getEvolutionChainAsync = async (chain) => {
    return await(await fetch(chain.url)).json();
};
const getEvolutionsAsync = async () => {
    console.log(pokemonEvolutions)
    if (pokemonEvolutions && pokemonEvolutions.length > 0) {
        await Promise.all(pokemonEvolutions.map(async pokemon => {
            pokemonEvolutionsData.push(await(await fetch(`${ENDPOINT}pokemon/${pokemon}`)).json());
        }));
    }
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