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
let searchQuery = "";

//fetches the api data either from a specific page(page) or a specific character name(query) and returns it
async function fetchCharacters(page, query) {
  cardContainer.innerHTML = ``;
  try {
    const response = await fetch(
      "https://rickandmortyapi.com/api/character?page=" +
        page +
        "&name=" +
        query
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
//calls the fetch-function and renders the returned data onto the main page
async function renderPage() {
  const apiData = await fetchCharacters(page, searchQuery);
  maxPage = apiData.info.pages; //reads out the max page number out of the api data
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
  pagination.textContent = `${page}/${maxPage}`; //updates the pagination text
}
renderPage();

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    renderPage();
  }
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    renderPage();
  }
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData); //reads out the formdata and puts the textcontent into the searchQuery variable
  searchQuery = data.query;
  fetchCharacters(page, searchQuery); //calls the fetch + render function
  renderPage();
});
