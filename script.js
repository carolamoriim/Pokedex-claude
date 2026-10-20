const cardName = document.getElementById("name");
const cardPhoto = document.getElementById("img");
const cardPower = document.getElementById("power");
const cardStats = document.getElementById("stats");
const buttonSearch = document.getElementById("bt-search");
const inputSearch = document.getElementById("input-search");
const errorMessage = document.getElementById("errorMessage");
const loading = document.getElementById("loading");
const cardList = document.getElementById("cardList");

const urlBase = "https://pokeapi.co/api/v2/pokemon/";
async function fetchData(pokemonName) {
  try {
    loading.style.display = "block";

    const response = await fetch(
      `${urlBase}${encodeURIComponent(pokemonName)}`,
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar o pokemon selecionado.");
    }

    errorMessage.innerText = "";

    const resultJSON = await response.json();

    setData(resultJSON);
  } catch (error) {
    errorMessage.innerText =
      "Pokémon não encontrado. Confira se o nome está escrito corretamente.";
  } finally {
    loading.style.display = "none";
  }
}

function setData(result) {
  const pokemonName = result.name;
  const pokemonPhoto = result.sprites.other.home.front_default;
  const pokemonAbilities = result.abilities[0].ability.name;
  const pokemonStats = result.stats[1].base_stat;

  cardName.innerText = pokemonName;
  cardPhoto.setAttribute("src", pokemonPhoto);
  cardPower.innerText = pokemonAbilities;
  cardStats.innerText = pokemonStats;
}

buttonSearch.addEventListener("click", function () {
  const valueInput = inputSearch.value;
  fetchData(valueInput);
});

let pokemonList = [
  "pikachu",
  "bulbasaur",
  "charmander",
  "charizard",
  "haunter",
  "rattata",
];

pokemonList.forEach((item) => {
  const newP = document.createElement("p");
  newP.innerText = item;
  cardList.appendChild(newP);
});

function cardPokemon(nome) {
  const cardUrl = `${urlBase}${encodeURIComponent(nome)}`;
  return cardUrl;
}

async function getPokemonPhoto(name) {
  const result = cardPokemon(name);
  const responseUrl = await fetch(result);

  const responseJSON = await responseUrl.json();
  console.log(responseJSON);
}

getPokemonPhoto("pikachu");
