import { createCharacterCard } from "./components/card/card.js";
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage;
let page = 1;
const searchQuery = "";

async function fetchCharacters(page) {
  cardContainer.innerHTML = ``;
  try {
    const response = await fetch(
      "https://rickandmortyapi.com/api/character?page=" + page
    );

    if (!response.ok) {
      console.error("response not okay");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("an error occurred");
  }
}
async function loadPage() {
  const apiData = await fetchCharacters(page);
  maxPage = apiData.info.pages;
  console.log(apiData);
  apiData.results.forEach((element) => {
    cardContainer.append(
      createCharacterCard(
        element.image,
        element.name,
        element.status,
        element.type,
        element.episode.length
      )
    );
  });
  pagination.textContent = `${page}/${maxPage}`;
}
loadPage();

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    loadPage();
  }
});
prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    loadPage();
  }
});
